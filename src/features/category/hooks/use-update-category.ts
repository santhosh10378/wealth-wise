import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import { UpdateCategoryInput, updateCategorySchema, CategoryResponse } from '@/features/category/schemas/category-schemas';
import { useEditCategoryState } from '@/features/category/hooks/use-edit-category-state';

export const useUpdateCategory = (category: CategoryResponse) => {
  const { onClose } = useEditCategoryState();

  const updateCategoryForm = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name || '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (input: UpdateCategoryInput) => await apiClient.put<CategoryResponse>(`/categories/${category.id}`, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      onClose();
      toast.success('Category Updated');
    },
  });

  const onUpdateCategory = (data: UpdateCategoryInput) => {
    mutation.mutate(data);
  };

  return {
    updateCategoryForm,
    onUpdateCategory,
    isCategoryUpdating: mutation.isPending,
    categoryUpdateError: mutation.error?.message,
  };
};
