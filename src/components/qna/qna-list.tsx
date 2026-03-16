import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button } from "../ui/button";
import { useQnasData } from "@/hooks/queries/use-qnas-data";
import QnaItem from "./qna-item";
import { useState } from "react";
import { QNA_PAGE_GROUP_SIZE, QNA_PAGE_SIZE } from "@/lib/constants";
import { Input } from "../ui/input";

export default function QnaList() {
  const [page, setPage] = useState(1);
  const {
    data: qnaData,
    error: qnaError,
    isPending: qnaIsPending,
  } = useQnasData(page);

  const totalPage = Math.ceil((qnaData?.totalCount ?? 0) / QNA_PAGE_SIZE);
  const startPage =
    Math.floor((page - 1) / QNA_PAGE_GROUP_SIZE) * QNA_PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + QNA_PAGE_GROUP_SIZE - 1, totalPage);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

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
          {qnaData.ids.map((qnaId) => (
            <QnaItem key={qnaId} qnaId={qnaId} type={"LIST"} />
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <Button
          onClick={() => setPage(1)}
          disabled={page === 1}
          variant="outline"
          className="cursor-pointer"
        >
          <ChevronFirst />
        </Button>
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          variant="outline"
          className="cursor-pointer"
        >
          <ChevronLeft />
        </Button>

        {pages.map((p) => (
          <Button
            key={p}
            onClick={() => setPage(p)}
            className="cursor-pointer"
            variant={page === p ? "default" : "outline"}
          >
            {p}
          </Button>
        ))}

        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPage}
          variant="outline"
          className="cursor-pointer"
        >
          <ChevronRight />
        </Button>
        <Button
          onClick={() => setPage(totalPage)}
          disabled={page === totalPage}
          variant="outline"
          className="cursor-pointer"
        >
          <ChevronLast />
        </Button>
      </div>

      <div className="mt-1 flex justify-center gap-2">
        <div className="relative min-w-full sm:min-w-84">
          <Input className="py-5 pr-10" placeholder="검색어를 입력하세요." />
          <Search className="absolute top-2 right-2 cursor-pointer" />
        </div>
      </div>
    </>
  );
}
