import { currentPatient } from '@/lib/data';
import AiSummaryDialog from '@/components/dashboard/ai-summary-dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function SummaryPage() {
  const patient = currentPatient;
  const medicalHistoryText = patient.medicalHistory
    .map(
      (record) =>
        `On ${record.date}, a ${record.type} with ${record.doctor} concluded: ${record.summary}. Details: ${record.details || 'N/A'}`
    )
    .join('\n\n');

  return (
    <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Patient Health Summary
                </CardTitle>
                <CardDescription>
                    Generate an AI-powered summary of the patient's medical history.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-col items-center justify-center text-center p-4">
                    <p className="text-muted-foreground mb-4">
                        Click the button below to generate a comprehensive health summary for {patient.name}. This summary provides a concise overview of their medical history.
                    </p>
                    <AiSummaryDialog
                        patientName={patient.name}
                        medicalHistory={medicalHistoryText}
                    />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
