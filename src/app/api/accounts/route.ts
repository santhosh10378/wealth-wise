import { NextRequest, NextResponse } from 'next/server';
import { NextJSSuccess, NextJSError } from '@/utils/custom-next-response';
import { tryCatchHandler } from '@/utils/handlers';
import { prisma } from '@/lib/prisma';
import { parse, subDays } from 'date-fns';

// Handle POST requests
export async function POST(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler('FINANCE_ACCOUNTS_POST', async (user) => {
    const body = await req.json();

    if (!body.name || typeof body.name !== 'string') {
      return NextJSError(400, 'Invalid or missing "name" field');
    }

    const account = await prisma.financeAccount.create({
      data: {
        name: body.name,
        userId: user.id,
      },
    });

    return NextJSSuccess(account);
  });
}

// Handle GET requests
export async function GET(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler('FINANCE_ACCOUNTS_GET', async (user) => {
    const accounts = await prisma.financeAccount.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextJSSuccess(accounts);
  });
}

// Handle PUT requests
export async function PUT(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler('FINANCE_ACCOUNTS_PUT', async (user) => {
    const body = await req.json();
    const { ids } = body;

    console.log({ ids, user });

    if (!Array.isArray(ids) || ids.length === 0 || ids.some((id) => typeof id !== 'string')) {
      return NextJSError(400, 'Invalid or missing "ids" field');
    }

    await prisma.financeAccount.deleteMany({
      where: {
        id: { in: ids },
        userId: user.id,
      },
    });

    return NextResponse.json({ message: 'Accounts Deleted Successfully', success: true });
  });
}
