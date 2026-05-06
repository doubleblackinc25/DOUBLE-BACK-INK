
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  const logoUrl = "https://res.cloudinary.com/dxfjl4kds/image/upload/f_auto,q_auto/ChatGPT_Image_6_de_mai._de_2026_14_10_12_a1i50b";

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 transition-opacity hover:opacity-80 py-1 shrink-0",
        className
      )}
      aria-label="Double Black inc Home"
    >
      <div className="relative w-10 h-10 shrink-0 bg-transparent flex items-center justify-center">
        <Image
          src={logoUrl}
          alt="Double Black inc Logo"
          fill
          className="object-contain"
          priority
          data-ai-hint="metallic diamond"
        />
      </div>
      <div className="flex items-center">
        <span className="font-logo text-2xl md:text-3xl tracking-tight text-gradient-metallic py-1 leading-none whitespace-nowrap">
          Double Black inc.
        </span>
      </div>
    </Link>
  );
}
