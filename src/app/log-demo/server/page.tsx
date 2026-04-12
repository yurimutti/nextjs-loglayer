import Link from "next/link";

import { log } from "@/lib/logger";

export const dynamic = "force-dynamic";

export default function ServerDemoPage() {
  console.info("Server demo route rendered", { route: "/log-demo/server" });

  log.withMetadata({ some: "data" }).info("Hello, world!");

  log
    .child()
    .withContext({ requestId: "abc" })
    .withMetadata({ duration: 150 })
    .withError(new Error("fail"))
    .error("Request failed");

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Server Demo</p>
          <h1 className="text-3xl font-semibold tracking-tight">Server Logging with LogLayer</h1>
          <p className="text-zinc-300">
            Refresh this page and inspect your terminal. This route runs real LogLayer examples on
            the server render path.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <pre className="overflow-x-auto rounded-lg bg-black/40 p-4 text-xs text-cyan-200">
{`log.withMetadata({ some: "data" }).info("Hello, world!")

log
  .withContext({ requestId: "abc" })
  .withMetadata({ duration: 150 })
  .withError(new Error("fail"))
  .error("Request failed")`}
          </pre>
          <p className="text-sm text-zinc-300">
            Context persists (`requestId`), while metadata and error are attached to this entry.
          </p>
        </section>

        <Link
          href="/"
          className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
        >
          Back to talk track
        </Link>
      </div>
    </main>
  );
}
