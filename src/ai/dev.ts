import { config } from 'dotenv';
config();

import '@/ai/flows/generate-patient-summary.ts';
import '@/ai/flows/identify-health-risks.ts';
import '@/ai/flows/suggest-preventive-tips.ts';
import '@/ai/flows/verify-identity.ts';
