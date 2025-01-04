import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { tryCatchHandler } from '@/utils/handlers';
import { NextJSError, NextJSSuccess } from '@/utils/custom-next-response';

// GET Handler for Categories
export async function GET(req: Request) {
  return tryCatchHandler('CATEGORIES_GET', async (user) => {
    const categories = await prisma.category.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextJSSuccess(categories);
  });
}

// POST Handler for Creating Category
export async function POST(req: Request) {
  return tryCatchHandler('CATEGORIES_POST', async (user) => {
    const body = await req.json();

    if (!body.name) return NextJSError(400, 'Missing Values');

    const category = await prisma.category.create({
      data: {
        name: body.name,
        userId: user.id,
      },
    });

    return NextJSSuccess(category);
  });
}

// PUT Handler for Deleting Multiple Categories
export async function PUT(req: Request) {
  return tryCatchHandler('CATEGORIES_PUT', async (user) => {
    const body = await req.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) return NextJSError(400, 'Missing or invalid IDs');

    await prisma.category.deleteMany({
      where: {
        id: { in: ids },
        userId: user.id,
      },
    });

    return NextResponse.json({ message: 'Categories Deleted Successfully' });
  });
}
