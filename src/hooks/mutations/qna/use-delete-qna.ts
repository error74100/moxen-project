import { deleteQnaFilesInPath } from "@/api/file";
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

      // 글삭제시 해당글 안의 첨부파일 삭제
      if (deletedQna.file_urls && deletedQna.file_urls.length > 0) {
        await Promise.all(
          deletedQna.file_urls.map((url) => {
            const fileName = url.split("/").pop();

            return deleteQnaFilesInPath({
              path: `${deletedQna.author_id}/posts/${deletedQna.id}`,
              fileName: `${fileName}`,
            });
          }),
        );
      }

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.qna.list(1),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
