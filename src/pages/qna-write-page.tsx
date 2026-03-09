import QnaBg from "@/assets/images/qna_bg.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pen, TextAlignStart, X } from "lucide-react";
import { useNavigate } from "react-router";

const inquiries = [
  {
    id: 1,
    title:
      "방 가격 문의드립니다. 단기 입주 가능한가요?방 가격 문의드립니다. 단기 입주 가능한가요?방 가격 문의드립니다. 단기 입주 가능한가요?방 가격 문의드립니다. 단기 입주 가능한가요?방 가격 문의드립니다. 단기 입주 가능한가요?",
    author: "홍길동",
    date: "2026-03-09",
    status: "답변완료",
  },
  {
    id: 2,
    title: "공용주방 사용 가능한 시간대가 궁금합니다",
    author: "김철수",
    date: "2026-03-08",
    status: "대기",
  },
];

export default function QnaDetailPage() {
  const navigate = useNavigate();

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
              <h2 className="text-lg font-semibold md:text-xl">
                <Input placeholder="문의제목" className="py-4" />
              </h2>
            </div>

            <div className="min-h-45 p-4 leading-relaxed whitespace-pre-line md:p-6">
              <Textarea
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
            <Button size="lg" className="cursor-pointer">
              <Pen />
              등록
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
