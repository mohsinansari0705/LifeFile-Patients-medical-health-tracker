
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/logo';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthAction = () => {
    // In a real app, you'd handle login/signup here.
    // For this prototype, we'll just show a toast and redirect.
    toast({
      title: 'Success!',
      description: 'You are now logged in.',
    });
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      <div className="mb-8">
        <Logo />
      </div>
      <Tabs defaultValue="login" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input id="email-login" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Password</Label>
                <Input id="password-login" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAuthAction} className="w-full">
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Sign Up</CardTitle>
              <CardDescription>
                Create an account to start managing your health records.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name-signup">Full Name</Label>
                <Input id="name-signup" placeholder="Jane Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" required />
              </div>
              <div className="space-y-2">
                <Label>Are you a...</Label>
                <RadioGroup defaultValue="patient" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="patient" id="role-patient" />
                    <Label htmlFor="role-patient">Patient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doctor" id="role-doctor" />
                    <Label htmlFor="role-doctor">Doctor</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAuthAction} className="w-full">
                Create Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
