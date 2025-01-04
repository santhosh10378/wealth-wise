import { getCurrentUser } from '@/actions/auth-actions';
import { Header } from '@/components/layouts/header';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }
  return (
    <>
      <Header />
      <main className='px-4 lg:px-14'>{children}</main>
    </>
  );
}
