import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signUpSchema } from '@/features/auth/schemas/auth-schemas';
import { NextJSError, NextJSSuccess } from '@/utils/custom-next-response';
import { sanitizeUser } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const parsedCredentials = signUpSchema.safeParse(body);

    if (!parsedCredentials.success) {
      const errorMessages = parsedCredentials.error.errors.map((err) => err.message).join(', ');
      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    const { name, email, password } = parsedCredentials.data;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) return NextJSError(400, 'User already exists');

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Respond with the newly created user
    return NextJSSuccess(sanitizeUser(newUser));
  } catch (error) {
    console.error('[REGISTER]:', error);
    return NextJSError(500, 'Internal Server Error');
  }
}
