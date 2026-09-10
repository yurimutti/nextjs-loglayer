# Next.js LogLayer Example

A minimal Next.js example showing how to integrate [LogLayer](https://loglayer.dev/) with `instrumentation.ts` and route server-side `console.*` calls through a shared logger.

This repository is the companion example for my article:

[**Logging in Next.js with LogLayer: Instrumentation, Console Override, and Structured Logs**](https://yurimutti.com/posts/logging-nextjs-loglayer-instrumentation-console-override-structured-logs)

## What it covers

* Shared LogLayer instance
* Server-side `console.*` interception with `instrumentation.ts`
* Structured errors and metadata
* Environment-based transports
* Direct LogLayer usage when structured context is needed

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and check the terminal output.

## Key files

* `src/instrumentation.ts` — hooks into Next.js startup and overrides server-side `console` methods
* `src/lib/logger/index.ts` — creates and configures the shared LogLayer instance
* `src/lib/logger/utils/console.ts` — maps `console.*` calls to LogLayer and handles errors and metadata

## Example

Existing code can keep using `console`:

```ts
console.log("User created", { userId: "123" });

console.error(new Error("Something went wrong"));
```

On the server, those calls are routed through LogLayer and emitted as structured logs.

For code that needs richer context, LogLayer can also be used directly.

## Notes

This example intentionally keeps the setup small and does not include `dd-trace` or other observability integrations.

The goal is to show the core logging setup before adding platform-specific concerns such as Datadog or OpenTelemetry.

## Read the full article

For the reasoning behind the setup, runtime differences, console interception, and structured logging approach:

[**Read the full post on yurimutti.com →**](https://yurimutti.com/posts/logging-nextjs-loglayer-instrumentation-console-override-structured-logs)
