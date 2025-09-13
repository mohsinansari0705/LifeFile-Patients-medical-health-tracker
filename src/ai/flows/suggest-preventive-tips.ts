// src/ai/flows/suggest-preventive-tips.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting personalized preventive tips based on identified health risks.
 *
 * - suggestPreventiveTips - An async function that takes health risks as input and returns personalized preventive tips.
 * - SuggestPreventiveTipsInput - The input type for the suggestPreventiveTips function.
 * - SuggestPreventiveTipsOutput - The output type for the suggestPreventiveTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPreventiveTipsInputSchema = z.object({
  healthRisks: z
    .string()
    .describe('A detailed description of the identified health risks.'),
});
export type SuggestPreventiveTipsInput = z.infer<typeof SuggestPreventiveTipsInputSchema>;

const SuggestPreventiveTipsOutputSchema = z.object({
  preventiveTips: z
    .string()
    .describe('Personalized lifestyle and preventive tips to mitigate the identified health risks.'),
});
export type SuggestPreventiveTipsOutput = z.infer<typeof SuggestPreventiveTipsOutputSchema>;

export async function suggestPreventiveTips(
  input: SuggestPreventiveTipsInput
): Promise<SuggestPreventiveTipsOutput> {
  return suggestPreventiveTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPreventiveTipsPrompt',
  input: {schema: SuggestPreventiveTipsInputSchema},
  output: {schema: SuggestPreventiveTipsOutputSchema},
  prompt: `You are an AI health assistant that provides personalized lifestyle and preventive tips based on identified health risks.

  Based on the following health risks:
  {{healthRisks}}

  Suggest lifestyle adjustments and preventive measures to mitigate these risks. Provide the tips in a structured and easy-to-understand manner.
  Do not provide any introductory or concluding remarks.
  Focus on actionable steps that the user can take.
  `,
});

const suggestPreventiveTipsFlow = ai.defineFlow(
  {
    name: 'suggestPreventiveTipsFlow',
    inputSchema: SuggestPreventiveTipsInputSchema,
    outputSchema: SuggestPreventiveTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
