export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { log } = await import("./src/lib/logger");
    const { createConsoleMethod } = await import("./src/lib/logger/utils/console");

    console.error = createConsoleMethod(log, "error");
    console.log = createConsoleMethod(log, "log");
    console.info = createConsoleMethod(log, "info");
    console.warn = createConsoleMethod(log, "warn");
    console.debug = createConsoleMethod(log, "debug");
  }
}
