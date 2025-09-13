import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { FileText } from 'lucide-react';

export default function MedicalRecordsPage() {
  const xrayImage = PlaceHolderImages.find((img) => img.id === 'x-ray-image');
  const bloodTestReport = PlaceHolderImages.find(
    (img) => img.id === 'blood-test-report'
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Medical Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          {xrayImage && (
            <div className="space-y-2">
              <h3 className="font-semibold">Chest X-Ray (Mar 2024)</h3>
              <div className="border rounded-lg overflow-hidden">
                <Image
                  src={xrayImage.imageUrl}
                  alt="Chest X-Ray"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                  data-ai-hint={xrayImage.imageHint}
                />
              </div>
            </div>
          )}
          {bloodTestReport && (
            <div className="space-y-2">
              <h3 className="font-semibold">Blood Test Results (May 2023)</h3>
              <div className="border rounded-lg overflow-hidden">
                <Image
                  src={bloodTestReport.imageUrl}
                  alt="Blood Test Report"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                  data-ai-hint={bloodTestReport.imageHint}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
