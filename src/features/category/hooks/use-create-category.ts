import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import { CreateCategoryInput, createCategorySchema, CategoryResponse } from '@/features/category/schemas/category-schemas';
import { useCreateCategoryState } from '@/features/category/hooks/use-create-category-state';

export const useCreateCategory = () => {
  const { onClose } = useCreateCategoryState();

  const createCategoryForm = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateCategoryInput) => await apiClient.post<CategoryResponse>('/categories', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      onClose();
      toast.success('Category Created');
    },
  });

  const onCreateCategory = (data: CreateCategoryInput) => {
    mutation.mutate(data);
  };

  return {
    createCategoryForm,
    onCreateCategory,
    isCategoryCreating: mutation.isPending,
    categoryCreationError: mutation.error?.message,
  };
};
