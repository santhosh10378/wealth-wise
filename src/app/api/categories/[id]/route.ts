import { NextRequest, NextResponse } from 'next/server';
import { NextJSError, NextJSSuccess } from '@/utils/custom-next-response';
import { tryCatchHandler } from '@/utils/handlers';
import { prisma } from '@/lib/prisma';

// GET by ID Handler
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return tryCatchHandler('CATEGORY_BY_ID_GET', async (user) => {
    const { id } = params;

    if (!id) return NextJSError(400, 'Missing ID');

    const category = await prisma.category.findUnique({
      where: { id, userId: user.id },
    });

    if (!category) {
      return NextJSError(404, 'Category not found or unauthorized');
    }

    return NextJSSuccess(category);
  });
}

// PUT Handler
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return tryCatchHandler('CATEGORY_BY_ID_PUT', async (user) => {
    const body = await req.json();
    const { name } = body;
    const { id } = params;

    if (!id || !name) return NextJSError(400, 'Missing Values');

    const updatedCategory = await prisma.category.update({
      where: { id, userId: user.id },
      data: { name },
    });

    if (!updatedCategory) {
      return NextJSError(404, 'Category not found or unauthorized');
    }

    return NextJSSuccess(updatedCategory);
  });
}

// DELETE Handler
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return tryCatchHandler('CATEGORY_BY_ID_DELETE', async (user) => {
    const { id } = params;
    if (!id) return NextJSError(400, 'Missing Values');

    const deletedCategory = await prisma.category.delete({
      where: { id, userId: user.id },
    });

    if (!deletedCategory) {
      return NextJSError(404, 'Category not found or unauthorized');
    }

    return NextResponse.json({ message: 'Category Deleted Successfully', success: true });
  });
}
