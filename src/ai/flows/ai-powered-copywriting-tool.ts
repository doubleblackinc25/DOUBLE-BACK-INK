'use server';
/**
 * @fileOverview A Genkit flow for generating and refining product descriptions and marketing copy for Double Black Supply.
 *
 * - generateDoubleBlackCopy - A function that handles the generation or refinement of marketing copy.
 * - GenerateDoubleBlackCopyInput - The input type for the generateDoubleBlackCopy function.
 * - GenerateDoubleBlackCopyOutput - The return type for the generateDoubleBlackCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDoubleBlackCopyInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productFeatures: z
    .string()
    .describe('A detailed description of the product features and technical specifications.'),
  targetAudience: z.string().optional().describe('The specific target audience for this copy (e.g., "elite athletes", "urban adventurers").'),
  existingCopy: z
    .string()
    .optional()
    .describe('Optional: Existing copy to refine or improve based on brand guidelines.'),
});
export type GenerateDoubleBlackCopyInput = z.infer<typeof GenerateDoubleBlackCopyInputSchema>;

const GenerateDoubleBlackCopyOutputSchema = z.object({
  generatedCopy: z.string().describe('The generated or refined marketing copy.'),
});
export type GenerateDoubleBlackCopyOutput = z.infer<typeof GenerateDoubleBlackCopyOutputSchema>;

export async function generateDoubleBlackCopy(
  input: GenerateDoubleBlackCopyInput
): Promise<GenerateDoubleBlackCopyOutput> {
  return generateDoubleBlackCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'doubleBlackCopywritingPrompt',
  input: {schema: GenerateDoubleBlackCopyInputSchema},
  output: {schema: GenerateDoubleBlackCopyOutputSchema},
  prompt: `You are an expert copywriter for Double Black Inc., a high-performance e-commerce brand inspired by 'Double Black Diamond' trails. Your goal is to create challenging, direct, premium, and inspiring marketing copy.

Our brand reflects exclusivity, extreme resistance, and adrenaline. Our audience consists of elite athletes, urban adventurers, and outdoor enthusiasts who seek the 'impossible'. Avoid generic terms; use language that speaks to performance and overcoming limits.

Product Name: {{{productName}}}
Product Features: {{{productFeatures}}}

{{#if targetAudience}}
Target Audience: {{{targetAudience}}}
{{/if}}

{{#if existingCopy}}
Refine the following copy to align with the Double Black Inc. brand voice:
"""
{{{existingCopy}}}
"""
{{else}}
Generate new marketing copy for the product described above.
{{/if}}

Ensure the tone is challenging, direct, premium, and inspiring. Focus on durability, performance, and the mindset of pushing boundaries. The output should be a single block of compelling text.`,
});

const generateDoubleBlackCopyFlow = ai.defineFlow(
  {
    name: 'generateDoubleBlackCopyFlow',
    inputSchema: GenerateDoubleBlackCopyInputSchema,
    outputSchema: GenerateDoubleBlackCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
