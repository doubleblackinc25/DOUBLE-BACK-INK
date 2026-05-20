
"use client";

import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "limited-editions",
    title: "Edições Limitadas",
    description: "Protótipos exclusivos de tiragem mínima para exploradores de elite.",
    className: "lg:col-start-1 lg:row-start-1 lg:row-span-2 min-h-[500px] lg:min-h-[700px]",
  },
  {
    id: "urban-equipment",
    title: "Equipamento Urbano",
    description: "Design tático e funcional para a selva de pedra.",
    className: "lg:col-start-2 lg:row-start-1 min-h-[300px]",
  },
  {
    id: "performance-trail",
    title: "Performance Trail",
    description: "Domine qualquer terreno com engenharia de ponta.",
    className: "lg:col-start-2 lg:row-start-2 min-h-[300px]",
    objectPosition: "center 25%",
  },
];

export default function ProductGrid() {
  return (
    <section className="container mx-auto py-20 sm:py-28 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-8">
        {categories.map((category) => {
          const image = PlaceHolderImages.find((img) => img.id === category.id);

          return (
            <Link
              key={category.id}
              href={`/collections/${category.id}`}
              className={`group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card/40 backdrop-blur-sm transition-all hover:border-accent/50 ${category.className}`}
            >
              {/* Imagem e Overlay */}
              <div className="relative w-full h-full overflow-hidden flex-grow">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    style={{ objectPosition: category.objectPosition || 'center' }}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    data-ai-hint={image.imageHint}
                  />
                )}
                
                {/* Gradiente de profundidade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Conteúdo Informativo */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="space-y-3 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                    <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                      Explorar Coleção
                    </p>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-logo text-white tracking-wider uppercase leading-none">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Botão de Ação Flutuante */}
                <div className="absolute top-6 right-6">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-black/50 border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:text-accent-foreground"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
