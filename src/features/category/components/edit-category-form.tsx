'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { useUpdateCategory } from '@/features/category/hooks/use-update-category';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';
import { useDeleteCategory } from '@/features/category/hooks/use-delete-category';
import { useConfirm } from '@/hooks/use-confirm';

interface Props {
  category: CategoryResponse;
}

export const EditCategoryForm = ({ category }: Props) => {
  const { updateCategoryForm, onUpdateCategory, isCategoryUpdating, categoryUpdateError } = useUpdateCategory(category);
  const { onDeleteCategory, isCategoryDeleting, categoryDeleteError } = useDeleteCategory();

  const [ConfirmationDialog, confirm] = useConfirm('Are you Sure?', 'This action can not be undone');

  const isLoading = isCategoryUpdating || isCategoryDeleting;
  const error = categoryUpdateError || categoryDeleteError;

  return (
    <>
      <ConfirmationDialog />
      <Form {...updateCategoryForm}>
        {error && <div className='p-2 rounded-md bg-red-100 dark:bg-red-500/20 text-red-500 text-sm font-medium'>{error}</div>}

        <form onSubmit={updateCategoryForm.handleSubmit(onUpdateCategory)} className='flex flex-col gap-5'>
          <CustomInputFormField
            control={updateCategoryForm.control}
            disabled={isLoading}
            label='Name'
            name='name'
            placeholder='e.g. Groceries, Transportation, Rent'
            type='text'
          />

          <Button type='submit' disabled={isLoading} className='w-full'>
            Save Changes
          </Button>
        </form>

        <Button
          type='button'
          variant='destructive-outline'
          disabled={isLoading}
          className='w-full mt-3'
          onClick={async () => {
            const ok = await confirm();
            if (ok) {
              onDeleteCategory(category.id);
            }
          }}
        >
          Delete Category
        </Button>
      </Form>
    </>
  );
};
