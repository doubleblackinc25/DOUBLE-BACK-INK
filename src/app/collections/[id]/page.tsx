
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CollectionPage({ params }: Props) {
  const { id } = await params;
  
  const categoryNames: Record<string, string> = {
    "limited-editions": "Edições Limitadas",
    "urban-equipment": "Equipamento Urbano",
    "performance-trail": "Performance Trail",
  };

  const title = categoryNames[id] || "Coleção";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <div className="mb-12">
          <Button variant="ghost" asChild className="mb-6 -ml-4 hover:bg-transparent hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Início
            </Link>
          </Button>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline text-gradient-metallic uppercase tracking-tight">
            {title}
          </h1>
          <p className="mt-6 text-muted-foreground text-lg md:text-xl max-w-3xl font-body leading-relaxed">
            Explorando os limites da engenharia têxtil. Nossa linha de {title.toLowerCase()} é construída para aqueles que exigem nada menos que a perfeição técnica em cada fibra.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {[1, 2, 3].map((i) => (
                <Link key={i} href={`/products/db-x${i}`} className="group block">
                  <div className="bg-secondary/10 border-2 border-border/50 rounded-lg h-[450px] flex flex-col items-center justify-center p-8 text-center space-y-6 transition-all hover:border-accent/50 hover:bg-secondary/20">
                      <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <span className="text-accent text-3xl font-bold tracking-tighter">DB-X{i}</span>
                      </div>
                      <div className="space-y-2">
                          <h3 className="text-2xl font-logo tracking-widest uppercase">Protótipo em Teste</h3>
                          <p className="text-muted-foreground font-body">
                              Sendo submetido a condições extremas em laboratório. O futuro da performance Double Black chega em breve.
                          </p>
                      </div>
                      <div className="pt-4">
                          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold px-4 py-2 border border-accent/30 rounded-full">
                              Ver Detalhes
                          </span>
                      </div>
                  </div>
                </Link>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
