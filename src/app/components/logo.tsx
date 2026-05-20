import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center transition-opacity hover:opacity-80 py-1 shrink-0 gap-0",
        className
      )}
      aria-label="Double Black inc Home"
    >
      <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center">
        <Image
          src="https://i.imgur.com/5mWuIcM.png"
          alt="Double Black inc Logo"
          fill
          className="object-contain"
          priority
          data-ai-hint="brand logo"
        />
      </div>
      <span className="text-xl md:text-2xl lg:text-3xl font-logo tracking-tighter text-gradient-metallic whitespace-nowrap leading-none pt-1.5 -ml-1">
        Double Black inc.
      </span>
    </Link>
  );
}
