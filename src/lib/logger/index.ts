import { LogLayer, type PluginBeforeMessageOutParams } from "loglayer";
import { PinoTransport } from "@loglayer/transport-pino";
import { getSimplePrettyTerminal } from "@loglayer/transport-simple-pretty-terminal";
import { createRequire } from "node:module";
import type { Logger } from "pino";
import { serializeError } from "serialize-error";

const isServer = typeof window === "undefined";
const isClient = !isServer;

function getPinoLogger(): Logger {
  const require = createRequire(`${process.cwd()}/package.json`);
  const pinoModule = require("pino") as {
    default?: (options?: { level?: string }) => Logger;
    pino?: (options?: { level?: string }) => Logger;
  };

  const createPino = pinoModule.pino ?? pinoModule.default;

  if (!createPino) {
    throw new Error("Unable to load pino module");
  }

  return createPino({ level: "trace" });
}

const pinoLogger = getPinoLogger();

export const log = new LogLayer({
  errorFieldName: "error",
  errorSerializer: serializeError,
  transport: [
    getSimplePrettyTerminal({
      enabled: process.env.NODE_ENV === "development",
      runtime: isServer ? "node" : "browser",
      viewMode: isServer ? "inline" : "message-only",
      includeDataInBrowserConsole: isClient,
    }),
    new PinoTransport({
      enabled: isServer && process.env.NODE_ENV === "production",
      logger: pinoLogger,
    }),
  ],
  plugins: [
    {
      onBeforeMessageOut(params: PluginBeforeMessageOutParams) {
        const tag = isServer ? "Server" : "Client";

        if (params.messages && params.messages.length > 0) {
          if (typeof params.messages[0] === "string") {
            params.messages[0] = `[${tag}] ${params.messages[0]}`;
          }
        }

        return params.messages;
      },
    },
  ],
});

log.withContext({ isServer });

export function getLogger() {
  return log;
}
