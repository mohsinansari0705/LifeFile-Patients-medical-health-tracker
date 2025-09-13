'use server';

import {
  generatePatientSummary,
  type GeneratePatientSummaryInput,
} from '@/ai/flows/generate-patient-summary';
import {
  identifyHealthRisks,
  type IdentifyHealthRisksInput,
} from '@/ai/flows/identify-health-risks';
import {
  suggestPreventiveTips,
  type SuggestPreventiveTipsInput,
} from '@/ai/flows/suggest-preventive-tips';
import {
  verifyIdentity,
  type VerifyIdentityInput,
} from '@/ai/flows/verify-identity';
import { z } from 'zod';

const generateSummarySchema = z.object({
  medicalHistory: z.string(),
  patientName: z.string(),
});

export async function handleGenerateSummary(
  input: GeneratePatientSummaryInput
) {
  const validation = generateSummarySchema.safeParse(input);
  if (!validation.success) {
    return { error: 'Invalid input.' };
  }

  try {
    const result = await generatePatientSummary(validation.data);
    return { summary: result.summary };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate summary. Please try again.' };
  }
}

const verifyIdentitySchema = z.object({
  documentDataUri: z.string(),
  patientName: z.string(),
  patientDob: z.string(),
});

export async function handleVerifyIdentity(input: VerifyIdentityInput) {
  const validation = verifyIdentitySchema.safeParse(input);
  if (!validation.success) {
    return { error: 'Invalid input.' };
  }

  try {
    const result = await verifyIdentity(validation.data);
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to verify identity. Please try again.' };
  }
}
