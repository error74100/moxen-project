import { useCommentsData } from "@/hooks/queries/use-comments-data";
import { useState } from "react";
import CommentItem from "./comment-item";

export default function CommentList({
  qnaId,
  isAdmin,
}: {
  qnaId: number;
  isAdmin: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(0);
  const [content, setContent] = useState("");

  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentsPending,
  } = useCommentsData(qnaId);

  if (fetchCommentsError) return "fetch Comments Error..";
  if (isFetchCommentsPending) return "isFetch Comments Pending..";

  //   const nestedComments = toNestedComments(comments);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="border-t bg-gray-50 p-4 md:p-6">
          <div className="mb-3 font-semibold">관리자 답변</div>
          {comments.map((comment) => (
            <CommentItem key={comment.id} {...comment} isAdmin={isAdmin} />
          ))}
        </div>
      </div>
    </div>
  );
}
