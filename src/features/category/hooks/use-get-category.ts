import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';

export const useGetCategory = (categoryId: string) => {
  const { data, error, isLoading } = useQuery<CategoryResponse, Error>({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const response = await apiClient.get<CategoryResponse>(`/categories/${categoryId}`);
      return response.data;
    },
    enabled: !!categoryId,
  });

  return {
    category: data,
    isCategoryLoading: isLoading,
    categoryError: error,
  };
};
