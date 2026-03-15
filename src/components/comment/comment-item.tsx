import { formatTime } from "@/lib/time";
import { Button } from "../ui/button";
import { CircleX, SquarePen, Trash2 } from "lucide-react";
import { useDeleteComment } from "@/hooks/mutations/comment/use-delete-comment";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import type { NestedComment } from "@/types";
import { useUpdateComment } from "@/hooks/mutations/comment/use-update-comment";
import Loader from "../loader";

export default function CommentItem({ isAdmin, ...props }: NestedComment) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment({
      onSuccess: () => {
        toast.message("댓글이 삭제되었습니다.", {
          position: "top-center",
        });
      },
      onError: (error) => {
        toast.error("댓글 삭제에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const { mutate: updateComment, isPending: isUpdateCommentPending } =
    useUpdateComment({
      onSuccess: () => {
        toast.message("댓글이 수정 되었습니다.", {
          position: "top-center",
        });
      },
      onError: () => {
        toast.error("댓글 수정에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const handleDeleteAction = () => {
    deleteComment(props.id);
  };

  const handleUpdateCancleClick = () => {
    setIsEdit(false);
    setContent(props.content);
  };

  const handleUpdateAction = () => {
    if (content.trim() === "") return;

    updateComment({
      id: props.id,
      content,
    });

    setIsEdit(false);
  };

  // if (fetchCommentsError) return "fetch Comments Error..";
  if (isUpdateCommentPending) return <Loader />;

  //   const nestedComments = toNestedComments(comments);

  return (
    <div>
      <div>
        {!isEdit ? (
          <div className="border-t py-4">
            <div className="flex items-start justify-between gap-4 pb-5 text-sm leading-relaxed whitespace-pre-line md:text-base">
              <p>{props.content}</p>
              <p className="text-muted-foreground pt-0.5 text-sm whitespace-nowrap">
                {formatTime(props.created_at)}
              </p>
            </div>
            {isAdmin && (
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => {
                    setContent(props.content);
                    setIsEdit(true);
                  }}
                  variant="default"
                  className="cursor-pointer text-xs"
                  size="sm"
                >
                  <SquarePen />
                  수정
                </Button>
                <Button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  variant="default"
                  className="cursor-pointer text-xs"
                  size="sm"
                >
                  <Trash2 />
                  삭제
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            {isAdmin && (
              <div className="border-t py-4">
                <div className="flex flex-1 flex-col gap-4 text-left">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-2 h-24 resize-none rounded-lg border bg-white px-3 py-4"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={handleUpdateCancleClick}
                      variant="outline"
                      className="cursor-pointer self-end"
                      size="sm"
                    >
                      <CircleX />
                      취소
                    </Button>
                    <Button
                      onClick={handleUpdateAction}
                      variant="default"
                      className="cursor-pointer self-end"
                      size="sm"
                    >
                      <SquarePen />
                      저장
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>댓글 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              댓글 삭제 하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleDeleteAction}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
