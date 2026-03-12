import { fetchQnas } from "@/api/qna";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 5;

// 임시
const pageParam = 0;

export function useQnasData(authorId?: string) {
  const queryClient = useQueryClient();
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.qna.list,
    queryFn: async () => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const qnas = await fetchQnas({
        from,
        to,
        // userId: session!.user.id,
        authorId,
      });
      qnas.forEach((qna) => {
        queryClient.setQueryData(QUERY_KEYS.qna.byId(qna.id), qna);
      });
      return qnas.map((qna) => qna.id);
    },
  });
}
