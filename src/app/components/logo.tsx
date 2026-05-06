
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
        "flex items-center gap-2 transition-opacity hover:opacity-80",
        className
      )}
      aria-label="Double Black inc Home"
    >
      {logoImage && (
        <div className="relative w-6 h-6 md:w-8 md:h-8 shrink-0">
          <Image
            src={logoImage.imageUrl}
            alt="Double Black inc Logo"
            fill
            className="object-contain"
          />
        </div>
      )}
      <div className="flex items-center">
        <span className="font-logo text-base md:text-xl tracking-tight text-gradient-metallic py-1 leading-none">
          Double Black inc.
        </span>
      </div>
    </Link>
  );
}
