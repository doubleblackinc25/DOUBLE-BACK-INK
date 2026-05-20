
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateCopyAction, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const initialState: FormState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full uppercase font-headline text-lg"
      size="lg"
      variant="accent"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Gerando...
        </>
      ) : (
        <>
          Gerar Copy <Wand2 className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
}

export function CopyForm() {
  const [state, formAction] = useFormState(generateCopyAction, initialState);
  const { toast } = useToast();
  const logoImage = PlaceHolderImages.find((img) => img.id === "brand-logo");

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <Card className="border-2 border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-2xl font-headline uppercase tracking-wider flex items-center gap-3">
            {logoImage && (
              <div className="relative w-8 h-8">
                <Image
                  src={logoImage.imageUrl}
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            AI Copywriting Tool
          </CardTitle>
          <CardDescription className="font-body">
            Gere ou refine textos de produtos alinhados com a voz da marca Double Black inc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6 font-body">
            <div className="space-y-2">
              <Label htmlFor="productName">Nome do Produto</Label>
              <Input id="productName" name="productName" placeholder="ex: DB-X1 Alpine Shell" required className="bg-background/50" />
              {state.fieldErrors?.productName && <p className="text-destructive text-sm">{state.fieldErrors.productName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="productFeatures">Características do Produto</Label>
              <Textarea id="productFeatures" name="productFeatures" placeholder="Descreva funcionalidades, materiais e especificações de alta performance..." required rows={5} className="bg-background/50" />
              {state.fieldErrors?.productFeatures && <p className="text-destructive text-sm">{state.fieldErrors.productFeatures}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Público-Alvo (Opcional)</Label>
              <Input id="targetAudience" name="targetAudience" placeholder="ex: Montanhistas de elite, exploradores urbanos" className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="existingCopy">Texto Existente para Refinar (Opcional)</Label>
              <Textarea id="existingCopy" name="existingCopy" placeholder="Cole o texto atual aqui para transformá-lo na voz da marca..." rows={5} className="bg-background/50" />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-headline uppercase tracking-wider">Texto Gerado</h2>
        <Card className="min-h-[400px] bg-secondary/20 border-border border-dashed overflow-hidden">
            <CardContent className="p-6 h-full">
            {state.data?.generatedCopy ? (
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-lg font-body leading-relaxed text-foreground/90 italic">
                      "{state.data.generatedCopy}"
                  </p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[350px] text-muted-foreground text-center space-y-4">
                    <Wand2 className="h-12 w-12 opacity-20" />
                    <p className="font-body max-w-[250px]">Seu texto de marketing de alta performance aparecerá aqui após a geração.</p>
                </div>
            )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
