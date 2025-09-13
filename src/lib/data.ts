import type { Patient } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

export const currentPatient: Patient = {
  id: 'pat-001',
  name: 'Jane Doe',
  dob: '1985-05-23',
  bloodType: 'O+',
  medicalHistory: [
    {
      id: 'rec-001',
      date: '2024-03-12',
      type: 'Check-up',
      doctor: 'Dr. Evelyn Reed',
      summary:
        'Annual physical examination. Overall health is good. Cholesterol levels are slightly elevated. Recommended dietary adjustments and regular exercise.',
      details:
        'Blood pressure: 125/82 mmHg. Heart rate: 70 bpm. Total Cholesterol: 210 mg/dL. HDL: 50 mg/dL, LDL: 140 mg/dL. Discussed importance of a low-fat diet and increasing cardiovascular activity to 3-4 times a week.',
    },
    {
      id: 'rec-002',
      date: '2023-09-20',
      type: 'Specialist Visit',
      doctor: 'Dr. Alan Grant',
      summary:
        "Consultation with dermatologist for persistent skin rash on forearms. Diagnosed as mild eczema. ",
      details:
        "Patient reported intermittent itching and redness. Examination revealed dry, scaly patches consistent with atopic dermatitis. Advised to use hypoallergenic moisturizers and avoid harsh soaps. Allergic triggers were discussed as a potential cause.",
    },
    {
      id: 'rec-003',
      date: '2023-05-02',
      type: 'Lab Report',
      doctor: 'Dr. Evelyn Reed',
      summary:
        'Routine blood work results. Vitamin D levels are slightly low. All other markers within normal range.',
      details:
        'Vitamin D: 25 ng/mL (Slightly deficient). Complete Blood Count (CBC): Normal. Thyroid-Stimulating Hormone (TSH): 2.1 mIU/L (Normal).',
    },
    {
      id: 'rec-004',
      date: '2022-11-15',
      type: 'Prescription',
      doctor: 'Dr. Evelyn Reed',
      summary:
        'Prescribed seasonal allergy medication to manage hay fever symptoms.',
      details:
        'Prescription: Loratadine 10mg, once daily as needed for allergy symptoms like sneezing, runny nose, and itchy eyes.',
    },
     {
      id: 'rec-005',
      date: '2021-06-30',
      type: 'Check-up',
      doctor: 'Dr. Evelyn Reed',
      summary:
        'Follow-up visit regarding family history of hypertension. Patient\'s blood pressure is currently stable and in a healthy range.',
      details:
        'Blood pressure reading: 118/75 mmHg. Patient advised on preventive lifestyle measures including maintaining a low-sodium diet, regular physical activity, and stress management techniques. No medication required at this time.',
    },
  ],
};
