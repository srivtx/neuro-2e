"use client";

import { useEffect } from "react";
import { sounds } from "@/lib/sound";

export default function SoundProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      // Play sound for buttons and links
      if (
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.tagName === "A" ||
        target.closest("a")
      ) {
        // Don't play for the code editor or text inputs
        if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") return;
        sounds.button();
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return <>{children}</>;
}
