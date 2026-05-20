
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-4 transition-opacity hover:opacity-80 py-1 shrink-0",
        className
      )}
      aria-label="Double Black inc Home"
    >
      <div className="relative w-12 h-12 md:w-20 md:h-20 shrink-0 bg-transparent flex items-center justify-center">
        <Image
          src="https://i.imgur.com/Q6yxaW3.png"
          alt="Double Black inc Logo"
          fill
          className="object-contain"
          priority
          data-ai-hint="brand logo"
        />
      </div>
      <div className="flex items-center">
        <span className="font-logo text-3xl md:text-5xl tracking-tight text-gradient-metallic py-1 leading-none whitespace-nowrap">
          Double Black inc.
        </span>
      </div>
    </Link>
  );
}
