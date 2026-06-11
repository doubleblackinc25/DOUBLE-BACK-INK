
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
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sizes = ["P", "M", "G", "GG", "XG"];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const isLimited = id.includes("limited");
  const isTrail = id.includes("trail");
  
  const colors = isLimited
    ? [{ name: "MARROM", hex: "#8D6E63" }]
    : isTrail
      ? [{ name: "CAMO GREY", hex: "#4a4a4a" }]
      : [
          { name: "OFF WHITE", hex: "#FDFBD3" },
          { name: "PRETO", hex: "#000000" },
          { name: "CINZA", hex: "#3f4441" }
        ];

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  const productName = id.includes("trail") 
    ? "STEALTH CAMO" 
    : id.includes("limited") 
      ? "DB SIGNATURE SERIES" 
      : id.includes("urban") 
        ? "EQUIPAMENTO URBANO" 
        : `Equipamento ${id.toUpperCase()} Alpine`;

  const prices: Record<string, { label: string, value: number }> = {
    "limited-editions": { label: "R$ 129,90", value: 129.9 },
    "performance-trail": { label: "R$ 129,90", value: 129.9 },
    "urban-equipment": { label: "R$ 99,90", value: 99.9 },
  };

  const priceKey = id.includes("limited") ? "limited-editions" : id.includes("trail") ? "performance-trail" : "urban-equipment";
  const currentPrice = prices[priceKey] || { label: "R$ 0,00", value: 0 };

  const baseProductImage = PlaceHolderImages.find((img) => img.id === priceKey) || {
    imageUrl: "https://picsum.photos/seed/product/800/1000",
    description: "Product View",
    imageHint: "technical product"
  };

  const productViews = id.includes("urban") ? [
    { imageUrl: "https://i.imgur.com/yaYYNvs.png", description: "Urban Front View", imageHint: "tactical urban", id: "view-1", position: "center" },
    { imageUrl: "https://i.imgur.com/kAOjqU0.png", description: "Urban Side View", imageHint: "tactical urban side", id: "view-2", position: "center" },
  ] : [
    { ...baseProductImage, id: "view-1", position: id.includes("limited") ? "center 0%" : "center 30%" },
    { 
      imageUrl: id.includes("trail") ? "https://i.imgur.com/zTLskGD.png" : id.includes("limited") ? "https://i.imgur.com/BN9U7qI.png" : "https://picsum.photos/seed/view2/800/1000", 
      description: "Side View", 
      imageHint: "product side", 
      id: "view-2",
      position: id.includes("trail") ? "center 15%" : "center"
    },
  ];

  const handleAddToCart = () => {
    addItem({
      id,
      name: productName,
      collection: id.includes("limited") ? "Edições Limitadas" : id.includes("trail") ? "Performance Trail" : "Equipamento Urbano",
      size: selectedSize,
      color: selectedColor,
      price: currentPrice.label,
      priceValue: currentPrice.value,
      image: productViews[0].imageUrl,
      objectPosition: productViews[0].position
    });

    toast({
      title: "Equipamento Reservado",
      description: `${productName} adicionado ao inventário.`,
    });

    router.push('/cart');
  };

  const getCircleStyle = (colorName: string) => {
    switch (colorName) {
      case "OFF WHITE":
        return { backgroundColor: "#FDFBD3" };
      case "PRETO":
        return { backgroundColor: "#000000" };
      case "CINZA":
        return { backgroundColor: "#3f4441" };
      case "MARROM":
        return { backgroundColor: "#8D6E63" };
      case "CAMO GREY":
        return { 
          background: "#4b4b4b",
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #2d2d2d 0%, #2d2d2d 25%, transparent 25.5%),
            radial-gradient(circle at 70% 20%, #6a6a6a 0%, #6a6a6a 30%, transparent 30.5%),
            radial-gradient(circle at 50% 60%, #3c3c3c 0%, #3c3c3c 28%, transparent 28.5%),
            radial-gradient(circle at 85% 75%, #2a2a2a 0%, #2a2a2a 22%, transparent 22.5%),
            radial-gradient(circle at 15% 85%, #5a5a5a 0%, #5a5a5a 18%, transparent 18.5%),
            radial-gradient(circle at 60% 90%, #333333 0%, #333333 25%, transparent 25.5%)
          `,
          backgroundSize: "cover"
        };
      default:
        return { backgroundColor: "#3f4441" };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <Button variant="ghost" asChild className="mb-8 -ml-4 hover:bg-transparent hover:text-accent font-body text-xs uppercase tracking-widest">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="space-y-6">
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {productViews.map((view, index) => (
                  <CarouselItem key={view.id}>
                    <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-border bg-secondary/10 shadow-2xl mx-auto max-w-[400px]">
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
                          {productName}
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-6 mt-8">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 border-2 border-border hover:border-accent hover:text-accent bg-transparent" />
                <CarouselNext className="static translate-y-0 h-12 w-12 border-2 border-border hover:border-accent hover:text-accent bg-transparent" />
              </div>
            </Carousel>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-logo uppercase tracking-tight text-gradient-metallic py-4 pr-8">
                {productName}
              </h1>
              <p className="text-xl text-muted-foreground font-body leading-relaxed">
                Desenvolvido para expedições onde a margem de erro é zero. Construção em polímero reforçado e arquitetura de ventilação dinâmica.
              </p>
              <p className="text-3xl font-headline text-accent tracking-widest pt-4">{currentPrice.label}</p>
            </div>

            <div className="space-y-6 pt-6 border-t border-border">
              <div className="space-y-4">
                <Label className="text-sm uppercase tracking-widest text-muted-foreground">
                  Estilo: {selectedColor}
                </Label>
                <RadioGroup 
                  value={selectedColor} 
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-4"
                >
                  {colors.map((color) => (
                    <div key={color.name}>
                      <RadioGroupItem value={color.name} id={`color-${color.name}`} className="sr-only" />
                      <Label
                        htmlFor={`color-${color.name}`}
                        className={cn(
                          "w-16 h-16 rounded-full border-2 border-transparent cursor-pointer transition-all flex items-center justify-center p-0.5 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden",
                          selectedColor === color.name ? "border-accent scale-110 shadow-accent/20" : "hover:border-white/50"
                        )}
                      >
                        <span 
                          className="w-full h-full rounded-full" 
                          style={getCircleStyle(color.name)} 
                        />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-sm uppercase tracking-widest text-muted-foreground">Tamanho</Label>
                <RadioGroup 
                  value={selectedSize} 
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-3"
                >
                  {sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                      <Label
                        htmlFor={`size-${size}`}
                        className={cn(
                          "flex h-12 w-14 items-center justify-center rounded-md border-2 border-border bg-secondary/10 text-sm font-bold uppercase transition-all cursor-pointer",
                          selectedSize === size ? "border-accent bg-accent text-accent-foreground" : "hover:bg-secondary/30"
                        )}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4 pt-8">
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="w-full h-14 text-lg font-headline uppercase tracking-widest group"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                  Reservar Protótipo
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-body">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Qualidade garantida Double Black
                </div>
              </div>
            </div>

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
