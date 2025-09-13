'use server';

/**
 * @fileOverview A Genkit flow for verifying user identity from a document.
 *
 * - verifyIdentity - An async function that takes a document image and user details to verify identity.
 * - VerifyIdentityInput - The input type for the verifyIdentity function.
 * - VerifyIdentityOutput - The return type for the verifyIdentity function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyIdentityInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "An image of the government-issued ID, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  patientName: z.string().describe('The name of the patient.'),
  patientDob: z.string().describe('The date of birth of the patient.'),
});
export type VerifyIdentityInput = z.infer<typeof VerifyIdentityInputSchema>;

const VerifyIdentityOutputSchema = z.object({
  isVerified: z
    .boolean()
    .describe(
      'Whether the identity is verified based on the provided document.'
    ),
  reason: z
    .string()
    .describe(
      'The reason for the verification status (e.g., "Details match", "Name mismatch", "Document unclear").'
    ),
  extractedName: z.string().optional().describe('The name extracted from the document.'),
  extractedDob: z.string().optional().describe('The date of birth extracted from the document.'),
});
export type VerifyIdentityOutput = z.infer<typeof VerifyIdentityOutputSchema>;

export async function verifyIdentity(
  input: VerifyIdentityInput
): Promise<VerifyIdentityOutput> {
  return verifyIdentityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyIdentityPrompt',
  input: { schema: VerifyIdentityInputSchema },
  output: { schema: VerifyIdentityOutputSchema },
  prompt: `You are an AI assistant performing identity verification.

  Analyze the provided government-issued document image and compare the extracted name and date of birth with the patient's information.

  Patient Name: {{{patientName}}}
  Patient Date of Birth: {{{patientDob}}}
  Document Image: {{media url=documentDataUri}}

  - Extract the full name and date of birth from the document.
  - Compare the extracted information with the patient's details.
  - Set 'isVerified' to true if both the name and date of birth are a clear match. Otherwise, set it to false.
  - Provide a concise reason for the verification status. If there is a mismatch, specify what did not match. If the document is unreadable, state that.
  - Return the extracted name and date of birth if possible.
  `,
});

const verifyIdentityFlow = ai.defineFlow(
  {
    name: 'verifyIdentityFlow',
    inputSchema: VerifyIdentityInputSchema,
    outputSchema: VerifyIdentityOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
