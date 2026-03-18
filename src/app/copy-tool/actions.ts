"use server";

import {
  generateDoubleBlackCopy,
  type GenerateDoubleBlackCopyInput,
} from "@/ai/flows/ai-powered-copywriting-tool";
import { z } from "zod";

const CopyToolSchema = z.object({
  productName: z.string().min(1, "Product name is required."),
  productFeatures: z.string().min(1, "Product features are required."),
  targetAudience: z.string().optional(),
  existingCopy: z.string().optional(),
});

export type FormState = {
  data: { generatedCopy: string } | null;
  error: string | null;
  fieldErrors?: {
    [key in keyof GenerateDoubleBlackCopyInput]?: string[];
  };
};

export async function generateCopyAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    productName: formData.get("productName"),
    productFeatures: formData.get("productFeatures"),
    targetAudience: formData.get("targetAudience"),
    existingCopy: formData.get("existingCopy"),
  };

  const validatedFields = CopyToolSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      data: null,
      error: "Invalid form data.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateDoubleBlackCopy(validatedFields.data);
    return { data: result, error: null };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      data: null,
      error: `Failed to generate copy: ${errorMessage}`,
    };
  }
}
