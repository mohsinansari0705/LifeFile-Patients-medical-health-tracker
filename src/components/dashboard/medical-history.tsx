import type { MedicalRecord } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Stethoscope, Beaker, Pill } from 'lucide-react';
import AiSummaryDialog from './ai-summary-dialog';

interface MedicalHistoryProps {
  patientName: string;
  medicalHistory: MedicalRecord[];
  fullHistoryText: string;
}

const getIconForType = (type: MedicalRecord['type']) => {
  switch (type) {
    case 'Check-up':
      return <Stethoscope className="w-5 h-5 text-primary" />;
    case 'Lab Report':
      return <Beaker className="w-5 h-5 text-green-600" />;
    case 'Prescription':
      return <Pill className="w-5 h-5 text-red-600" />;
    case 'Specialist Visit':
      return <FileText className="w-5 h-5 text-purple-600" />;
    default:
      return <FileText className="w-5 h-5 text-muted-foreground" />;
  }
};

export default function MedicalHistory({
  patientName,
  medicalHistory,
  fullHistoryText,
}: MedicalHistoryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="font-headline flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Medical History
          </CardTitle>
          <CardDescription>
            A comprehensive log of all medical events.
          </CardDescription>
        </div>
        <AiSummaryDialog
          patientName={patientName}
          medicalHistory={fullHistoryText}
        />
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {medicalHistory.map((record) => (
            <AccordionItem value={record.id} key={record.id}>
              <AccordionTrigger>
                <div className="flex items-center gap-4 w-full">
                  {getIconForType(record.type)}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full text-left">
                    <span className="font-semibold">{record.type}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(record.date).toLocaleDateString()} with{' '}
                      {record.doctor}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-14">
                <p className="font-medium mb-2">{record.summary}</p>
                {record.details && (
                  <p className="text-muted-foreground">{record.details}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
