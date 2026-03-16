import { deleteQna } from "@/api/qna";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteQna(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQna,
    onSuccess: async (deletedQna) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      //   if (deletedQna.image_urls && deletedQna.image_urls.length > 0) {
      //     await deleteImagesInPath(`${deletedQna.author_id}/${deletedQna.id}`);
      //   }

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.qna.list(1),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
