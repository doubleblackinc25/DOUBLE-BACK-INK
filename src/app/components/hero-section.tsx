"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const heroImage = {
    id: "hero-background",
    description: "Fundo extremo Double Black Supply",
    imageUrl: "https://i.imgur.com/YHouBjr.png",
    imageHint: "extreme landscape"
  };
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

  const scrollToProducts = () => {
    const element = document.getElementById("products-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-start justify-center text-center text-white overflow-hidden">
      <div
        className="absolute w-full h-[160%] -top-64"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          style={{ objectPosition: 'center top' }}
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 p-4 container mx-auto pt-24 md:pt-32">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline tracking-tight text-gradient-chrome py-4">
          Domine o Extremo
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 drop-shadow-md font-medium">
          Roupas de alta performance para quem faz da trilha impossível o seu quintal.
        </p>
        <div className="mt-12">
          <Button
            variant="accent"
            size="lg"
            className="font-bold tracking-wider px-10 h-14 text-lg rounded-full"
            onClick={scrollToProducts}
          >
            Explorar Equipamento
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}