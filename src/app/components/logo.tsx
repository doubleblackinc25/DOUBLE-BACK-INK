
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
        "flex items-center gap-3 transition-opacity hover:opacity-80 py-2",
        className
      )}
      aria-label="Double Black inc Home"
    >
      {logoImage && (
        <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
          <Image
            src={logoImage.imageUrl}
            alt="Double Black inc Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      )}
      <div className="flex items-center overflow-visible">
        <span className="font-logo text-sm md:text-lg tracking-tight text-gradient-metallic py-1 leading-none whitespace-nowrap">
          Double Black inc.
        </span>
      </div>
    </Link>
  );
}
