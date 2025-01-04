'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { useCreateCategory } from '@/features/category/hooks/use-create-category';

export const CreateCategoryForm = () => {
  const { createCategoryForm, onCreateCategory, isCategoryCreating, categoryCreationError } = useCreateCategory();

  return (
    <Form {...createCategoryForm}>
      {categoryCreationError && (
        <div className='p-2 rounded-md bg-red-100 dark:bg-red-500/20 text-red-500 text-sm font-medium'>{categoryCreationError}</div>
      )}

      <form onSubmit={createCategoryForm.handleSubmit(onCreateCategory)} className='flex flex-col gap-5'>
        <CustomInputFormField
          control={createCategoryForm.control}
          disabled={isCategoryCreating}
          label='Name'
          name='name'
          placeholder='e.g. Groceries, Transportation, Rent'
          type='text'
        />

        <Button type='submit' disabled={isCategoryCreating} className='w-full'>
          Create Category
        </Button>
      </form>
    </Form>
  );
};
