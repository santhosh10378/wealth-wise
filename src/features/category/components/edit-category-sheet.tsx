'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useEditCategoryState } from '@/features/category/hooks/use-edit-category-state';
import { EditCategoryForm } from '@/features/category/components/edit-category-form';

export const EditCategorySheet = () => {
  const { isOpen, onClose, category } = useEditCategoryState();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className='mb-8 space-y-0'>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Modify your category</SheetDescription>
        </SheetHeader>

        <EditCategoryForm category={category} />
      </SheetContent>
    </Sheet>
  );
};
