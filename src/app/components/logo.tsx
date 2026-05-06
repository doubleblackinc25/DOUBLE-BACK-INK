
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
        "flex items-center gap-3 text-xl font-bold uppercase tracking-wider transition-opacity hover:opacity-80",
        className
      )}
      aria-label="DOUBLE BLACK inc, Home"
    >
      {logoImage && (
        <div className="relative w-10 h-10">
          <Image
            src={logoImage.imageUrl}
            alt="DOUBLE BLACK inc, Logo"
            fill
            className="object-contain"
          />
        </div>
      )}
      <span className="whitespace-nowrap">DOUBLE BLACK inc,</span>
    </Link>
  );
}
