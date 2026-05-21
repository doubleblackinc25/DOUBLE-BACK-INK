
"use client";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Trash2, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  // Mock de dados para o carrinho sincronizado com as coleções
  const cartItems = [
    {
      id: "limited-editions",
      name: "Protótipo Alpine X1",
      collection: "Edições Limitadas",
      size: "G",
      color: "Obsidian Black",
      price: "R$ 890,00",
      image: PlaceHolderImages.find(img => img.id === "limited-editions")?.imageUrl || "https://picsum.photos/seed/product/200/250"
    },
    {
      id: "performance-trail",
      name: "Protótipo Performance Trail",
      collection: "Performance Trail",
      size: "M",
      color: "Stealth Gray Camo",
      price: "R$ 650,00",
      image: PlaceHolderImages.find(img => img.id === "performance-trail")?.imageUrl || "https://picsum.photos/seed/product2/200/250"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <Button variant="ghost" asChild className="mb-4 -ml-4 hover:bg-transparent hover:text-accent">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o QG
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-headline text-gradient-metallic uppercase tracking-tight">
              Seu Equipamento
            </h1>
          </div>
          <p className="text-muted-foreground font-body">2 itens prontos para expedição</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Listagem de Itens */}
          <div className="lg:col-span-2 space-y-8">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="relative w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden border border-border bg-secondary/20 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg md:text-xl font-logo uppercase tracking-wider text-white">
                          {item.name}
                        </h3>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive -mr-2">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-accent font-bold uppercase tracking-tighter">{item.collection}</p>
                      <div className="flex gap-4 pt-2 text-sm text-muted-foreground font-body">
                        <span>Tam: <span className="text-foreground font-bold">{item.size}</span></span>
                        <span>Cor: <span className="text-foreground font-bold">{item.color}</span></span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-border rounded">
                        <button className="px-3 py-1 hover:text-accent transition-colors">-</button>
                        <span className="px-3 py-1 border-x border-border text-sm">1</span>
                        <button className="px-3 py-1 hover:text-accent transition-colors">+</button>
                      </div>
                      <span className="text-xl font-headline tracking-widest text-white">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-border rounded-xl">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground font-body">Seu inventário está vazio.</p>
              </div>
            )}
          </div>

          {/* Resumo da Reserva */}
          <div className="space-y-6">
            <div className="bg-secondary/10 border-2 border-border p-8 rounded-lg space-y-6 sticky top-28">
              <h2 className="text-2xl font-logo uppercase tracking-widest border-b border-border pb-4">
                Logística
              </h2>
              
              <div className="space-y-3 font-body">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">R$ 1.540,00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envio Tático</span>
                  <span className="text-accent font-bold">GRÁTIS</span>
                </div>
                <Separator className="bg-border my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground">Total da Reserva</span>
                  <span className="text-3xl font-headline tracking-tighter text-gradient-metallic">R$ 1.540,00</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button variant="accent" size="lg" className="w-full h-16 text-lg font-headline uppercase tracking-widest group">
                  Finalizar Reserva
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-[10px] font-body uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Transação Criptografada Double Black
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded border border-border/50 text-[10px] font-body text-muted-foreground uppercase leading-relaxed">
                <p>Ao finalizar, você entra para a lista de prioridade para o drop exclusivo. O pagamento será processado apenas no lançamento.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
