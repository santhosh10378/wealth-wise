import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';
import { useCreateCategoryState } from '@/features/category/hooks/use-create-category-state';

export const useDeleteCategory = () => {
  const { onClose } = useCreateCategoryState();

  const mutation = useMutation({
    mutationFn: async (categoryId: string) => await apiClient.delete<CategoryResponse>(`/categories/${categoryId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      onClose();
      toast.success('Category Deleted');
    },
  });

  return {
    onDeleteCategory: mutation.mutate,
    isCategoryDeleting: mutation.isPending,
    categoryDeleteError: mutation.error?.message,
  };
};
