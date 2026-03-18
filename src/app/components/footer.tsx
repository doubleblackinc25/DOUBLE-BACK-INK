import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DiamondIcon } from "./diamond-icon";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
              Entre para o Esquadrão de Elite
            </h2>
            <p className="text-muted-foreground max-w-md">
              Seja o primeiro a saber sobre lançamentos de edições limitadas e
              tenha acesso a conteúdo exclusivo. Sem spam. Apenas performance.
            </p>
          </div>
          <form className="flex w-full max-w-md space-x-2">
            <Input
              type="email"
              placeholder="seu.email@dominio.com"
              className="flex-1 bg-background border-2 border-border focus:border-accent focus:ring-accent text-lg h-12"
              aria-label="Email para newsletter"
            />
            <Button
              type="submit"
              variant="accent"
              className="h-12 text-lg uppercase font-bold"
            >
              Inscrever
            </Button>
          </form>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Double Black Supply Inc. Domine o Extremo.
          </p>
        </div>
      </div>
    </footer>
  );
}
