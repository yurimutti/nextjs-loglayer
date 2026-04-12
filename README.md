# Next.js LogLayer Example

Minimal blog-style example showing how to integrate LogLayer in Next.js using
`instrumentation.ts` and overriding server-side `console` methods.

## Install

```bash
npm i
```

## Run

```bash
npm run dev
```

Open `http://localhost:3000` and check the terminal output.

## Integration Files

- `src/instrumentation.ts`: hooks into Next.js startup and overrides console methods in Node runtime.
- `src/lib/logger/index.ts`: creates the shared LogLayer instance with environment-based transports.
- `src/lib/logger/utils/console.ts`: maps `console.*` calls to LogLayer methods and handles errors/metadata.

## Notes

- `console.log` is mapped to LogLayer `info`.
- `console.error(new Error(...))` is captured with structured error handling.
- This setup intentionally keeps the integration minimal (no `dd-trace`) for easier learning.
