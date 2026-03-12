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

export default function QnaDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const qnaId = Number(params.qnaId);
  const type = "DETAIL";
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

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

  if (error) return "qna error..";
  if (isPending) return "loading..";

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

      <section className="container mx-auto space-y-20 px-6 pt-20 pb-30">
        <div className="space-y-10 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">입실문의</h2>

          <div className="overflow-hidden border-t border-black text-left">
            <div className="border-b p-4 md:p-5">
              <h2 className="text-lg font-semibold md:text-xl">{qna?.title}</h2>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 border-b p-4 text-sm text-gray-500 md:gap-x-6 md:p-5 md:text-base">
              <span>작성자: {qna?.author.nickname}</span>
              <span>작성일: {formatTime(qna.created_at)}</span>
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs leading-4.5 text-green-700 md:leading-5.5">
                {qna?.reply_status}
              </span>
            </div>

            <div className="min-h-45 p-4 leading-relaxed whitespace-pre-line md:p-6">
              {qna?.content}
            </div>

            {/* 관리자 답변 */}
            <div className="border-t bg-gray-50 p-4 md:p-6">
              <div className="mb-3 font-semibold">관리자 답변</div>
              <div className="text-sm leading-relaxed whitespace-pre-line md:text-base">
                담당자 확인중입니다. 빠른 시일내에 답변드리겠습니다.
              </div>
            </div>
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
  );
}
