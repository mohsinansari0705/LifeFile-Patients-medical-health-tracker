export type MedicalRecord = {
  id: string;
  date: string;
  type: 'Check-up' | 'Lab Report' | 'Prescription' | 'Specialist Visit';
  doctor: string;
  summary: string;
  details?: string;
};

export type Patient = {
  id: string;
  name: string;
  dob: string;
  bloodType: string;
  medicalHistory: MedicalRecord[];
};
