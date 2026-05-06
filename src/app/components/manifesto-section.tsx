
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ManifestoSection() {
  const logoImage = PlaceHolderImages.find((img) => img.id === "brand-logo");

  return (
    <section className="bg-secondary/20 py-20 sm:py-28 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center items-center gap-6 mb-10">
          <div className="w-24 h-px bg-border"></div>
          {logoImage && (
            <div className="relative w-16 h-16 grayscale brightness-125 opacity-80">
              <Image
                src={logoImage.imageUrl}
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="w-24 h-px bg-border"></div>
        </div>
        <p className="max-w-3xl mx-auto text-2xl md:text-3xl font-medium uppercase tracking-wider text-foreground leading-relaxed">
          Não somos para todos. Somos para os 1% que não param onde a trilha
          termina.
        </p>
      </div>
    </section>
  );
}
