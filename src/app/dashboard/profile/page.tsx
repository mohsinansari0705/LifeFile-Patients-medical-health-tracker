'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Upload,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleVerifyIdentity } from '@/app/actions';
import { currentPatient } from '@/lib/data';

type VerificationStatus =
  | 'idle'
  | 'uploading'
  | 'verifying'
  | 'verified'
  | 'failed';

export default function ProfilePage() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setStatus('idle');
      setVerificationResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please upload an image of your document.',
        variant: 'destructive',
      });
      return;
    }

    setStatus('verifying');
    setVerificationResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64String = reader.result as string;
      const result = await handleVerifyIdentity({
        documentDataUri: base64String,
        patientName: currentPatient.name,
        patientDob: currentPatient.dob,
      });

      if (result.error) {
        setStatus('failed');
        setVerificationResult({ reason: result.error });
      } else {
        setVerificationResult(result);
        if (result.isVerified) {
          setStatus('verified');
          toast({
            title: 'Verification Successful',
            description: result.reason,
            variant: 'default',
          });
        } else {
          setStatus('failed');
          toast({
            title: 'Verification Failed',
            description: result.reason,
            variant: 'destructive',
          });
        }
      }
    };
  };

  const getStatusContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-muted-foreground">
              Analyzing document and verifying identity...
            </p>
          </div>
        );
      case 'verified':
        return (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Identity Verified!</AlertTitle>
            <AlertDescription>
              {verificationResult?.reason || 'Your identity has been successfully verified.'}
            </AlertDescription>
          </Alert>
        );
      case 'failed':
        return (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>
              {verificationResult?.reason || 'Could not verify your identity. Please try again.'}
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            This is your personal information as recorded in our system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <p className="font-semibold">{currentPatient.name}</p>
            </div>
            <div>
              <Label>Date of Birth</Label>
              <p className="font-semibold">{new Date(currentPatient.dob).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Identity Verification
          </CardTitle>
          <CardDescription>
            Upload a government-issued ID to verify your identity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="document-upload">Upload Document</Label>
            <div className="flex items-center gap-4">
              <Input
                id="document-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="max-w-xs"
              />
              <Button
                onClick={handleSubmit}
                disabled={!file || status === 'verifying'}
              >
                {status === 'verifying' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Verify
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Please upload a clear image of your ID (e.g., Driver's License or
              Passport).
            </p>
          </div>

          {preview && (
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-sm">Image Preview:</h4>
              <img
                src={preview}
                alt="Document preview"
                className="max-w-xs rounded-md"
              />
            </div>
          )}

          <div className="pt-4">{getStatusContent()}</div>
        </CardContent>
      </Card>
    </div>
  );
}
