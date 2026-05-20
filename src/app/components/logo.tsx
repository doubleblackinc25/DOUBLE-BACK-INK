
import Link from "next/link";
import Image from "next/image";
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
      <div className="relative w-40 h-10 md:w-64 md:h-16 shrink-0">
        <Image
          src="https://i.imgur.com/Q6yxaW3.png"
          alt="Double Black inc Logo"
          fill
          className="object-contain"
          priority
          data-ai-hint="brand logo"
        />
      </div>
    </Link>
  );
}
