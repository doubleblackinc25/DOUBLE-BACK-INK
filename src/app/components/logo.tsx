import Link from "next/link";
import { DiamondIcon } from "./diamond-icon";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-xl font-bold uppercase tracking-wider transition-opacity hover:opacity-80",
        className
      )}
      aria-label="Double Black Supply Home"
    >
      <span>Double Black</span>
      <DiamondIcon className="text-accent" />
    </Link>
  );
}
