import { Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Stethoscope className="w-6 h-6 text-primary" />
      <span className="text-xl font-bold font-headline tracking-tight">
        LifeFile
      </span>
    </div>
  );
}
