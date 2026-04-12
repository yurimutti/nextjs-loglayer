"use client";

import { useEffect } from "react";

import { log } from "@/lib/logger";

export function ClientLogEffect() {
  useEffect(() => {
    log
      .withContext({ requestId: "client-abc" })
      .withMetadata({ source: "useEffect", page: "/log-demo/client" })
      .info("Client mounted");
  }, []);

  return (
    <p className="text-sm text-zinc-300">
      This component logs once on mount using <code>useEffect</code>.
    </p>
  );
}
