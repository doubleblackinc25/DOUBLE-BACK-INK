
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const db = useFirestore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !db) return;

    setIsSubmitting(true);
    const leadsRef = collection(db, "leads");
    const leadData = {
      email,
      createdAt: serverTimestamp(),
    };

    addDoc(leadsRef, leadData)
      .then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setEmail("");
        // Reseta o estado de sucesso após 5 segundos
        setTimeout(() => setIsSuccess(false), 5000);
      })
      .catch(async (error) => {
        setIsSubmitting(false);
        const permissionError = new FirestorePermissionError({
          path: "leads",
          operation: "create",
          requestResourceData: leadData,
        });
        errorEmitter.emit("permission-error", permissionError);
      });
  };

  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-headline uppercase tracking-wider">
              Entre para o Esquadrão de Elite
            </h2>
            <p className="text-muted-foreground max-w-md font-body text-sm md:text-base">
              Seja o primeiro a saber sobre lançamentos de edições limitadas e
              tenha acesso a conteúdo exclusivo. Sem spam. Apenas performance.
            </p>
          </div>
          <div className="flex flex-col w-full max-w-md space-y-2">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                type="email"
                placeholder="seu.email@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting || isSuccess}
                className="flex-1 bg-background border-2 border-border focus:border-accent focus:ring-accent text-lg h-12 font-body"
                aria-label="Email para newsletter"
              />
              <Button
                type="submit"
                variant={isSuccess ? "secondary" : "accent"}
                disabled={isSubmitting || isSuccess}
                className="h-12 text-lg uppercase font-headline min-w-[120px]"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isSuccess ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  "Inscrever"
                )}
              </Button>
            </form>
            {isSuccess && (
              <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] animate-pulse">
                Inscrição confirmada. Bem-vindo ao time.
              </p>
            )}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <Logo />
          <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
            <p className="text-sm text-muted-foreground font-body">
              © {new Date().getFullYear()} Double Black Supply Inc. Domine o Extremo.
            </p>
            <p className="text-[9px] md:text-[10px] text-muted-foreground/60 font-body uppercase tracking-tighter mt-1">
              PRODUTOS SUJEITOS A MODIFICAÇÕES/DIVERGÊNCIAS NO MOMENTO DA ENTREGA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
