
"use client";

import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductGrid() {
  const limitedEditionsImage = PlaceHolderImages.find((img) => img.id === "limited-editions");
  const urbanEquipmentImage = PlaceHolderImages.find((img) => img.id === "urban-equipment");
  const performanceTrailImage = PlaceHolderImages.find((img) => img.id === "performance-trail");

  return (
    <section className="container mx-auto py-20 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 min-h-[600px] lg:min-h-[800px]">
        
        {/* Retângulo Vertical: Edições Limitadas (Ocupa as 2 linhas da coluna 1) */}
        <div className="md:row-span-2 h-full">
          <Link
            href="/collections/limited-editions"
            className="group relative flex flex-col h-full overflow-hidden rounded-lg border border-border bg-card/40 backdrop-blur-sm transition-all hover:border-accent/50"
          >
            <div className="relative w-full h-full overflow-hidden flex-grow min-h-[400px]">
              {limitedEditionsImage && (
                <Image
                  src={limitedEditionsImage.imageUrl}
                  alt={limitedEditionsImage.description}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={limitedEditionsImage.imageHint}
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-3 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                    Explorar Coleção
                  </p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-logo text-white tracking-wider uppercase leading-none">
                    Edições Limitadas
                  </h3>
                  <p className="text-muted-foreground text-sm font-body max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                    Protótipos exclusivos de tiragem mínima para exploradores de elite.
                  </p>
                </div>
              </div>

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
        </div>

        {/* Coluna da Direita: Dois quadrados empilhados */}
        <div className="flex flex-col gap-6 lg:gap-8 h-full">
          {/* Quadrado Superior: Equipamento Urbano */}
          <Link
            href="/collections/urban-equipment"
            className="group relative flex-1 flex flex-col overflow-hidden rounded-lg border border-border bg-card/40 backdrop-blur-sm transition-all hover:border-accent/50 min-h-[280px]"
          >
            <div className="relative w-full h-full overflow-hidden flex-grow">
              {urbanEquipmentImage && (
                <Image
                  src={urbanEquipmentImage.imageUrl}
                  alt={urbanEquipmentImage.description}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={urbanEquipmentImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-2 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                    Explorar Coleção
                  </p>
                  <h3 className="text-2xl md:text-3xl font-logo text-white tracking-wider uppercase leading-none">
                    Equipamento Urbano
                  </h3>
                  <p className="text-muted-foreground text-xs font-body max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                    Design tático e funcional para a selva de pedra.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Quadrado Inferior: Performance Trail */}
          <Link
            href="/collections/performance-trail"
            className="group relative flex-1 flex flex-col overflow-hidden rounded-lg border border-border bg-card/40 backdrop-blur-sm transition-all hover:border-accent/50 min-h-[280px]"
          >
            <div className="relative w-full h-full overflow-hidden flex-grow">
              {performanceTrailImage && (
                <Image
                  src={performanceTrailImage.imageUrl}
                  alt={performanceTrailImage.description}
                  fill
                  style={{ objectPosition: 'center 25%' }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={performanceTrailImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-2 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                    Explorar Coleção
                  </p>
                  <h3 className="text-2xl md:text-3xl font-logo text-white tracking-wider uppercase leading-none">
                    Performance Trail
                  </h3>
                  <p className="text-muted-foreground text-xs font-body max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                    Domine qualquer terreno com engenharia de ponta.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
