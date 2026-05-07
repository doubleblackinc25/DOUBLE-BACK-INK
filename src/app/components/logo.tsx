
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center transition-opacity hover:opacity-80 py-1 shrink-0",
        className
      )}
      aria-label="Double Black inc Home"
    >
      <div className="flex items-center">
        <span className="font-logo text-3xl md:text-5xl tracking-tight text-gradient-metallic py-1 leading-none whitespace-nowrap">
          Double Black inc.
        </span>
      </div>
    </Link>
  );
}
