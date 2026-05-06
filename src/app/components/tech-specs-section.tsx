import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield, Wind, Thermometer } from "lucide-react";

const specs = [
  {
    icon: <Shield className="h-10 w-10 text-accent" />,
    title: "Impermeabilidade Total",
    description: "Membranas seladas para resistir às tempestades mais severas. A água não tem chance.",
  },
  {
    icon: <Wind className="h-10 w-10 text-accent" />,
    title: "Respirabilidade Extrema",
    description: "Tecidos que liberam o vapor sem comprometer a proteção. Mantenha o corpo seco por dentro e por fora.",
  },
  {
    icon: <Thermometer className="h-10 w-10 text-accent" />,
    title: "Resistência Térmica",
    description: "Isolamento avançado que se adapta à sua performance, protegendo do frio extremo sem superaquecer.",
  },
];

export default function TechSpecsSection() {
  return (
    <section className="bg-secondary/20 py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-logo uppercase tracking-wider">
                Engenharia de Performance
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                Cada peça é um sistema. Cada fibra, uma decisão. Construído para falhar nunca ser uma opção.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {specs.map((spec) => (
            <Card key={spec.title} className="bg-card border-2 border-border flex flex-col h-full text-center">
                <CardHeader className="flex flex-col items-center pt-8">
                    <div className="mb-4">{spec.icon}</div>
                    <CardTitle className="text-xl md:text-2xl font-logo uppercase tracking-wider">
                        {spec.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                    <CardDescription className="text-base text-muted-foreground">
                        {spec.description}
                    </CardDescription>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
