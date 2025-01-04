import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signUpSchema, signInSchema } from '@/features/auth/schemas/auth-schemas';
import { handleCredentialsSignIn } from '@/actions/auth-actions';

export const useAuthForm = (isSignIn: boolean) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const formSchema = isSignIn ? signInSchema : signUpSchema;
  type FormType = z.infer<typeof formSchema>;

  const defaultValues = isSignIn ? { email: '', password: '' } : { name: '', email: '', password: '', confirmPassword: '' };

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: FormType) {
    setError('');
    setIsLoading(true);
    try {
      if (isSignIn) {
        const { success } = await handleCredentialsSignIn(values);
        if (success) {
          toast.success('Logged In');
          form.reset();
          router.push('/');
          router.refresh();
        }
      } else {
        const response = await axios.post('http://localhost:3000/api/register', values);

        if (response.data.success) {
          toast.success('Registered');
          const { success } = await handleCredentialsSignIn(values);
          if (success) {
            form.reset();
            router.push('/');
            router.refresh();
          }
        }
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    onSubmit,
    isLoading,
    error,
  };
};
