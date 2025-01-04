import { Loader2Icon } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className='min-h-screen flex flex-col items-center gap-4 justify-center'>
      <Loader2Icon className='size-10 animate-spin text-primary' aria-label='Loading...' />
      <p className='text-sm font-medium text-muted-foreground'>Loading WealthWise... Please wait</p>
    </div>
  );
}
