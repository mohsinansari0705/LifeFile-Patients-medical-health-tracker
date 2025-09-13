'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a patient summary.
 *
 * - generatePatientSummary - An async function that takes patient data and returns a summarized health overview.
 * - GeneratePatientSummaryInput - The input type for the generatePatientSummary function.
 * - GeneratePatientSummaryOutput - The return type for the generatePatientSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePatientSummaryInputSchema = z.object({
  medicalHistory: z
    .string()
    .describe('The complete medical history of the patient.'),
  patientName: z.string().describe('The name of the patient.'),
});

export type GeneratePatientSummaryInput = z.infer<
  typeof GeneratePatientSummaryInputSchema
>;

const GeneratePatientSummaryOutputSchema = z.object({
  summary: z.string().describe('A summarized view of the patient history.'),
});

export type GeneratePatientSummaryOutput = z.infer<
  typeof GeneratePatientSummaryOutputSchema
>;

export async function generatePatientSummary(
  input: GeneratePatientSummaryInput
): Promise<GeneratePatientSummaryOutput> {
  return generatePatientSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePatientSummaryPrompt',
  input: {schema: GeneratePatientSummaryInputSchema},
  output: {schema: GeneratePatientSummaryOutputSchema},
  prompt: `You are an AI assistant specializing in summarizing patient medical histories.

  Based on the provided medical history, generate a concise and easy-to-understand summary for the patient.
  The summary should highlight key health events, ongoing conditions, and any significant trends.
  Make sure to address the patient directly using their name: {{{patientName}}}.

  Medical History: {{{medicalHistory}}}
  `,
});

const generatePatientSummaryFlow = ai.defineFlow(
  {
    name: 'generatePatientSummaryFlow',
    inputSchema: GeneratePatientSummaryInputSchema,
    outputSchema: GeneratePatientSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
