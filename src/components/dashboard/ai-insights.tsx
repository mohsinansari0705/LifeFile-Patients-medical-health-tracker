import { identifyHealthRisks } from '@/ai/flows/identify-health-risks';
import { suggestPreventiveTips } from '@/ai/flows/suggest-preventive-tips';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, Lightbulb } from 'lucide-react';

interface AiInsightsProps {
  medicalHistory: string;
}

export default async function AiInsights({ medicalHistory }: AiInsightsProps) {
  let identifiedRisks =
    'No potential health risks were identified based on the provided history.';
  let preventiveTips = 'Maintain a healthy lifestyle.';
  let error = null;

  try {
    const risksResult = await identifyHealthRisks({ medicalHistory });
    if (risksResult.identifiedRisks) {
      identifiedRisks = risksResult.identifiedRisks;
      const tipsResult = await suggestPreventiveTips({
        healthRisks: identifiedRisks,
      });
      if (tipsResult.preventiveTips) {
        preventiveTips = tipsResult.preventiveTips;
      }
    }
  } catch (e) {
    console.error('AI Insight Error:', e);
    error = 'Could not load AI insights at this time.';
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-destructive flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-destructive-foreground bg-destructive -m-6 p-6 rounded-t-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Potential Health Risks
          </CardTitle>
          <CardDescription className="pt-4">
            Identified by AI based on your medical history. Consult a doctor for
            medical advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: identifiedRisks.replace(/\n/g, '<br />'),
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Preventive Tips
          </CardTitle>
          <CardDescription>
            AI-suggested lifestyle adjustments to mitigate risks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: preventiveTips.replace(/\n/g, '<br />'),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
