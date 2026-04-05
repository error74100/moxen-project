import { updateFaq } from "@/api/faq";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateFaq(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFaq,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.faq.list });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
