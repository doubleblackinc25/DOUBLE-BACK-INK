"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const sizes = ["P", "M", "G", "GG"];
const colors = [
  { name: "Obsidian", hex: "#000000" },
  { name: "Stealth", hex: "#333333" },
  { name: "Blaze", hex: "#f27121" },
];

const categories = [
  {
    id: "limited-editions",
    title: "Edições Limitadas",
    className: "col-span-1 md:row-span-2",
  },
  {
    id: "urban-equipment",
    title: "Equipamento Urbano",
    className: "col-span-1 md:col-span-2",
  },
  {
    id: "performance-trail",
    title: "Performance Trail",
    className: "col-span-1 md:col-span-2",
    objectPosition: "center 25%",
  },
];

export default function ProductGrid() {
  const [selections, setSelections] = useState<Record<string, { size: string; color: string }>>({
    "limited-editions": { size: "M", color: "Obsidian" },
    "urban-equipment": { size: "M", color: "Obsidian" },
    "performance-trail": { size: "M", color: "Obsidian" },
  });

  const updateSelection = (id: string, field: "size" | "color", value: string) => {
    setSelections((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <section className="container mx-auto py-20 sm:py-28 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-auto">
        {categories.map((category) => {
          const image = PlaceHolderImages.find((img) => img.id === category.id);
          const current = selections[category.id];

          return (
            <div
              key={category.id}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card/40 backdrop-blur-sm",
                category.className
              )}
            >
              {/* Imagem e Overlay */}
              <div className="relative aspect-[4/3] md:aspect-auto md:flex-grow overflow-hidden">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    style={{ objectPosition: (category as any).objectPosition || 'center' }}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Link href={`/collections/${category.id}`}>
                    <Button variant="ghost" size="icon" className="rounded-full bg-black/50 hover:bg-accent hover:text-accent-foreground">
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="absolute bottom-6 left-6">
                   <h3 className="text-2xl md:text-3xl font-logo text-white tracking-wider uppercase">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Controles de Seleção Integrados na Base */}
              <div className="p-6 space-y-6 bg-secondary/10">
                <div className="flex justify-between items-center gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Cor</Label>
                    <RadioGroup 
                      value={current.color} 
                      onValueChange={(val) => updateSelection(category.id, "color", val)}
                      className="flex gap-2"
                    >
                      {colors.map((color) => (
                        <div key={color.name}>
                          <RadioGroupItem value={color.name} id={`${category.id}-color-${color.name}`} className="sr-only" />
                          <Label
                            htmlFor={`${category.id}-color-${color.name}`}
                            className={cn(
                              "w-6 h-6 rounded-full border-2 border-transparent cursor-pointer transition-all block",
                              current.color === color.name ? "border-accent scale-110" : "hover:border-white/30"
                            )}
                            style={{ backgroundColor: color.hex }}
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2 text-right">
                    <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Tamanho</Label>
                    <RadioGroup 
                      value={current.size} 
                      onValueChange={(val) => updateSelection(category.id, "size", val)}
                      className="flex gap-1"
                    >
                      {sizes.map((size) => (
                        <div key={size}>
                          <RadioGroupItem value={size} id={`${category.id}-size-${size}`} className="sr-only" />
                          <Label
                            htmlFor={`${category.id}-size-${size}`}
                            className={cn(
                              "flex h-7 w-8 items-center justify-center rounded border border-border text-[10px] font-bold transition-all cursor-pointer",
                              current.size === size ? "bg-accent text-accent-foreground border-accent" : "bg-transparent text-muted-foreground hover:border-white/50"
                            )}
                          >
                            {size}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <Button variant="accent" className="w-full h-12 uppercase font-headline tracking-widest text-sm group">
                  <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  Reservar Agora
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
