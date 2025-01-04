import { PieChartIcon } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/' className='flex items-center gap-1.5'>
      <PieChartIcon />
      <p className='text-xl font-bold'>WealthWise</p>
    </Link>
  );
};
