import Link from "next/link";

import { ClientLogEffect } from "@/components/client-log-effect";

export default function ClientDemoPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Client Demo</p>
          <h1 className="text-3xl font-semibold tracking-tight">Client Lifecycle Logging</h1>
          <p className="text-zinc-300">
            Open browser DevTools and refresh this page. You should see a client-side log emitted
            from a <code>useEffect</code> hook.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <ClientLogEffect />
          <pre className="overflow-x-auto rounded-lg bg-black/40 p-4 text-xs text-cyan-200">
{`useEffect(() => {
  console.log("Client mounted", { source: "useEffect", page: "/log-demo/client" })
}, [])`}
          </pre>
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
