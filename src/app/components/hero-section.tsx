"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <div
          className="absolute w-full h-[120%] top-0"
          style={{ transform: `translateY(${offsetY * 0.4}px)` }}
        >
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 p-4 container mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tighter drop-shadow-lg">
          Domine o Extremo
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 drop-shadow-md">
          Roupas técnicas para quem faz da trilha impossível o seu quintal.
        </p>
        <div className="mt-8">
          <Button
            variant="accent"
            size="lg"
            className="uppercase font-bold tracking-wider"
          >
            Explorar Equipamento
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
