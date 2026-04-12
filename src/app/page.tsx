export default function Home() {
  console.log("Home page rendered", { route: "/" });
  console.error(new Error("Sample server-side error through LogLayer"));

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Next.js + LogLayer</h1>
      <p className="text-base text-zinc-700">
        This page demonstrates a minimal LogLayer integration using
        instrumentation. Server-side console methods are overridden and routed
        through LogLayer.
      </p>
      <ul className="list-disc space-y-2 pl-6 text-sm text-zinc-700">
        <li>
          <code>console.log</code> is mapped to LogLayer <code>info</code>
        </li>
        <li>
          <code>console.error</code> supports <code>Error</code> objects
        </li>
        <li>Check your terminal output while loading this page</li>
      </ul>
      <p className="text-sm text-zinc-500">
        Files: <code>src/instrumentation.ts</code>, <code>src/lib/logger</code>
      </p>
    </main>
  );
}
