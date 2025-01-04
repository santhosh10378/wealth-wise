import { NextResponse } from 'next/server';
import { NextJSError } from '@/utils/custom-next-response';
import { getCurrentUser } from '@/actions/auth-actions';
import { User } from '@prisma/client';

export async function tryCatchHandler(context: string, handler: (user: User) => Promise<NextResponse>): Promise<NextResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) return NextJSError(401, 'Unauthorized');

    return await handler(user as User);
  } catch (error) {
    console.log([`${context}: `, error]);
    return NextJSError(500, 'Internal Server Error');
  }
}
