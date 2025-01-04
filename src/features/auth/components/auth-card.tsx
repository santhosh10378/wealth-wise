import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthForm } from './auth-form';

interface Props {
  isSignIn: boolean;
}

export function AuthCard({ isSignIn }: Props) {
  const headerTitle = isSignIn ? 'Welcome Back!' : 'Join Us Today!';
  const headerDescription = isSignIn ? 'Sign in to your account to continue.' : 'Create an account to explore all features.';
  const footerLinkLabel = isSignIn ? 'Sign Up' : 'Sign In';
  const footerLinkHref = isSignIn ? '/sign-up' : '/sign-in';
  const footerDescription = isSignIn ? "Don't have an account yet? " : 'Already have an account? ';

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='items-center'>
        <CardTitle className='text-xl'>{headerTitle}</CardTitle>
        <CardDescription className='text-sm'>{headerDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm isSignIn={isSignIn} />
      </CardContent>
      <CardFooter>
        <p className='w-full text-center text-xs'>
          <span>{footerDescription}</span>
          <Link href={footerLinkHref} className='text-primary hover:underline transition'>
            {footerLinkLabel}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
