import { LogLayer, type PluginBeforeMessageOutParams } from "loglayer";
import { PinoTransport } from "@loglayer/transport-pino";
import { getSimplePrettyTerminal } from "@loglayer/transport-simple-pretty-terminal";
import { pino } from "pino";
import { serializeError } from "serialize-error";

const isServer = typeof window === "undefined";
const isClient = !isServer;
const pinoLogger = pino({ level: "trace" });

export const log = new LogLayer({
  prefix: "[yurimutti.com]",
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
