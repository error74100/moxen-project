import QnaBg from "@/assets/images/qna_bg.jpg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteQna } from "@/hooks/mutations/qna/use-delete-qna";
import { useQnaByIdData } from "@/hooks/queries/use-qna-by-id-data";
import { formatTime } from "@/lib/time";
import { useSession } from "@/store/session";
import { SquarePen, TextAlignStart, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import AvatarDefaultImg from "@/assets/images/avatar_default.png";
import CommentEditor from "@/components/comment/comment-editor";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import Loader from "@/components/loader";

export default function QnaDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const qnaId = Number(params.qnaId);
  const type = "DETAIL";
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const {
    data: profile,
    error: fetchProfileError,
    isLoading: isFetchingProfileLoading,
    fetchStatus: isFetchingProfileStatus,
  } = useProfileData({ userId: session?.user.id });

  const {
    data: qna,
    isPending,
    error,
  } = useQnaByIdData({
    qnaId,
    type: type,
  });

  const { mutate: deleteQna, isPending: isDeleteQnaPending } = useDeleteQna({
    onSuccess: () => {
      const pathname = window.location.pathname;

      toast.success("해당글이 삭제 되었습니다.", {
        position: "top-center",
      });

      if (pathname.startsWith(`/qna/${qnaId}`)) {
        navigate("/qna", { replace: true });
      }
    },
    onError: (error) => {
      toast.error("글 삭제에 실패했습니다", {
        position: "top-center",
      });
    },
  });

  const userId = qna?.author_id;
  const isMine = userId === session?.user.id;
  const isAdmin = profile?.role === "admin";

  if (error) return "qna error..";

  // userId가 없어서 쿼리가 아예 실행 안 된 상태(idle)라면 로더를 보여주면 안됨.
  if (isFetchingProfileLoading && isFetchingProfileStatus !== "idle")
    return <Loader />;

  const handleDeleteQnaAction = () => {
    deleteQna(qnaId);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-100 w-full overflow-hidden md:h-125">
        <img
          src={QnaBg}
          alt="입실문의"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-normal md:text-5xl">
            입실문의를 소개합니다
          </h1>
          <p className="max-w-2xl text-sm opacity-90 md:text-lg">
            더 나은 경험을 만들기 위해 우리는 끊임없이 고민하고 발전합니다.
          </p>
        </div>
      </section>

      {!isPending && (
        <div>
          <section className="container mx-auto space-y-20 px-6 pt-20 pb-30">
            <div className="space-y-10 text-center">
              <h2 className="text-2xl font-semibold md:text-3xl">입실문의</h2>

              <div className="overflow-hidden border-t border-black text-left">
                <div className="border-b p-4 md:p-5">
                  <h2 className="text-lg font-semibold md:text-xl">
                    {qna?.title}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b p-4 text-sm text-gray-500 md:gap-x-6 md:p-5 md:text-base">
                  <p className="flex items-center gap-1">
                    <span>작성자:</span>
                    <span>
                      <img
                        src={qna?.author.avatar_url || AvatarDefaultImg}
                        className="h-8 w-8 rounded-full border object-cover"
                        alt="avatar"
                      />
                    </span>
                    <span>{qna?.author.nickname}</span>
                  </p>
                  <span>작성일: {formatTime(qna.created_at)}</span>
                  {qna.reply_status === "답변대기" ? (
                    <span className="rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-700">
                      답변대기
                    </span>
                  ) : (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-sm text-green-700">
                      답변완료
                    </span>
                  )}
                </div>

                <div className="min-h-45 p-4 leading-relaxed whitespace-pre-line md:p-6">
                  {qna?.content}
                </div>

                {/* 관리자 답변 */}
                <CommentEditor qnaId={qnaId} isAdmin={isAdmin} />
              </div>

              <div className="mt-8 flex justify-center gap-2">
                <Button
                  disabled={isDeleteQnaPending}
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/qna")}
                  className="cursor-pointer"
                >
                  <TextAlignStart />
                  목록보기
                </Button>
                {isMine && (
                  <>
                    <Button
                      disabled={isDeleteQnaPending}
                      variant="default"
                      size="lg"
                      onClick={() =>
                        navigate(`/qna-update/${qnaId}`, { replace: true })
                      }
                      className="cursor-pointer"
                    >
                      <SquarePen />
                      글수정
                    </Button>
                    <Button
                      disabled={isDeleteQnaPending}
                      variant="destructive"
                      size="lg"
                      onClick={() => setIsOpen(true)}
                      className="cursor-pointer"
                    >
                      <Trash2 />
                      글삭제
                    </Button>
                  </>
                )}
              </div>
            </div>
          </section>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>글삭제</AlertDialogTitle>
                <AlertDialogDescription>
                  해당글을 삭제 하시겠습니까?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer"
                  onClick={handleDeleteQnaAction}
                >
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
