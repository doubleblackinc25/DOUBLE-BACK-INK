
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  const logoImage = PlaceHolderImages.find((img) => img.id === "brand-logo");

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-4 transition-opacity hover:opacity-80 py-1 shrink-0",
        className
      )}
      aria-label="Double Black inc Home"
    >
      {logoImage && (
        <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 bg-neutral-900/20 rounded-lg flex items-center justify-center">
          <Image
            src={logoImage.imageUrl}
            alt="Double Black inc Logo"
            fill
            className="object-contain"
            priority
            data-ai-hint={logoImage.imageHint}
          />
        </div>
      )}
      <div className="flex items-center">
        <span className="font-logo text-3xl md:text-4xl lg:text-5xl tracking-tight text-gradient-metallic py-1 leading-none whitespace-nowrap">
          Double Black inc.
        </span>
      </div>
    </Link>
  );
}
