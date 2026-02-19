import React from "react";
import { cn } from "../../lib/utils";

export default function BackgroundGradient({ className = "", children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-2xl p-[1px] overflow-hidden group",
        "bg-[radial-gradient(1200px_600px_at_10%_-20%,hsl(var(--primary)/0.35),transparent),radial-gradient(800px_400px_at_110%_10%,hsl(var(--primary-dark)/0.35),transparent),linear-gradient(180deg,hsl(var(--border)),transparent)]",
        "transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]",
        className
      )}
    >
      <div className="rounded-2xl bg-card/95 backdrop-blur-xl h-full w-full">{children}</div>
    </div>
  );
}
