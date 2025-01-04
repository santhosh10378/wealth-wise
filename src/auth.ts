import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { signInSchema } from './features/auth/schemas/auth-schemas';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Validate credentials using SignInSchema
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          const errorMessages = parsedCredentials.error.errors.map((err) => err.message).join(', ');
          throw new Error(errorMessages);
        }

        const { email, password } = parsedCredentials.data;

        // Retrieve user by email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        // Verify password
        if (!(await bcryptjs.compare(password, user.password))) {
          throw new Error('Invalid credentials');
        }

        // Return user details
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
});
