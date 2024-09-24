"use client"; // Required for Next.js

import { MiniKit } from "@worldcoin/minikit-js";
import { ReactNode, useEffect } from "react";

export default function MiniKitProvider({ children }: { children: ReactNode }) {

  useEffect(() => {
    const kit = MiniKit.install();
  }, []);

  return <>{children}</>;
}
