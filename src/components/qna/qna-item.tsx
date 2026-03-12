import { useQnaByIdData } from "@/hooks/queries/use-qna-by-id-data";
import { formatTime } from "@/lib/time";
import { useSession } from "@/store/session";
import { useNavigate } from "react-router";

export default function QnaItem({
  qnaId,
  type,
}: {
  qnaId: number;
  type: "LIST" | "DETAIL";
}) {
  const session = useSession();
  const navigate = useNavigate();
  const userId = session?.user.id;

  const {
    data: qna,
    isPending,
    error,
  } = useQnaByIdData({
    qnaId,
    type: type,
  });

  if (error) return "qna error..";
  if (isPending) return "loading..";

  return (
    <li className="border-t p-3 hover:bg-gray-50 md:grid md:grid-cols-[120px_1fr_220px_220px_120px] md:items-center md:p-0">
      {/* 모바일 1줄 : 번호 + 제목 */}
      <div className="flex items-center gap-2 md:contents">
        <span className="text-sm text-gray-500 md:block md:py-3 md:text-center">
          {qna?.id}
        </span>

        <span
          className="flex-1 cursor-pointer truncate text-left font-medium hover:underline md:py-3"
          onClick={() => navigate(`/qna/${qnaId}`)}
        >
          {qna?.title}
        </span>
      </div>

      {/* 모바일 2줄 : 작성자 / 작성일 / 상태 */}
      <div className="mt-1 flex gap-3 text-sm text-gray-500 md:mt-0 md:contents">
        <span className="md:py-3 md:text-center">{qna.author.nickname}</span>
        <span className="md:py-3 md:text-center">
          {formatTime(qna.created_at)}
        </span>

        <span className="ml-auto md:mx-auto md:py-3 md:text-center">
          {qna.reply_status === "대기" ? (
            <span className="rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-700">
              대기
            </span>
          ) : (
            <span className="rounded bg-green-100 px-2 py-0.5 text-sm text-green-700">
              답변완료
            </span>
          )}
        </span>
      </div>
    </li>
  );
}
