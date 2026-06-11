
"use client";

import { use, useState } from "react";
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

type ProductView = {
  imageUrl: string;
  description: string;
  imageHint: string;
  id: string;
  position: string;
};

type ProductData = {
  id: string;
  name: string;
  price: { label: string; value: number };
  views: ProductView[];
  description: string;
};

function ProductSection({ product, collectionTitle, colors }: { product: ProductData; collectionTitle: string; colors: { name: string; hex: string }[] }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      collection: collectionTitle,
      size: selectedSize,
      color: selectedColor,
      price: product.price.label,
      priceValue: product.price.value,
      image: product.views[0].imageUrl,
      objectPosition: product.views[0].position
    });

    toast({
      title: "Equipamento Reservado",
      description: `${product.name} adicionado ao inventário.`,
    });

    router.push('/cart');
  };

  const getCircleStyle = (colorName: string) => {
    switch (colorName) {
      case "OFF WHITE":
        return { backgroundColor: "#FDFBD3" }; // Amarelado Off White
      case "PRETO":
        return { backgroundColor: "#000000" };
      case "CINZA":
        return { backgroundColor: "#3f4441" };
      case "MARROM":
        return { backgroundColor: "#BCAAA4" }; // Marrom claro conforme pedido
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
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start py-16 border-b border-border/50 last:border-0">
      <div className="space-y-6">
        <Carousel className="w-full max-w-xl mx-auto">
          <CarouselContent>
            {product.views.map((view, index) => (
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
                    {product.name}
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
            {product.name}
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            {product.description}
          </p>
          <p className="text-3xl font-headline text-accent tracking-widest pt-4">{product.price.label}</p>
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
                  <RadioGroupItem value={color.name} id={`color-${product.id}-${color.name}`} className="sr-only" />
                  <Label
                    htmlFor={`color-${product.id}-${color.name}`}
                    className={cn(
                      "w-16 h-16 rounded-full border-2 border-white cursor-pointer transition-all flex items-center justify-center p-0.5 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden",
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
                  <RadioGroupItem value={size} id={`size-${product.id}-${size}`} className="sr-only" />
                  <Label
                    htmlFor={`size-${product.id}-${size}`}
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
  );
}

export default function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const categoryNames: Record<string, string> = {
    "limited-editions": "Edições Limitadas",
    "urban-equipment": "Equipamento Urbano",
    "performance-trail": "Performance Trail",
  };

  const colors = id === "limited-editions" 
    ? [{ name: "MARROM", hex: "#BCAAA4" }]
    : id === "performance-trail"
      ? [{ name: "CAMO GREY", hex: "#4a4a4a" }]
      : [
          { name: "OFF WHITE", hex: "#FDFBD3" },
          { name: "PRETO", hex: "#000000" },
          { name: "CINZA", hex: "#3f4441" }
        ];

  const title = categoryNames[id] || "Coleção";

  const getProducts = (): ProductData[] => {
    if (id === "urban-equipment") {
      return [
        {
          id: "urban-alpha",
          name: "EQUIPAMENTO URBANO ALPHA",
          price: { label: "R$ 99,90", value: 99.9 },
          description: "Protótipo projetado para a selva de concreto. Versatilidade e resistência em cada costura.",
          views: [
            { imageUrl: "https://i.imgur.com/yaYYNvs.png", description: "Urban Front View", imageHint: "tactical urban", id: "v1", position: "center" },
            { imageUrl: "https://i.imgur.com/kAOjqU0.png", description: "Urban Side View", imageHint: "tactical urban side", id: "v2", position: "center" },
          ]
        },
        {
          id: "urban-beta",
          name: "EQUIPAMENTO URBANO BETA",
          price: { label: "R$ 99,90", value: 99.9 },
          description: "Expansão da linha Alpha. Ergonomia aprimorada para deslocamentos rápidos em ambientes hostis.",
          views: [
            { imageUrl: "https://i.imgur.com/EV8J5jA.png", description: "Urban Alt View 1", imageHint: "tactical urban gear", id: "v3", position: "center" },
            { imageUrl: "https://picsum.photos/seed/urbanbeta/800/1000", description: "Urban Alt View 2", imageHint: "tactical equipment", id: "v4", position: "center" },
          ]
        }
      ];
    }

    const price = id === "limited-editions" ? { label: "R$ 129,90", value: 129.9 } : { label: "R$ 129,90", value: 129.9 };
    const name = id === "performance-trail" ? "STEALTH CAMO" : "DB SIGNATURE SERIES";
    const desc = "Este protótipo foi projetado para ambientes de alta performance. DNA de elite Double Black.";
    
    const baseImg = PlaceHolderImages.find((img) => img.id === id) || { imageUrl: "https://picsum.photos/seed/p1/800/1000", description: "View", imageHint: "product" };
    
    return [{
      id: id + "-main",
      name: name,
      price: price,
      description: desc,
      views: [
        { imageUrl: baseImg.imageUrl, description: baseImg.description, imageHint: baseImg.imageHint, id: "v1", position: id === "limited-editions" ? "center 0%" : "center 30%" },
        { 
          imageUrl: id === "performance-trail" ? "https://i.imgur.com/zTLskGD.png" : "https://i.imgur.com/BN9U7qI.png", 
          description: "Side View", 
          imageHint: "product side", 
          id: "v2",
          position: id === "performance-trail" ? "center 15%" : "center"
        }
      ]
    }];
  };

  const products = getProducts();

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

        <div className="space-y-24">
          {products.map((product) => (
            <ProductSection key={product.id} product={product} collectionTitle={title} colors={colors} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
