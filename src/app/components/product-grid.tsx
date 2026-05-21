
"use client";

import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

export default function ProductGrid() {
  const limitedEditionsImage = PlaceHolderImages.find((img) => img.id === "limited-editions");
  const urbanEquipmentImage = PlaceHolderImages.find((img) => img.id === "urban-equipment");
  const performanceTrailImage = PlaceHolderImages.find((img) => img.id === "performance-trail");

  return (
    <section className="container mx-auto py-20 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 min-h-[600px] lg:min-h-[800px] items-stretch">
        
        {/* Retângulo Vertical: Edições Limitadas */}
        <div className="h-full">
          <Link
            href="/collections/limited-editions"
            className="group relative flex flex-col h-full overflow-hidden rounded-lg border-2 border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(242,113,33,0.1)]"
          >
            <div className="relative w-full h-full overflow-hidden flex-grow">
              {limitedEditionsImage && (
                <Image
                  src={limitedEditionsImage.imageUrl}
                  alt={limitedEditionsImage.description}
                  fill
                  style={{ objectPosition: 'center 30%' }}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={limitedEditionsImage.imageHint}
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <div className="space-y-4">
                  <p className="text-accent text-xs font-bold uppercase tracking-[0.4em] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    Drop Exclusivo
                  </p>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-logo text-white tracking-wider uppercase leading-none">
                    Edições <br /> Limitadas
                  </h3>
                  <p className="text-muted-foreground text-sm font-body max-w-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 leading-relaxed">
                    Protótipos de engenharia avançada produzidos em tiragem única.
                  </p>
                </div>
              </div>

              <div className="absolute top-8 right-8">
                <div className="rounded-full bg-black/60 p-3 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-accent hover:text-accent-foreground">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Coluna da Direita: Dois quadrados perfeitamente alinhados */}
        <div className="flex flex-col gap-6 lg:gap-8 h-full">
          {/* Quadrado Superior: Equipamento Urbano */}
          <Link
            href="/collections/urban-equipment"
            className="group relative flex-1 flex flex-col overflow-hidden rounded-lg border-2 border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(242,113,33,0.1)]"
          >
            <div className="relative w-full h-full overflow-hidden">
              {urbanEquipmentImage && (
                <Image
                  src={urbanEquipmentImage.imageUrl}
                  alt={urbanEquipmentImage.description}
                  fill
                  style={{ objectPosition: 'center 30%' }}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={urbanEquipmentImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-2">
                  <p className="text-accent text-xs font-bold uppercase tracking-[0.4em] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    City Tactical
                  </p>
                  <h3 className="text-2xl md:text-4xl font-logo text-white tracking-wider uppercase leading-none">
                    Equipamento Urbano
                  </h3>
                  <p className="text-muted-foreground text-xs font-body max-w-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 leading-relaxed">
                    Funcionalidade extrema adaptada para a selva de concreto.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Quadrado Inferior: Performance Trail */}
          <Link
            href="/collections/performance-trail"
            className="group relative flex-1 flex flex-col overflow-hidden rounded-lg border-2 border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(242,113,33,0.1)]"
          >
            <div className="relative w-full h-full overflow-hidden">
              {performanceTrailImage && (
                <Image
                  src={performanceTrailImage.imageUrl}
                  alt={performanceTrailImage.description}
                  fill
                  style={{ objectPosition: '40% 35%' }}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={performanceTrailImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-2">
                  <p className="text-accent text-xs font-bold uppercase tracking-[0.4em] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    Hard Terrain
                  </p>
                  <h3 className="text-2xl md:text-4xl font-logo text-white tracking-wider uppercase leading-none">
                    Performance Trail
                  </h3>
                  <p className="text-muted-foreground text-xs font-body max-w-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 leading-relaxed">
                    Engenharia têxtil para enfrentar as condições mais severas.
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
