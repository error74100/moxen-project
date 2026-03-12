import { fetchQnaById } from "@/api/qna";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function useQnaByIdData({
  qnaId,
  type,
}: {
  qnaId: number;
  type: "LIST" | "DETAIL";
}) {
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.qna.byId(qnaId),
    queryFn: () => fetchQnaById({ qnaId }),
    // queryFn: () => fetchQnaById({ qnaId, userId: session!.user.id }),
    enabled: type === "LIST" ? false : true,
  });
}
