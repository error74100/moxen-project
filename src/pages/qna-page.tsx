import QnaBg from "@/assets/images/qna_bg.jpg";
import CtaSection from "@/components/layout/cta-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";

const faqs = [
  {
    q: "입실 가능한 시간은 언제인가요?",
    a: "입실은 오전 10시부터 가능하며, 방문 전 미리 연락 주시면 안내해드립니다.",
  },
  {
    q: "공용 시설은 어떤 것들이 있나요?",
    a: "공용 주방, 세탁기, 건조기, 정수기, 전자레인지 등 다양한 시설을 무료로 이용할 수 있습니다.",
  },
  {
    q: "계약 기간은 어떻게 되나요?",
    a: "최소 1개월부터 계약 가능하며 장기 입실 시 할인 혜택이 있습니다.",
  },
];

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

export default function QnaPage() {
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

      <section className="container mx-auto space-y-20 px-6 pt-10 pb-20 md:pt-30">
        <div className="mb-15 space-y-10 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">입실문의</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            문의글 확인 후에 빠른 시일내에 답변드리도록 하겠습니다.
          </p>
          <div className="text-right">
            <Button
              className="cursor-pointer"
              onClick={() => navigate("/qna-write")}
            >
              문의하기
            </Button>
          </div>

          <div className="w-full overflow-hidden border-b">
            <ul className="hidden grid-cols-[60px_1fr_120px_120px_120px] bg-gray-100 text-sm font-semibold md:grid">
              <li className="py-3 text-center">번호</li>
              <li className="py-3">제목</li>
              <li className="py-3 text-center">작성자</li>
              <li className="py-3 text-center">작성일</li>
              <li className="py-3 text-center">답변상태</li>
            </ul>

            <ul>
              {inquiries.map((item) => (
                <li
                  key={item.id}
                  className="border-t p-3 hover:bg-gray-50 md:grid md:grid-cols-[60px_1fr_120px_120px_120px] md:items-center md:p-0"
                >
                  {/* 모바일 1줄 : 번호 + 제목 */}
                  <div className="flex items-center gap-2 md:contents">
                    <span className="text-sm text-gray-500 md:block md:py-3 md:text-center">
                      {item.id}
                    </span>

                    <span
                      className="flex-1 cursor-pointer truncate text-left font-medium hover:underline md:py-3"
                      onClick={() => navigate("/qna/1")}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* 모바일 2줄 : 작성자 / 작성일 / 상태 */}
                  <div className="mt-1 flex gap-3 text-sm text-gray-500 md:mt-0 md:contents">
                    <span className="md:py-3 md:text-center">
                      {item.author}
                    </span>
                    <span className="md:py-3 md:text-center">{item.date}</span>

                    <span className="ml-auto md:mx-auto md:py-3 md:text-center">
                      {item.status === "답변완료" ? (
                        <span className="rounded bg-green-100 px-2 py-0.5 text-sm text-green-700">
                          답변완료
                        </span>
                      ) : (
                        <span className="rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-700">
                          대기
                        </span>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <Button variant="outline">
              <ChevronFirst />
            </Button>
            <Button variant="outline">
              <ChevronLeft />
            </Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">
              <ChevronRight />
            </Button>
            <Button variant="outline">
              <ChevronLast />
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-20 bg-gray-50 px-6 pt-15 pb-20 md:pt-20 md:pb-40">
        <div className="container mx-auto px-6">
          <div className="space-y-10 text-center">
            <h2 className="text-2xl font-semibold md:text-3xl">
              자주 묻는 질문
            </h2>

            <Accordion
              type="single"
              collapsible
              className="border-t border-b border-gray-800"
            >
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="cursor-pointer justify-between text-left text-lg font-semibold [&_svg]:h-6 [&_svg]:w-6">
                    <p>Q.</p>
                    <p className="flex-1 text-left">{faq.q}</p>
                  </AccordionTrigger>

                  <AccordionContent className="flex gap-4 pt-2 text-left text-lg leading-relaxed text-gray-600">
                    <p>A.</p>
                    <p>{faq.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
