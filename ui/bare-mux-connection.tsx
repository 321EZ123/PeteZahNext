"use client";

import { useEffect } from "react";
import { BareMuxConnection } from "@mercuryworkshop/bare-mux";

export default function BareMuxConnectionComponent() {
  useEffect(() => {
    async function initConnection() {
      const connection = new BareMuxConnection("/baremux/worker.js");

      await connection.setTransport("/epoxy/index.mjs", [
        { wisp: "wss://wisp.mercurywork.shop/" },
      ]);
      await connection.setTransport("/baremod/index.mjs", ["https://tomp.app/"]);
    }

    initConnection().catch(console.error);
  }, []);

  return null;
}
