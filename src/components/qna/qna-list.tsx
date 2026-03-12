import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { useQnasData } from "@/hooks/queries/use-qnas-data";
import QnaItem from "./qna-item";

export default function QnaList() {
  const {
    data: qnaData,
    error: qnaError,
    isPending: qnaIsPending,
  } = useQnasData();

  if (qnaError) return "qna error..";
  if (qnaIsPending) return "loading..";

  return (
    <>
      <div className="w-full overflow-hidden border-b">
        <ul className="hidden grid-cols-[120px_1fr_220px_220px_120px] bg-gray-100 text-sm font-semibold md:grid">
          <li className="py-3 text-center">번호</li>
          <li className="py-3">제목</li>
          <li className="py-3 text-center">작성자</li>
          <li className="py-3 text-center">작성일</li>
          <li className="py-3 text-center">답변상태</li>
        </ul>

        <ul>
          {qnaData.map((qnaId) => (
            <QnaItem key={qnaId} qnaId={qnaId} type={"LIST"} />
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <Button variant="outline" className="cursor-pointer">
          <ChevronFirst />
        </Button>
        <Button variant="outline" className="cursor-pointer">
          <ChevronLeft />
        </Button>
        <Button variant="default" className="cursor-pointer">
          1
        </Button>
        <Button variant="outline" className="cursor-pointer">
          2
        </Button>
        <Button variant="outline" className="cursor-pointer">
          3
        </Button>
        <Button variant="outline" className="cursor-pointer">
          <ChevronRight />
        </Button>
        <Button variant="outline" className="cursor-pointer">
          <ChevronLast />
        </Button>
      </div>
    </>
  );
}
