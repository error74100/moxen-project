import { fetchQnas } from "@/api/qna";
import { QNA_PAGE_SIZE, QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useQnasData(page: number, keyword?: string, authorId?: string) {
  const queryClient = useQueryClient();
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.qna.list(page, keyword),
    queryFn: async () => {
      const from = (page - 1) * QNA_PAGE_SIZE;
      const to = from + QNA_PAGE_SIZE - 1;

      const { qnas, count } = await fetchQnas({
        from,
        to,
        keyword,
        authorId,
      });

      qnas.forEach((qna) => {
        queryClient.setQueryData(QUERY_KEYS.qna.byId(qna.id), qna);
      });

      // return qnas.map((qna) => qna.id);

      return {
        ids: qnas.map((qna) => qna.id),
        totalCount: count,
        keyword: keyword,
      };
    },
  });
}
