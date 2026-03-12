import { updateQna } from "@/api/qna";
import { QUERY_KEYS } from "@/lib/constants";
import type { Qna, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateQna(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQna,
    onSuccess: (updatedQna) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Qna>(
        QUERY_KEYS.qna.byId(updatedQna.id),
        (prevQna) => {
          if (!prevQna)
            throw new Error(
              `${updatedQna.id}에 해당하는 글을 캐시 데이터에서 찾을 수 없습니다.`,
            );
          return { ...prevQna, ...updatedQna };
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
