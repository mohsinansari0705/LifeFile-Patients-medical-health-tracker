import { Suspense } from 'react';
import { currentPatient } from '@/lib/data';
import AiInsights from '@/components/dashboard/ai-insights';
import MedicalHistory from '@/components/dashboard/medical-history';
import PatientOverview from '@/components/dashboard/patient-overview';
import { Skeleton } from '@/components/ui/skeleton';

export default async function DashboardPage() {
  const patient = currentPatient;
  const medicalHistoryText = patient.medicalHistory
    .map(
      (record) =>
        `On ${record.date}, a ${record.type} with ${record.doctor} concluded: ${record.summary}. Details: ${record.details || 'N/A'}`
    )
    .join('\n\n');

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <PatientOverview patient={patient} />
        <MedicalHistory
          patientName={patient.name}
          medicalHistory={patient.medicalHistory}
          fullHistoryText={medicalHistoryText}
        />
      </div>
      <div className="lg:col-span-1">
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          }
        >
          <AiInsights medicalHistory={medicalHistoryText} />
        </Suspense>
      </div>
    </div>
  );
}
