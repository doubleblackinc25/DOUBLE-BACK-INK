import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center transition-opacity hover:opacity-80 py-1 shrink-0 gap-3 md:gap-4",
        className
      )}
      aria-label="Double Black inc Home"
    >
      <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
        <Image
          src="https://i.imgur.com/5mWuIcM.png"
          alt="Double Black inc Logo"
          fill
          className="object-contain"
          priority
          data-ai-hint="brand logo"
        />
      </div>
      <span className="text-2xl md:text-4xl font-logo tracking-tighter text-gradient-metallic pt-1">
        Double Black inc.
      </span>
    </Link>
  );
}
