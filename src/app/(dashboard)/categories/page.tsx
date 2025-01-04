'use client';

// Icons
import { PlusIcon } from 'lucide-react';

// Hooks
import { useGetAllCategories } from '@/features/category/hooks/use-get-all-categories';
import { useCreateCategoryState } from '@/features/category/hooks/use-create-category-state';
import { useDeleteAllCategories } from '@/features/category/hooks/use-delete-all-categories';

// Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/data-table';
import { Skeleton } from '@/components/ui/skeleton';

// Feature-specific
import { categoryColumns } from '@/features/category/components/category-columns';

export default function CategoriesPage() {
  const { onOpen } = useCreateCategoryState();
  const { categories, isCategoriesLoading } = useGetAllCategories();
  const { onDeleteAllCategories, isDeletingAllCategories } = useDeleteAllCategories();

  const isLoading = isDeletingAllCategories || isCategoriesLoading;

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-28'>
      <Card className='border-0 drop-shadow-sm dark:border'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          {isLoading ? (
            <>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-8 w-32' />
            </>
          ) : (
            <>
              <CardTitle className='text-xl line-clamp-1'>Categories Page</CardTitle>
              <Button size='sm' onClick={onOpen} disabled={isLoading}>
                <PlusIcon className='size-4' />
                Add new
              </Button>
            </>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='space-y-4'>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className='h-10 w-full' />
              ))}
            </div>
          ) : (
            <DataTable
              data={categories}
              columns={categoryColumns}
              filterKey='name'
              OnDelete={(ids) => onDeleteAllCategories(ids)}
              disabled={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
