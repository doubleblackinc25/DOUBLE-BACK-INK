
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ManifestoSection() {
  const logoImage = PlaceHolderImages.find((img) => img.id === "brand-logo");

  return (
    <section className="bg-secondary/20 py-20 sm:py-28 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center items-center gap-6 mb-10">
          <div className="w-12 md:w-24 h-px bg-border"></div>
          {logoImage && (
            <div className="relative w-20 h-20 md:w-32 md:h-32 opacity-90 brightness-110 drop-shadow-2xl">
              <Image
                src={logoImage.imageUrl}
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="w-12 md:w-24 h-px bg-border"></div>
        </div>
        <p className="max-w-4xl mx-auto text-3xl md:text-5xl font-headline tracking-wide text-gradient-metallic leading-relaxed">
          Não somos para todos. Somos para os 1% que não param onde a trilha
          termina.
        </p>
      </div>
    </section>
  );
}
