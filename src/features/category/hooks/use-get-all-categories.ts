import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';

export const useGetAllCategories = () => {
  const { data, error, isLoading } = useQuery<CategoryResponse[], Error>({
    queryKey: ['allCategories'],
    queryFn: async () => {
      const response = await apiClient.get<{ data: CategoryResponse[] }>('/categories');
      return response.data?.data;
    },
  });

  return {
    categories: data || [],
    isCategoriesLoading: isLoading,
    categoriesError: error?.message,
  };
};
