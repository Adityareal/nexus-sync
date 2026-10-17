import { StrictMode } from "react";
import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  StartPodFlow,
  StartPodForm,
  StartPodBoot,
  StartPodSuccess,
} from "@/components/StartPodFlow";

describe("StartPodBoot freeze fix (StrictMode)", () => {
  it("(a) boots to completion under StrictMode and shows 1.78s elapsed", async () => {
    const spy = vi.fn();
    render(
      <StrictMode>
        <StartPodBoot onComplete={spy} />
      </StrictMode>,
    );
    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1), { timeout: 8000 });
    // At t = 1 the elapsed counter reads the full boot duration.
    expect(screen.getByText("1.78")).toBeTruthy();
  }, 10000);

  it("(b) re-rendering mid-boot with a NEW onComplete does not restart or stall it; only the latest fires once", async () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(<StartPodBoot onComplete={first} />);
    // Swap the callback shortly after boot starts, before it finishes (1780ms).
    const readElapsed = () =>
      Number(
        screen
          .getByText((text) => /^\d\.\d\d$/.test(text))
          .textContent?.replace("s", ""),
      );
    await new Promise((r) => setTimeout(r, 300));
    const before = readElapsed();
    expect(before).toBeGreaterThan(0);
    rerender(<StartPodBoot onComplete={second} />);

    // A restart would drop the elapsed counter back toward 0.00s.
    await new Promise((r) => setTimeout(r, 50));
    expect(readElapsed()).toBeGreaterThanOrEqual(before);

    // A stall would keep it from ever finishing.
    await waitFor(() => expect(second).toHaveBeenCalledTimes(1), { timeout: 8000 });
    expect(first).not.toHaveBeenCalled();
    expect(screen.getByText("1.78")).toBeTruthy();
  }, 10000);
});

describe("StartPodFlow focus + announcement (StrictMode)", () => {
  it("(c) nothing focused on initial render; focus and status move across transitions", async () => {
    render(
      <StrictMode>
        <StartPodFlow />
      </StrictMode>,
    );

    // /start must not steal focus on load.
    expect(document.activeElement).toBe(document.body);

    fireEvent.click(screen.getByRole("button", { name: /boot pod/i }));

    // boot heading receives focus after the form -> boot transition.
    const bootHeading = await screen.findByRole("heading", {
      name: /booting your pod\./i,
    });
    await waitFor(() => expect(document.activeElement).toBe(bootHeading));

    // success heading receives focus after boot completes.
    const successHeading = await screen.findByRole(
      "heading",
      { name: /your pod is running\./i },
      { timeout: 8000 },
    );
    await waitFor(() => expect(document.activeElement).toBe(successHeading));

    const status = screen.getAllByRole("status");
    expect(
      status.some((s) =>
        s.textContent?.includes("pr-feature-auth-flow.nexus-sync.example"),
      ),
    ).toBe(true);
  }, 10000);
});

describe("StartPodForm branch labelling and validation", () => {
  it("(d) Branch label returns the text input and the accessible description names the tracking origin", () => {
    render(<StartPodForm />);
    const input = screen.getByLabelText("Branch") as HTMLInputElement;
    expect(input.tagName).toBe("INPUT");
    expect(input.type).toBe("text");

    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    const hint = document.getElementById(describedBy as string);
    expect(hint?.textContent).toContain("tracking origin/");
  });

  it("(d2) an empty branch blocks submit: error shown, aria-invalid, input focused, still on form; typing clears it", () => {
    const onSubmit = vi.fn();
    render(<StartPodForm onSubmit={onSubmit} />);
    const input = screen.getByLabelText("Branch") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /boot pod/i }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(document.activeElement).toBe(input);
    const error = screen.getByText(/Enter a branch name\./i);
    expect(error).toBeTruthy();
    // The error is linked via aria-describedby.
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
    // Still on the configure form.
    expect(screen.getByRole("heading", { name: /start an ephemeral pod\./i })).toBeTruthy();

    // Typing clears the error.
    fireEvent.change(input, { target: { value: "feature/x" } });
    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(screen.queryByText(/Enter a branch name\./i)).toBeNull();
  });

  it("(d3) a whitespace-only branch also blocks submit", () => {
    const onSubmit = vi.fn();
    render(<StartPodForm onSubmit={onSubmit} />);
    const input = screen.getByLabelText("Branch") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: /boot pod/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(input.getAttribute("aria-invalid")).toBe("true");
  });

  it("(d4) submit trims the branch before passing it on", () => {
    const onSubmit = vi.fn();
    render(<StartPodForm onSubmit={onSubmit} />);
    const input = screen.getByLabelText("Branch") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "  feature/trim  " } });
    fireEvent.click(screen.getByRole("button", { name: /boot pod/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0].branch).toBe("feature/trim");
  });
});

