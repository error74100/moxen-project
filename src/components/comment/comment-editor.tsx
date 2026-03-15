import { SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";
import CommentList from "./comment-list";
import { useCommentsData } from "@/hooks/queries/use-comments-data";
import { useSession } from "@/store/session";

export default function CommentEditor({
  qnaId,
  isAdmin,
}: {
  qnaId: number;
  isAdmin: boolean;
}) {
  const session = useSession();
  const [content, setContent] = useState("");

  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCreateComment({
      onSuccess: () => {
        setContent("");
        toast.message("댓글이 등록되었습니다.", {
          position: "top-center",
        });
      },
      onError: (error) => {
        toast.error("댓글 추가에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentsPending,
  } = useCommentsData(qnaId);

  const handleSubmitClick = () => {
    if (content.trim() === "") return;

    createComment({
      qnaId: qnaId,
      content,
    });
  };

  if (isFetchCommentsPending) return "is Fetch Comments Pending..";

  return (
    <>
      {comments?.length !== 0 && (
        <CommentList qnaId={qnaId} isAdmin={isAdmin} />
      )}

      {comments?.length === 0 ? (
        <div className="border-t bg-gray-50 p-4 md:p-6">
          <div className="mb-3 font-semibold">관리자 답변</div>
          <div className="text-sm leading-relaxed whitespace-pre-line md:text-base">
            담당자 확인중입니다. 빠른 시일내에 답변드리겠습니다.
          </div>
          {isAdmin && (
            <div className="flex flex-col gap-4 text-left">
              <Textarea
                // disabled={isUpdateProfilePending}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-2 h-24 resize-none rounded-lg border bg-white px-3 py-4"
              />
              <Button
                // disabled={isDeleteQnaPending}
                onClick={handleSubmitClick}
                variant="default"
                className="cursor-pointer self-end"
                size="sm"
              >
                <SquarePen />
                등록
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          {isAdmin && (
            <div className="border-t bg-gray-50 p-4 md:p-6">
              <div className="mb-3 font-semibold">관리자 답변</div>
              <div className="flex flex-col gap-4 text-left">
                <Textarea
                  // disabled={isUpdateProfilePending}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-2 h-24 resize-none rounded-lg border bg-white px-3 py-4"
                />
                <Button
                  // disabled={isDeleteQnaPending}
                  onClick={handleSubmitClick}
                  variant="default"
                  className="cursor-pointer self-end"
                  size="sm"
                >
                  <SquarePen />
                  등록
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
