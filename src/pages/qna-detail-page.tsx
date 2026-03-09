import QnaBg from "@/assets/images/qna_bg.jpg";
import { Button } from "@/components/ui/button";
import { TextAlignStart } from "lucide-react";
import { useNavigate } from "react-router";

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
                방 가격 문의드립니다. 단기 입주 가능한가요?
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 border-b p-4 text-sm text-gray-500 md:gap-x-6 md:p-5 md:text-base">
              <span>작성자: 홍길동</span>
              <span>작성일: 2026-03-09</span>
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs leading-4.5 text-green-700 md:leading-5.5">
                답변완료
              </span>
            </div>

            <div className="min-h-45 p-4 leading-relaxed whitespace-pre-line md:p-6">
              안녕하세요. 방 가격과 단기 입주 가능 여부가 궁금합니다. 공용시설
              이용도 가능한지 문의드립니다. 감사합니다.
            </div>

            {/* 관리자 답변 */}
            <div className="border-t bg-gray-50 p-4 md:p-6">
              <div className="mb-3 font-semibold">관리자 답변</div>
              <div className="text-sm leading-relaxed whitespace-pre-line md:text-base">
                문의 감사합니다. 현재 단기 입주 가능하며 공용주방, 세탁시설 모두
                이용 가능합니다. 자세한 사항은 전화 문의 부탁드립니다.
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/qna")}
              className="cursor-pointer"
            >
              <TextAlignStart />
              목록보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