describe("Size radio group", () => {
  it("(g) size controls are radios in a radiogroup named Size; selecting small updates the spec", () => {
    render(<StartPodForm />);
    const group = screen.getByRole("radiogroup", { name: "Size" });
    const radios = within(group).getAllByRole("radio");
    expect(radios).toHaveLength(2);
    // Default is medium.
    expect(screen.getByText("2 vCPU · 4 GiB")).toBeTruthy();
    // jsdom has no native arrow-key radio movement, so select by click.
    fireEvent.click(screen.getByRole("radio", { name: /small/i }));
    expect(screen.getByText("1 vCPU · 2 GiB")).toBeTruthy();
  });

  it("(g2) boot and success reflect the small spec", () => {
    const smallPod = {
      project: "nexus-sync",
      framework: "Next.js 15.5.28",
      branch: "feature/auth-flow",
      size: "small" as const,
      database: true,
      envVars: [],
    };
    const boot = render(
      <StartPodBoot pod={smallPod} autoplay={false} frozenProgress={1} />,
    );
    expect(boot.container.innerHTML).toContain("1 vCPU · 2 GiB");
    boot.unmount();

    render(<StartPodSuccess pod={smallPod} frozen />);
    expect(screen.getByText(/node:20-alpine · 1 vCPU · 2 GiB/)).toBeTruthy();
  });
});

describe("Database choice flows downstream", () => {
  it("(h) database off: log shows 'database sandbox off', no 'anonymized'; success row says off", () => {
    const offPod = {
      project: "nexus-sync",
      framework: "Next.js 15.5.28",
      branch: "feature/auth-flow",
      size: "medium" as const,
      database: false,
      envVars: [],
    };
    const boot = render(
      <StartPodBoot pod={offPod} autoplay={false} frozenProgress={1} />,
    );
    expect(boot.container.innerHTML).toContain("database sandbox off");
    expect(boot.container.innerHTML).not.toContain("anonymized");
    boot.unmount();

    const success = render(<StartPodSuccess pod={offPod} frozen />);
    // The database meta row value is "off".
    const dt = within(success.container).getByText("database");
    const row = dt.closest("div");
    expect(row?.textContent).toContain("off");
    expect(success.container.innerHTML).not.toContain("anonymized");
  });
});

