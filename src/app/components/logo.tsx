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
        "flex items-center gap-3 transition-opacity hover:opacity-80",
        className
      )}
      aria-label="Double Black inc Home"
    >
      {logoImage && (
        <div className="relative w-8 h-8 md:w-10 md:h-10">
          <Image
            src={logoImage.imageUrl}
            alt="Double Black inc Logo"
            fill
            className="object-contain"
          />
        </div>
      )}
      <div className="flex items-center">
        <span className="font-logo text-2xl md:text-4xl tracking-tight text-gradient-metallic">
          Double Black inc
        </span>
      </div>
    </Link>
  );
}
