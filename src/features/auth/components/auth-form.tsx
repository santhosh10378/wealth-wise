'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { handleGithubSignIn, handleGoogleSignIn } from '@/actions/auth-actions';

import { useAuthForm } from '@/features/auth/hooks/use-auth-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';

interface Props {
  isSignIn: boolean;
}

export const AuthForm = ({ isSignIn }: Props) => {
  const { form, isLoading, onSubmit, error } = useAuthForm(isSignIn);

  return (
    <Form {...form}>
      {error && <div className='p-2 rounded-md bg-red-100 dark:bg-red-500/20 text-red-500 text-sm font-medium'>{error}</div>}

      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        {!isSignIn && <CustomInputFormField control={form.control} disabled={isLoading} label='Name' name='name' placeholder='John' type='text' />}
        <CustomInputFormField control={form.control} disabled={isLoading} label='Email' name='email' placeholder='john@sample.com' type='email' />
        <CustomInputFormField
          control={form.control}
          disabled={isLoading}
          label='Password'
          name='password'
          placeholder='*********'
          type='password'
          // forgotPasswordHref={isSignIn ? '/password/forgot' : ''}
        />

        {/* Submit Button */}
        <Button type='submit' disabled={isLoading} className='w-full'>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>

        <hr />

        <div className='flex flex-col gap-3'>
          <Button type='button' variant='outline' disabled={isLoading} className='w-full' onClick={async () => await handleGoogleSignIn()}>
            <FcGoogle className='size-4' />
            Continue with Google
          </Button>

          <Button type='button' variant='outline' disabled={isLoading} className='w-full' onClick={async () => await handleGithubSignIn()}>
            <FaGithub className='size-4' />
            Continue with Github
          </Button>
        </div>
      </form>
    </Form>
  );
};
