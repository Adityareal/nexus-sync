import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

// next/link mocked to a plain anchor so it needs no router context in jsdom.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import { DocsSearch } from "./DocsSearch";

beforeEach(() => {
  push.mockClear();
});

function typeInto(input: HTMLElement, value: string) {
  input.focus();
  fireEvent.change(input, { target: { value } });
}

describe("DocsSearch", () => {
  it("(a) two instances have distinct input ids and each input is named by its own label", () => {
    render(
      <div>
        <DocsSearch />
        <DocsSearch />
      </div>
    );
    const inputs = screen.getAllByRole("combobox");
    expect(inputs).toHaveLength(2);
    expect(inputs[0].id).toBeTruthy();
    expect(inputs[1].id).toBeTruthy();
    expect(inputs[0].id).not.toBe(inputs[1].id);

    // Accessible name comes from each instance's own sr-only label.
    const named = screen.getAllByRole("combobox", {
      name: "Search documentation",
    });
    expect(named).toHaveLength(2);
  });

  it("(b) typing shows a listbox; ArrowDown activates first; ArrowUp wraps to last; Enter navigates and clears", () => {
    render(<DocsSearch />);
    const input = screen.getByRole("combobox") as HTMLInputElement;

    typeInto(input, "cli");

    const listbox = screen.getByRole("listbox");
    expect(input.getAttribute("aria-expanded")).toBe("true");
    const options = within(listbox).getAllByRole("option");
    expect(options.length).toBeGreaterThan(1);

    fireEvent.keyDown(input, { key: "ArrowDown" });
    const first = within(screen.getByRole("listbox")).getAllByRole("option")[0];
    expect(input.getAttribute("aria-activedescendant")).toBe(first.id);
    expect(first.getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    const opts = within(screen.getByRole("listbox")).getAllByRole("option");
    const last = opts[opts.length - 1];
    expect(input.getAttribute("aria-activedescendant")).toBe(last.id);
    expect(last.getAttribute("aria-selected")).toBe("true");

    const lastHref = within(last)
      .getByRole("link")
      .getAttribute("href") as string;

    fireEvent.keyDown(input, { key: "Enter" });
    expect(push).toHaveBeenCalledWith(lastHref);
    expect(lastHref.startsWith("/docs/")).toBe(true);
    expect(input.value).toBe("");
  });

  it("(c) Enter with no active option navigates to the first result", () => {
    render(<DocsSearch />);
    const input = screen.getByRole("combobox");

    typeInto(input, "cli");

    const firstHref = within(screen.getByRole("listbox"))
      .getAllByRole("option")[0]
      .querySelector("a")
      ?.getAttribute("href") as string;

    fireEvent.keyDown(input, { key: "Enter" });
    expect(push).toHaveBeenCalledWith(firstHref);
  });

  it("(d) Escape closes the popup", () => {
    render(<DocsSearch />);
    const input = screen.getByRole("combobox");

    typeInto(input, "cli");
    expect(screen.getByRole("listbox")).toBeTruthy();

    fireEvent.keyDown(input, { key: "Escape" });
    expect(input.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("(e) a query with no matches renders no listbox and shows the visible no-results panel", () => {
    render(<DocsSearch />);
    const input = screen.getByRole("combobox");

    typeInto(input, "zzzznotadoc");

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(input.getAttribute("aria-expanded")).toBe("false");
    // Visible panel while focused with a non-empty query and zero matches.
    expect(screen.getByText("no results")).toBeTruthy();
    // The sr-only status region still announces the count.
    expect(screen.getByRole("status").textContent).toBe("No results");
  });

  it("(g) aria-controls is absent when closed and equals the listbox id when open", () => {
    render(<DocsSearch />);
    const input = screen.getByRole("combobox");

    // Closed: no query yet.
    expect(input.getAttribute("aria-controls")).toBeNull();

    typeInto(input, "cli");

    const listbox = screen.getByRole("listbox");
    expect(input.getAttribute("aria-controls")).toBe(listbox.id);

    // Close again with Escape: aria-controls goes away with the listbox.
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(input.getAttribute("aria-controls")).toBeNull();
  });

  it("(f) blurring outside closes the popup; refocusing with the same query reopens it", () => {
    render(
      <div>
        <DocsSearch />
        <button type="button">outside</button>
      </div>
    );
    const input = screen.getByRole("combobox");
    const outside = screen.getByRole("button", { name: "outside" });

    typeInto(input, "cli");
    expect(screen.getByRole("listbox")).toBeTruthy();

    // Focus leaves the component toward the outside button.
    fireEvent.blur(input, { relatedTarget: outside });
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(input.getAttribute("aria-expanded")).toBe("false");

    // Refocus the input with the same query still present.
    fireEvent.focus(input);
    expect(screen.getByRole("listbox")).toBeTruthy();
    expect(input.getAttribute("aria-expanded")).toBe("true");
  });
});
