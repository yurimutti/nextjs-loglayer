import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-100">
      <section className="relative overflow-hidden px-6 pb-20 pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.25),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(244,114,182,0.2),transparent_40%),linear-gradient(to_bottom,#09090b,#09090b)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="max-w-4xl space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">yurimutti.com</p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Logging with LogLayer in Next.js
            </h1>
            <p className="max-w-2xl text-base text-zinc-300 sm:text-lg">
              A practical talk-track demo showing server instrumentation, client lifecycle logs, and
              structured entries with context, metadata, and errors.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/log-demo/server"
                className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-cyan-200"
              >
                Run Server Demo
              </Link>
              <Link
                href="/log-demo/client"
                className="rounded-full border border-zinc-600 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-400 hover:bg-zinc-900"
              >
                Run Client Demo
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Tech Talk Flow</p>
            <ol className="grid gap-3 text-sm text-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
              <li>1. Why default console output gets noisy</li>
              <li>2. Instrumentation hook + global logger</li>
              <li>3. Server route with structured chained logs</li>
              <li>4. Client lifecycle logging with useEffect</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-900 px-6 py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">One Concrete Win</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep context persistent, attach metadata per entry
            </h2>
            <p className="max-w-xl text-zinc-300">
              LogLayer lets you set a request context once, then attach duration/error details only
              where they matter.
            </p>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-xs text-cyan-200">
{`log
  .withContext({ requestId: 'abc' })
  .withMetadata({ duration: 150 })
  .withError(new Error('fail'))
  .error('Request failed')`}
          </pre>
        </div>
      </section>

      <section className="border-t border-zinc-900 px-6 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Depth</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Same logger API, two runtimes, one mental model
            </h2>
            <p className="text-zinc-300">
              Server examples run in the Next.js render path. Client examples run from React
              lifecycle. Both are easy to demonstrate in a talk and easy to copy into production.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/log-demo/server"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Server Track
            </Link>
            <Link
              href="/log-demo/client"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Client Track
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-900 px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 rounded-3xl border border-cyan-400/30 bg-cyan-300/10 p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Final Step</p>
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Run the demo and inspect real logs now
          </h3>
          <pre className="rounded-lg bg-black/40 px-4 py-3 text-sm text-cyan-100">npm run dev</pre>
          <p className="text-sm text-zinc-300">
            Then visit <code>/log-demo/server</code> and <code>/log-demo/client</code>.
          </p>
        </div>
      </section>
    </main>
  );
}
