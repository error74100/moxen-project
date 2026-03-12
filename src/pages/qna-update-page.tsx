import QnaBg from "@/assets/images/qna_bg.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQnaByIdData } from "@/hooks/queries/use-qna-by-id-data";
import { useSession } from "@/store/session";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
} from "@/components/ui/alert-dialog";
import { useUpdateQna } from "@/hooks/mutations/qna/use-update-qna";

export default function QnaUpdatePage() {
  const params = useParams();
  const navigate = useNavigate();
  const qnaId = Number(params.qnaId);
  const type = "DETAIL";
  const session = useSession();

  const {
    data: qna,
    isPending: isQnaPending,
    error,
  } = useQnaByIdData({
    qnaId,
    type: type,
  });

  const { mutate: updateQna, isPending: isUpdateQnaPending } = useUpdateQna({
    onSuccess: () => {
      toast.message("문의글이 수정 되었습니다.", {
        position: "top-center",
      });
      navigate(`/qna/${qnaId}`, { replace: true });
    },
    onError: (error) => {
      toast.error("문의글 수정에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const handleSaveQnaClick = () => {
    if (title.trim() === "" || content.trim() === "") {
      toast.message("제목 및 내용을 입력해주세요.", {
        position: "top-center",
      });

      return;
    }

    updateQna({
      id: qnaId,
      title: title,
      content: content,
    });
  };

  const handleCancleQnaClick = () => {
    navigate(`/qna/${qnaId}`, { replace: true });
  };

  useEffect(() => {
    if (qna?.title) setTitle(qna.title);
    if (qna?.content) setContent(qna.content);
  }, [qna]);

  const isPending = isQnaPending || isUpdateQnaPending;

  if (error) return "qna error..";
  if (isPending) return "loading..";

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
          <h2 className="text-2xl font-semibold md:text-3xl">
            입실문의 - 글수정
          </h2>

          <div className="overflow-hidden border-t border-black text-left">
            <div className="border-b p-4 md:p-5">
              <h2 className="text-lg font-semibold md:text-xl">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="문의제목"
                  className="py-4"
                />
              </h2>
            </div>

            <div className="min-h-45 p-4 leading-relaxed whitespace-pre-line md:p-6">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-[30vh] resize-none py-4 md:h-[40vh]"
                placeholder="문의내용"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <Button
              disabled={isPending}
              variant="outline"
              size="lg"
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
            >
              <X />
              취소
            </Button>
            <Button
              disabled={isPending}
              onClick={() => setIsSave(true)}
              size="lg"
              className="cursor-pointer"
            >
              <Save />
              저장
            </Button>
          </div>
        </div>
      </section>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>글수정 - 취소</AlertDialogTitle>
            <AlertDialogDescription>
              글수정을 취소 하시겠습니까?
              <br />
              목록화면으로 이동합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleCancleQnaClick}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isSave} onOpenChange={setIsSave}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>글수정 - 저장</AlertDialogTitle>
            <AlertDialogDescription>
              글수정을 저장 하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleSaveQnaClick}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
