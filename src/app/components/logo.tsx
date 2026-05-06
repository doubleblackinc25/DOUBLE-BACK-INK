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
      aria-label="DOUBLE BLACK inc. Home"
    >
      {logoImage && (
        <div className="relative w-10 h-10 md:w-12 md:h-12">
          <Image
            src={logoImage.imageUrl}
            alt="DOUBLE BLACK inc. Logo"
            fill
            className="object-contain"
          />
        </div>
      )}
      <div className="flex flex-col leading-none">
        <span className="font-logo text-2xl md:text-4xl tracking-tight text-white uppercase italic">
          DOUBLE BLACK
          <span className="text-lg md:text-xl lowercase ml-1 align-bottom font-logo not-italic opacity-90">inc.</span>
        </span>
      </div>
    </Link>
  );
}
