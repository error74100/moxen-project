import { fetchComments } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useCommentsData(qnaId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.comment.qna(qnaId),
    queryFn: () => fetchComments(qnaId),
  });
}
