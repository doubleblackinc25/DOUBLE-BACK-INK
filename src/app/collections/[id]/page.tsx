
"use client";

import { useState, use } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { ArrowLeft, ShoppingCart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

type Props = {
  params: Promise<{ id: string }>;
};

export default function CollectionPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const colors = id === "limited-editions" 
    ? [{ name: "MARROM", hex: "#8D6E63" }]
    : id === "performance-trail"
      ? [{ name: "CAMO GREY", hex: "#4a4a4a" }]
      : [
          { name: "OFF WHITE", hex: "#FAF9F6" },
          { name: "PRETO", hex: "#000000" },
          { name: "CINZA", hex: "#3f4441" }
        ];

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  const categoryNames: Record<string, string> = {
    "limited-editions": "Edições Limitadas",
    "urban-equipment": "Equipamento Urbano",
    "performance-trail": "Performance Trail",
  };

  const title = categoryNames[id] || "Coleção";
  
  const officialName = id === "performance-trail" 
    ? "STEALTH CAMO" 
    : id === "limited-editions" 
      ? "DB SIGNATURE SERIES" 
      : id.replace('-', ' ').toUpperCase();

  const prices: Record<string, { label: string, value: number }> = {
    "limited-editions": { label: "R$ 129,90", value: 129.9 },
    "performance-trail": { label: "R$ 129,90", value: 129.9 },
    "urban-equipment": { label: "R$ 99,90", value: 99.9 },
  };

  const currentPrice = prices[id] || { label: "R$ 0,00", value: 0 };

  const baseProductImage = PlaceHolderImages.find((img) => img.id === id) || {
    imageUrl: "https://picsum.photos/seed/product/800/1000",
    description: "Product View",
    imageHint: "technical product"
  };

  const productViews = id === "urban-equipment" ? [
    { imageUrl: "https://i.imgur.com/yaYYNvs.png", description: "Urban Front View", imageHint: "tactical urban", id: "view-1", position: "center" },
    { imageUrl: "https://i.imgur.com/kAOjqU0.png", description: "Urban Side View", imageHint: "tactical urban side", id: "view-2", position: "center" },
  ] : [
    { ...baseProductImage, id: "view-1", position: id === "limited-editions" ? "center 0%" : "center 30%" },
    { 
      imageUrl: id === "performance-trail" 
        ? "https://i.imgur.com/zTLskGD.png" 
        : id === "limited-editions" 
          ? "https://i.imgur.com/BN9U7qI.png" 
          : "https://picsum.photos/seed/view2/800/1000", 
      description: "Side View", 
      imageHint: "product side", 
      id: "view-2",
      position: id === "performance-trail" ? "center 15%" : "center"
    },
  ];

  const handleAddToCart = () => {
    addItem({
      id,
      name: officialName,
      collection: title,
      size: selectedSize,
      color: selectedColor,
      price: currentPrice.label,
      priceValue: currentPrice.value,
      image: productViews[0].imageUrl,
      objectPosition: productViews[0].position
    });

    toast({
      title: "Equipamento Reservado",
      description: `${officialName} adicionado ao inventário.`,
    });

    router.push('/cart');
  };

  const getCircleStyle = (colorName: string) => {
    switch (colorName) {
      case "OFF WHITE":
        return { backgroundColor: "#FAF9F6" };
      case "PRETO":
        return { backgroundColor: "#000000" };
      case "CINZA":
        return { backgroundColor: "#3f4441" };
      case "MARROM":
        return { backgroundColor: "#8D6E63" };
      case "CAMO GREY":
        return { 
          background: "#3f4441",
          backgroundImage: `
            radial-gradient(circle at 10% 20%, #4a4a4a 0%, #4a4a4a 35%, transparent 35.5%),
            radial-gradient(circle at 80% 10%, #2a2d2b 0%, #2a2d2b 30%, transparent 30.5%),
            radial-gradient(circle at 40% 70%, #5a5a5a 0%, #5a5a5a 25%, transparent 25.5%),
            radial-gradient(circle at 90% 80%, #353535 0%, #353535 20%, transparent 20.5%)
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
        <div className="mb-12">
          <Button variant="ghost" asChild className="mb-6 -ml-4 hover:bg-transparent hover:text-accent font-body text-xs uppercase tracking-widest">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Início
            </Link>
          </Button>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline text-gradient-metallic uppercase tracking-tight py-4 pr-8">
            {title}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start py-8">
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
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                        {officialName}
                      </div>
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

          <div className="flex flex-col space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-logo uppercase tracking-tight text-white">
                DNA de Alta Performance
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                Este protótipo foi projetado para ambientes de alta performance. Configure suas especificações abaixo para a reserva.
              </p>
              <p className="text-3xl font-headline text-accent tracking-widest pt-4">{currentPrice.label}</p>
            </div>

            <div className="space-y-8 pt-8 border-t border-border">
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
                          "flex h-12 w-16 items-center justify-center rounded-md border-2 border-border bg-secondary/10 text-sm font-bold uppercase transition-all cursor-pointer",
                          selectedSize === size ? "border-accent bg-accent text-accent-foreground" : "hover:bg-secondary/30"
                        )}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4 pt-4">
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="w-full h-16 text-lg font-headline uppercase tracking-widest group"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-6 w-6 transition-transform group-hover:-translate-y-1" />
                  Reservar Protótipo
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-body">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Qualidade garantida Double Black
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
