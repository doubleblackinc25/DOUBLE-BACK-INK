import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { DiamondIcon } from "./diamond-icon";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "urban-equipment",
    title: "Equipamento Urbano",
    className: "col-span-1 md:col-span-2",
  },
  {
    id: "performance-trail",
    title: "Performance Trail",
    className: "col-span-1 md:row-span-2",
  },
  {
    id: "limited-editions",
    title: (
      <>
        Edições Limitadas <DiamondIcon className="inline-block" />
      </>
    ),
    className: "col-span-1",
  },
];

export default function ProductGrid() {
  return (
    <section className="container mx-auto py-20 sm:py-28 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
        {categories.map((category) => {
          const image = PlaceHolderImages.find((img) => img.id === category.id);
          return (
            <div
              key={category.id}
              className={cn(
                "group relative overflow-hidden rounded-md border border-border",
                category.className
              )}
            >
              {image && (
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  data-ai-hint={image.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl md:text-3xl font-bold uppercase text-white tracking-wider">
                  {category.title}
                </h3>
                <div className="mt-4 flex items-center text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Ver Coleção</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
              <a href="#" className="absolute inset-0" aria-label={`View ${category.id}`}></a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
