"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateCopyAction, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DiamondIcon } from "../components/diamond-icon";
import { Wand2, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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
      className="w-full uppercase font-bold text-lg"
      size="lg"
      variant="accent"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          Generate Copy <Wand2 className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
}

export function CopyForm() {
  const [state, formAction] = useFormState(generateCopyAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold uppercase tracking-wider flex items-center gap-2">
            <DiamondIcon />
            AI Copywriting Tool
          </CardTitle>
          <CardDescription>
            Generate or refine product copy aligned with the Double Black Inc. brand voice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" name="productName" placeholder="e.g., DB-X1 Alpine Shell" required />
              {state.fieldErrors?.productName && <p className="text-red-500 text-sm">{state.fieldErrors.productName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="productFeatures">Product Features</Label>
              <Textarea id="productFeatures" name="productFeatures" placeholder="Describe features, materials, and tech specs..." required rows={5} />
              {state.fieldErrors?.productFeatures && <p className="text-red-500 text-sm">{state.fieldErrors.productFeatures}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
              <Input id="targetAudience" name="targetAudience" placeholder="e.g., Elite mountaineers, urban explorers" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="existingCopy">Existing Copy to Refine (Optional)</Label>
              <Textarea id="existingCopy" name="existingCopy" placeholder="Paste existing copy here to refine it..." rows={5} />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold uppercase tracking-wider">Generated Copy</h2>
        <Card className="min-h-[300px] bg-secondary/20 border-border border-dashed">
            <CardContent className="p-6">
            {state.data?.generatedCopy ? (
                <pre className="whitespace-pre-wrap text-lg font-sans text-foreground">
                    {state.data.generatedCopy}
                </pre>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                    <p>Your generated marketing copy will appear here.</p>
                </div>
            )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
