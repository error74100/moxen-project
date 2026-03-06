import QnaBg from "@/assets/images/qna_bg.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      "입실 문의드립니다.입실 문의드립니다.입실 문의드립니다.입실 문의드립니다.입실 문의드립니다.입실 문의드립니다.입실 문의드립니다.입실 문의드립니다.입실 문의드립니다.입실 문의드립니다.입실 문의드립니다.",
    content: "이번 달에 입실 가능한 방이 있을까요?",
    author: "김철수",
    date: "2026-03-06",
    answered: true,
  },
  {
    id: 2,
    title: "방 가격 문의",
    content: "1인실 가격이 어떻게 되나요?",
    author: "이영희",
    date: "2026-03-05",
    answered: false,
  },
];

export default function QnaPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-[400px] w-full overflow-hidden md:h-[500px]">
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

      <section className="mx-auto max-w-6xl space-y-20 px-6 py-20">
        <div className="space-y-10 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">자주 묻는 질문</h2>

          <div className="rounded-xl border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">제목</TableHead>
                  <TableHead className="w-[120px] text-center">
                    작성자
                  </TableHead>
                  <TableHead className="w-[140px] text-center">
                    작성일
                  </TableHead>
                  <TableHead className="w-[120px] text-center">답변</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {inquiries.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="line-clamp-1 text-gray-600">
                      {item.title}
                    </TableCell>

                    <TableCell>{item.author}</TableCell>

                    <TableCell>{item.date}</TableCell>

                    <TableCell className="text-center">
                      {item.answered ? (
                        <Badge>답변완료</Badge>
                      ) : (
                        <Badge variant="secondary">대기중</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 페이징 */}
          <div className="mt-8 flex justify-center gap-2">
            <Button variant="outline">이전</Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">다음</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-20 px-6 py-20">
        <div className="space-y-10 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">자주 묻는 질문</h2>

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
      </section>
    </div>
  );
}
