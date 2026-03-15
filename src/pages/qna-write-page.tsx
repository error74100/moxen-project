import QnaBg from "@/assets/images/qna_bg.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQna } from "@/hooks/mutations/qna/use-create-qna";
import { useSession } from "@/store/session";
import { Pen, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function QnaDetailPage() {
  const navigate = useNavigate();
  const session = useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate: createQna, isPending: isCreateQnaPending } = useCreateQna({
    onSuccess: () => {
      toast.message("문의글이 등록되었습니다.", {
        position: "top-center",
      });
      navigate("/qna", { replace: true });
    },
    onError: (error) => {
      toast.error("문의글 등록에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleSaveQnaClick = () => {
    if (title.trim() === "" || content.trim() === "") {
      toast.message("제목 및 내용을 입력해주세요.", {
        position: "top-center",
      });

      return;
    }

    createQna({
      title,
      content,
    });
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
              <h2>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="문의제목"
                  className="py-4"
                />
              </h2>
            </div>

            <div className="min-h-45 p-4 leading-relaxed whitespace-pre-line md:p-5">
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
              variant="outline"
              size="lg"
              onClick={() => navigate("/qna")}
              className="cursor-pointer"
            >
              <X />
              취소
            </Button>
            <Button
              onClick={handleSaveQnaClick}
              size="lg"
              className="cursor-pointer"
            >
              <Pen />
              등록
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
