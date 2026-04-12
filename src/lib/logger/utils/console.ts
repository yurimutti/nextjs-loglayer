import type { ILogLayer } from "loglayer";

function stripAnsiCodes(str: string): string {
  return str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}

export function createConsoleMethod(
  log: ILogLayer,
  method: "error" | "info" | "warn" | "debug" | "log",
) {
  let mappedMethod: "error" | "info" | "warn" | "debug";

  if (method === "log") {
    mappedMethod = "info";
  } else {
    mappedMethod = method;
  }

  return (...args: unknown[]) => {
    const data: Record<string, unknown> = {};
    let hasData = false;
    let error: Error | null = null;
    const messages: string[] = [];

    for (const arg of args) {
      if (arg instanceof Error) {
        error = arg;
        continue;
      }

      if (typeof arg === "object" && arg !== null) {
        Object.assign(data, arg);
        hasData = true;
        continue;
      }

      if (typeof arg === "string") {
        messages.push(arg);
      }
    }

    let finalMessage = stripAnsiCodes(messages.join(" ")).trim();

    if (finalMessage === "⨯" && error) {
      finalMessage = error.message || "";
    }

    if (error && hasData && messages.length > 0) {
      log.withError(error).withMetadata(data)[mappedMethod](finalMessage);
    } else if (error && messages.length > 0) {
      log.withError(error)[mappedMethod](finalMessage);
    } else if (hasData && messages.length > 0) {
      log.withMetadata(data)[mappedMethod](finalMessage);
    } else if (error && hasData && messages.length === 0) {
      log.withError(error).withMetadata(data)[mappedMethod]("");
    } else if (error && messages.length === 0) {
      log.errorOnly(error);
    } else if (hasData && messages.length === 0) {
      log.metadataOnly(data);
    } else {
      log[mappedMethod](finalMessage);
    }
  };
}
