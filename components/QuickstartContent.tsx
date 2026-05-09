import { Code, DocPage, Pre } from "@/components/DocPage";

export function QuickstartContent() {
  return (
    <DocPage
      kicker="Getting started"
      title="Quickstart, two minutes."
      toc={[
        { id: "install", label: "1. Install the CLI" },
        { id: "init", label: "2. Initialize" },
        { id: "up", label: "3. Boot the pod" },
        { id: "code", label: "4. Code and watch" },
        { id: "share", label: "5. Share the preview" },
        { id: "next", label: "Next" },
      ]}
    >
      <p className="text-body-l text-ink">
        Five steps. The first is a one liner. The fifth is a URL you paste into
        Slack. By the time the kettle boils your environment is running in a
        cloud pod, mirroring every save under 100 milliseconds.
      </p>

      <h2
        id="install"
        className="font-serif text-h2 text-ink !mt-12 mb-4 leading-[1.15]"
      >
        1. Install the CLI
      </h2>
      <Pre>npm install -g nexus-sync</Pre>
      <p>
        The binary publishes to npm as <Code>nexus-sync</Code> and exposes the{" "}
        <Code>nxs</Code> command. Node 18 or later. macOS, Linux, and Windows
        with WSL.
      </p>

      <h2
        id="init"
        className="font-serif text-h2 text-ink !mt-12 mb-4 leading-[1.15]"
      >
        2. Initialize
      </h2>
      <Pre>nxs init</Pre>
      <p>
        Run from your project root. The CLI detects your framework, writes a
        single <Code>nexus.config.ts</Code>, and adds nothing else. No Docker
        files, no GitHub Actions, no third party SDKs.
      </p>

      <h2
        id="up"
        className="font-serif text-h2 text-ink !mt-12 mb-4 leading-[1.15]"
      >
        3. Boot the pod
      </h2>
      <Pre>nxs up</Pre>
      <p>
        A fresh pod provisions in 1.8 seconds. Your working directory mirrors,
        dependencies install, and the application starts on a unique preview
        URL printed to stdout. Output looks like this.
      </p>
      <Pre>{`◐ booting pod-7f2a in fra1
✓ pod ready in 1.8s
✓ mirroring 2,431 files
✓ running on https://pr-quickstart-7f2a.nexus-sync.dev`}</Pre>

      <h2
        id="code"
        className="font-serif text-h2 text-ink !mt-12 mb-4 leading-[1.15]"
      >
        4. Code and watch
      </h2>
      <p>
        Edit any file in your editor. The mirror engine streams the change to
        the pod and the running application reloads under 100 milliseconds.
        Open the preview URL in another window to watch it. The round trip
        rivals your local development server, often beats it.
      </p>

      <h2
        id="share"
        className="font-serif text-h2 text-ink !mt-12 mb-4 leading-[1.15]"
      >
        5. Share the preview
      </h2>
      <Pre>nxs share</Pre>
      <p>
        Returns a shareable URL with team auth applied. Anyone in your
        organization sees the running app at the current state of your laptop,
        with no need for them to clone, install, or rebuild. The pod
        terminates when you stop watching, or after eight hours, whichever
        comes first.
      </p>

      <h2
        id="next"
        className="font-serif text-h2 text-ink !mt-16 mb-4 leading-[1.15]"
      >
        Next
      </h2>
      <p>
        You now have a real pod. Stop it with <Code>nxs down</Code>, or close
        the laptop and the pod disposes itself. To customize CPU, memory, or
        the database fork policy, see the{" "}
        <a
          href="/docs/custom-pod"
          className="text-ink underline underline-offset-4 decoration-signal decoration-1 hover:decoration-2"
        >
          custom pod configuration
        </a>{" "}
        guide.
      </p>
    </DocPage>
  );
}
