import type { Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cake, Droplets, User } from 'lucide-react';

interface PatientOverviewProps {
  patient: Patient;
}

export default function PatientOverview({ patient }: PatientOverviewProps) {
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <User className="w-5 h-5" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-semibold">{patient.name}</p>
              <p className="text-muted-foreground">Name</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Cake className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-semibold">
                {new Date(patient.dob).toLocaleDateString()} ({calculateAge(patient.dob)} years)
              </p>
              <p className="text-muted-foreground">Date of Birth</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-semibold">{patient.bloodType}</p>
              <p className="text-muted-foreground">Blood Type</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
