
"use client";

import { useState, use } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ShoppingCart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sizes = ["P", "M", "G", "GG", "XG"];
const colors = [
  { name: "Obsidian Black", hex: "#000000" },
  { name: "Stealth Gray", hex: "#333333" },
  { name: "Blaze Orange", hex: "#f27121" },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  const baseProductImage = PlaceHolderImages.find((img) => img.id === "limited-editions") || {
    imageUrl: "https://picsum.photos/seed/product/800/1000",
    description: "Product View",
    imageHint: "technical product"
  };

  const productViews = [
    { ...baseProductImage, id: "view-1", position: "center 30%" },
    { 
      imageUrl: id.includes("trail") ? "https://i.imgur.com/zTLskGD.png" : "https://picsum.photos/seed/view2/800/1000", 
      description: "Side View", 
      imageHint: "product side", 
      id: "view-2",
      position: id.includes("trail") ? "center 15%" : "center"
    },
    { imageUrl: "https://picsum.photos/seed/view3/800/1000", description: "Detail View", imageHint: "product detail", id: "view-3", position: "center" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <Button variant="ghost" asChild className="mb-8 -ml-4 hover:bg-transparent hover:text-accent">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Carousel */}
          <div className="space-y-6">
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {productViews.map((view, index) => (
                  <CarouselItem key={view.id}>
                    <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-border bg-secondary/10 shadow-2xl mx-auto max-w-[480px]">
                      <Image
                        src={view.imageUrl}
                        alt={view.description}
                        fill
                        className="object-cover"
                        style={{ objectPosition: view.position }}
                        priority={index === 0}
                        data-ai-hint={view.imageHint}
                      />
                      {index === 0 && (
                        <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                          Protótipo {id.toUpperCase()}
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Navigation arrows positioned below the image */}
              <div className="flex justify-center gap-6 mt-8">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 border-2 border-border hover:border-accent hover:text-accent bg-transparent" />
                <CarouselNext className="static translate-y-0 h-12 w-12 border-2 border-border hover:border-accent hover:text-accent bg-transparent" />
              </div>
            </Carousel>
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-logo uppercase tracking-tight text-gradient-metallic">
                Equipamento {id.toUpperCase()} Alpine
              </h1>
              <p className="text-xl text-muted-foreground font-body leading-relaxed">
                Desenvolvido para expedições onde a margem de erro é zero. Construção em polímero reforçado e arquitetura de ventilação dinâmica.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-border">
              {/* Color Selection */}
              <div className="space-y-4">
                <Label className="text-sm uppercase tracking-widest text-muted-foreground">Cor Técnica</Label>
                <RadioGroup 
                  defaultValue={selectedColor} 
                  onValueChange={setSelectedColor}
                  className="flex gap-4"
                >
                  {colors.map((color) => (
                    <div key={color.name} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={color.name}
                        id={`color-${color.name}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${color.name}`}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 border-transparent cursor-pointer transition-all flex items-center justify-center p-0.5",
                          selectedColor === color.name ? "border-accent scale-110" : "hover:border-white/50"
                        )}
                        title={color.name}
                      >
                        <span 
                          className="w-full h-full rounded-full shadow-inner border border-white/10" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <p className="text-xs font-medium text-accent uppercase tracking-tighter">{selectedColor}</p>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="text-sm uppercase tracking-widest text-muted-foreground">Tamanho</Label>
                  <span className="text-xs text-muted-foreground underline cursor-pointer hover:text-accent">Guia de Medidas</span>
                </div>
                <RadioGroup 
                  defaultValue={selectedSize} 
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-3"
                >
                  {sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className={cn(
                          "flex h-12 w-14 items-center justify-center rounded-md border-2 border-border bg-secondary/10 text-sm font-bold uppercase transition-all cursor-pointer",
                          "peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground",
                          "hover:bg-secondary/30"
                        )}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-8">
                <Button variant="accent" size="lg" className="w-full h-14 text-lg font-headline uppercase tracking-widest group">
                  <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                  Reservar Protótipo
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-body">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Qualidade garantida Double Black
                </div>
              </div>
            </div>

            {/* Tech Specs Summary */}
            <div className="bg-secondary/20 p-6 rounded-lg border border-border/50">
              <h3 className="font-logo uppercase tracking-widest text-sm mb-4">DNA do Equipamento</h3>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs font-body text-muted-foreground uppercase tracking-tighter">
                <li>• Membrana Carbon-X</li>
                <li>• Costuras Termoseladas</li>
                <li>• Peso: 320g</li>
                <li>• Resistência: 20k/20k</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
