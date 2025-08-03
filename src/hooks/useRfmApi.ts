import { useMutation, useQuery } from '@tanstack/react-query';
import { rfmApi, SelectedIdsRequest, SelectedIdsResponse } from '@/lib/api';

/**
 * Hook for submitting selected customer IDs
 * @returns {object} Mutation object with loading, error, and data states
 * 
 * @example
 * ```typescript
 * const submitMutation = useSubmitSelectedIds();
 * 
 * const handleSubmit = () => {
 *   submitMutation.mutate({ selectedIds: ['CUST_001', 'CUST_002'] });
 * };
 * ```
 */
export function useSubmitSelectedIds() {
  return useMutation({
    mutationFn: (data: SelectedIdsRequest) => rfmApi.submitSelectedIds(data),
    onSuccess: (data: SelectedIdsResponse) => {
      console.log('✅ Successfully submitted:', data.message);
    },
    onError: (error) => {
      console.error('❌ Error submitting selected IDs:', error);
    },
  });
}

/**
 * Hook for getting API information
 * @returns {object} Query object with loading, error, and data states
 * 
 * @example
 * ```typescript
 * const { data, isLoading, error } = useApiInfo();
 * ```
 */
export function useApiInfo() {
  return useQuery({
    queryKey: ['api-info'],
    queryFn: () => rfmApi.getApiInfo(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
} 