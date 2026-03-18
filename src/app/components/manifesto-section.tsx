import { DiamondIcon } from "./diamond-icon";

export default function ManifestoSection() {
  return (
    <section className="bg-secondary/20 py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-24 h-px bg-border"></div>
          <DiamondIcon className="text-3xl" />
          <div className="w-24 h-px bg-border"></div>
        </div>
        <p className="max-w-3xl mx-auto text-2xl md:text-3xl font-medium uppercase tracking-wider text-foreground">
          Não somos para todos. Somos para os 1% que não param onde a trilha
          termina.
        </p>
      </div>
    </section>
  );
}
