import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { tryCatchHandler } from '@/utils/handlers';
import { NextJSError, NextJSSuccess } from '@/utils/custom-next-response';

// GET Handler for Transaction by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return tryCatchHandler('TRANSACTIONS_BY_ID_GET', async (user) => {
    const { id } = params;

    if (!id) return NextJSError(400, 'Missing ID');

    const transaction = await prisma.transaction.findUnique({
      include: {
        category: true,
        account: true,
      },
      where: {
        id,
        account: {
          userId: user.id,
        },
      },
    });

    if (!transaction) {
      return NextJSError(404, 'Transaction not found or unauthorized');
    }

    return NextJSSuccess(transaction);
  });
}

// PUT Handler for Updating a Transaction
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return tryCatchHandler('TRANSACTIONS_BY_ID_PUT', async (user) => {
    const { id } = params;
    if (!id) return NextJSError(400, 'Missing ID');

    const { amount, payee, date, categoryId, accountId, notes } = await req.json();

    const account = await prisma.financeAccount.findUnique({
      where: {
        userId: user.id,
        id: accountId,
      },
    });

    if (!account) return NextJSError(401, 'Unauthorized');

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id,
        account: {
          userId: user.id,
        },
      },
      data: {
        ...(categoryId && { categoryId }),
        ...(amount && { amount }),
        ...(payee && { payee }),
        ...(date && { date }),
        ...(accountId && { accountId }),
        ...(notes && { notes }),
      },
    });

    return NextJSSuccess(updatedTransaction);
  });
}

// DELETE Handler for Deleting a Transaction
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return tryCatchHandler('TRANSACTIONS_BY_ID_DELETE', async (user) => {
    const { id } = params;
    if (!id) return NextJSError(400, 'Missing ID');

    await prisma.transaction.delete({
      where: {
        id,
        account: {
          userId: user.id,
        },
      },
    });

    return NextResponse.json({ message: 'Transaction Deleted Successfully' });
  });
}