describe("Success stage actions", () => {
  it("(i) View logs toggles aria-expanded and shows/hides the log list", () => {
    render(<StartPodSuccess frozen />);
    const toggle = screen.getByRole("button", { name: /view logs/i });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("button", { name: /hide logs/i })).toBeTruthy();
    expect(screen.getByText("pod ready")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /hide logs/i }));
    expect(screen.queryByText("pod ready")).toBeNull();
  });

  it("(j) Open in browser (not frozen) is prevented and shows the demo note", () => {
    render(<StartPodSuccess />);
    const open = screen.getByRole("link", { name: /open in browser/i });
    const evt = fireEvent.click(open);
    // default prevented -> click returns false
    expect(evt).toBe(false);
    expect(screen.getByText(/Demo only\./i)).toBeTruthy();
    expect(screen.getByText(/does not resolve\./i)).toBeTruthy();
  });

  it("(j2) frozen Open in browser shows no demo note", () => {
    render(<StartPodSuccess frozen />);
    fireEvent.click(screen.getByRole("link", { name: /open in browser/i }));
    expect(screen.queryByText(/Demo only\./i)).toBeNull();
  });

  describe("copy", () => {
    const original = navigator.clipboard;
    afterEach(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: original,
        configurable: true,
        writable: true,
      });
    });

    it("(k) copy succeeds with a mocked clipboard", async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText },
        configurable: true,
        writable: true,
      });
      render(<StartPodSuccess />);
      fireEvent.click(screen.getByRole("button", { name: /copy link/i }));
      await waitFor(() =>
        expect(screen.getByRole("button", { name: /link copied/i })).toBeTruthy(),
      );
      expect(writeText).toHaveBeenCalledWith(
        "https://pr-feature-auth-flow.nexus-sync.example",
      );
    });

    it("(k2) copy fails cleanly with clipboard undefined", () => {
      Object.defineProperty(navigator, "clipboard", {
        value: undefined,
        configurable: true,
        writable: true,
      });
      render(<StartPodSuccess />);
      fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
      expect(screen.getByRole("button", { name: "Copy failed" })).toBeTruthy();
      expect(screen.getByRole("button", { name: "copy failed" })).toBeTruthy();
      expect(screen.getByText(/Select the address and copy it\./i)).toBeTruthy();
    });

    it("(k3) copy fails cleanly with a rejecting writeText", async () => {
      const writeText = vi.fn().mockRejectedValue(new Error("denied"));
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText },
        configurable: true,
        writable: true,
      });
      render(<StartPodSuccess />);
      fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
      await waitFor(() =>
        expect(screen.getByRole("button", { name: "Copy failed" })).toBeTruthy(),
      );
    });
  });
});

describe("Stop pod returns to the form", () => {
  it("(l) stop then confirm: back on the form with the previous branch and status 'Pod stopped.'", async () => {
    render(<StartPodFlow />);
    const input = screen.getByLabelText("Branch") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "feature/keep-me" } });
    fireEvent.click(screen.getByRole("button", { name: /boot pod/i }));

    await screen.findByRole(
      "heading",
      { name: /your pod is running\./i },
      { timeout: 8000 },
    );

    fireEvent.click(screen.getByRole("button", { name: /stop pod/i }));
    fireEvent.click(screen.getByRole("button", { name: /^confirm$/i }));

    const formHeading = await screen.findByRole("heading", {
      name: /start an ephemeral pod\./i,
    });
    expect(formHeading).toBeTruthy();
    const backInput = screen.getByLabelText("Branch") as HTMLInputElement;
    expect(backInput.value).toBe("feature/keep-me");
    const status = screen.getAllByRole("status");
    expect(status.some((s) => s.textContent === "Pod stopped.")).toBe(true);
  }, 12000);
});

describe("Frozen storyboard usages never move focus", () => {
  it("(e) frozen form, boot and success together leave activeElement on body", () => {
    render(
      <>
        <StartPodForm frozen />
        <StartPodBoot autoplay={false} frozenProgress={0.62} />
        <StartPodSuccess frozen />
      </>,
    );
    expect(document.activeElement).toBe(document.body);
  });
});

describe("No dead controls in the live flow", () => {
  it("(m) no Cancel, edit, '+ add override' or Close buttons", () => {
    render(<StartPodForm />);
    expect(screen.queryByRole("button", { name: /^cancel$/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /^edit$/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /add override/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /^close$/i })).toBeNull();
  });
});

describe("Reserved domain in success stage", () => {
  it("(f) success markup contains no nexus-sync.dev", () => {
    const { container } = render(<StartPodSuccess frozen />);
    expect(container.innerHTML).not.toContain("nexus-sync.dev");
    expect(container.innerHTML).toContain("nexus-sync.example");
  });
});
