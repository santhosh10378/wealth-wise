import { NextRequest, NextResponse } from 'next/server';
import { NextJSError, NextJSSuccess } from '@/utils/custom-next-response';
import { tryCatchHandler } from '@/utils/handlers';
import { prisma } from '@/lib/prisma';

// GET by ID Handler
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return tryCatchHandler('FINANCE_ACCOUNT_BY_ID_GET', async (user) => {
    const { id } = params;

    if (!id) return NextJSError(400, 'Missing ID');

    const account = await prisma.financeAccount.findUnique({
      where: { id, userId: user.id },
    });

    if (!account) {
      return NextJSError(404, 'Account not found or unauthorized');
    }

    return NextJSSuccess(account);
  });
}

// PUT Handler
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return tryCatchHandler('FINANCE_ACCOUNT_BY_ID_PUT', async (user) => {
    const body = await req.json();
    const { name } = body;
    const { id } = params;

    if (!id || !name) return NextJSError(400, 'Missing Values');

    const updatedAccount = await prisma.financeAccount.update({
      where: { id, userId: user.id },
      data: { name },
    });

    if (!updatedAccount) {
      return NextJSError(404, 'Account not found or unauthorized');
    }

    return NextJSSuccess(updatedAccount);
  });
}

// DELETE Handler
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return tryCatchHandler('FINANCE_ACCOUNT_BY_ID_DELETE', async (user) => {
    const { id } = params;
    if (!id) return NextJSError(400, 'Missing Values');

    const deletedAccount = await prisma.financeAccount.delete({
      where: { id, userId: user.id },
    });

    if (!deletedAccount) {
      return NextJSError(404, 'Account not found or unauthorized');
    }

    return NextResponse.json({ message: 'Account Deleted Successfully', success: true });
  });
}
