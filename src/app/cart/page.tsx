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
  const cartItems = [
    {
      id: "limited-editions",
      name: "DB SIGNATURE SERIES",
      collection: "Edições Limitadas",
      size: "G",
      color: "MARROM",
      price: "R$ 890,00",
      image: PlaceHolderImages.find(img => img.id === "limited-editions")?.imageUrl || "https://picsum.photos/seed/product/200/250",
      objectPosition: "center top"
    },
    {
      id: "performance-trail",
      name: "STEALTH CAMO",
      collection: "Performance Trail",
      size: "M",
      color: "CINZA",
      price: "R$ 650,00",
      image: PlaceHolderImages.find(img => img.id === "performance-trail")?.imageUrl || "https://picsum.photos/seed/product2/200/250",
      objectPosition: "center"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div className="space-y-4">
            <Button variant="ghost" asChild className="p-0 h-auto hover:bg-transparent hover:text-accent font-body text-xs uppercase tracking-widest">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o QG
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline text-gradient-metallic uppercase tracking-tighter leading-tight py-4 pr-8">
              Seu Equipamento
            </h1>
          </div>
          <p className="text-muted-foreground font-body uppercase text-xs tracking-[0.2em] mb-4 md:mb-6">[{cartItems.length}] itens prontos para expedição</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Listagem de Itens */}
          <div className="lg:col-span-2 space-y-8">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 group border-b border-border/40 pb-8">
                  <div className="relative w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden border border-border bg-secondary/20 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      style={{ objectPosition: item.objectPosition }}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg md:text-2xl font-logo uppercase tracking-wider text-white">
                          {item.name}
                        </h3>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive -mr-2">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-[10px] text-accent font-bold uppercase tracking-[0.3em]">{item.collection}</p>
                      <div className="flex gap-4 pt-2 text-xs text-muted-foreground font-body uppercase tracking-tighter">
                        <span>Tam: <span className="text-foreground font-bold">{item.size}</span></span>
                        <span>Estilo: <span className="text-foreground font-bold">{item.color}</span></span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center justify-center border border-border rounded overflow-hidden">
                        <button className="px-3 py-1 hover:text-accent transition-colors text-sm">-</button>
                        <span className="px-3 py-1 border-x border-border text-xs font-bold bg-secondary/10">1</span>
                        <button className="px-3 py-1 hover:text-accent transition-colors text-sm">+</button>
                      </div>
                      <span className="text-xl md:text-2xl font-headline tracking-widest text-white">{item.price}</span>
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
              
              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between text-muted-foreground uppercase tracking-tighter">
                  <span>Subtotal</span>
                  <span className="text-foreground font-bold">R$ 1.540,00</span>
                </div>
                <div className="flex justify-between text-muted-foreground uppercase tracking-tighter">
                  <span>Envio Tático</span>
                  <span className="text-accent font-bold">GRÁTIS</span>
                </div>
                <Separator className="bg-border my-4" />
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Total da Reserva</span>
                  <span className="text-4xl font-headline tracking-tighter text-gradient-metallic">R$ 1.540,00</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button variant="accent" size="lg" className="w-full h-16 text-lg font-headline uppercase tracking-widest group shadow-[0_0_20px_rgba(242,113,33,0.15)]">
                  Finalizar Reserva
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-[10px] font-body uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Transação Criptografada Double Black
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded border border-border/50 text-[9px] font-body text-muted-foreground uppercase leading-relaxed tracking-tighter">
                <p>Ao finalizar, você entra para a lista de prioridade para o drop exclusivo. O pagamento será processado apenas no lançamento oficial.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
