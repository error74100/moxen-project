import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  LogIn,
  Mail,
  MoreVertical,
  Plus,
  Search,
  Share2,
  Tag,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router";

const inquiries = [
  {
    id: 5,
    title:
      "로그인이 계속 실패합니다.로그인이 계속 실패합니다.로그인이 계속 실패합니다.로그인이 계속 실패합니다.",
    user: "김철수",
    category: "계정",
    date: "10분 전",
    status: "답변대기",
    priority: "높음",
  },
  {
    id: 4,
    title: "결제 취소는 어떻게 하나요?",
    user: "이지현",
    category: "결제",
    date: "2시간 전",
    status: "답변완료",
    priority: "보통",
  },
  {
    id: 3,
    title: "서비스 이용 방법 문의드립니다.",
    user: "박준영",
    category: "이용방법",
    date: "어제",
    status: "답변완료",
    priority: "낮음",
  },
  {
    id: 2,
    title: "비밀번호 재설정 메일이 안 와요.",
    user: "최수민",
    category: "계정",
    date: "2일 전",
    status: "답변대기",
    priority: "높음",
  },
  {
    id: 1,
    title: "새로운 기능 제안합니다!",
    user: "정은지",
    category: "피드백",
    date: "3일 전",
    status: "답변완료",
    priority: "낮음",
  },
];

export default function AdminQnaPage() {
  return (
    <div className="mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">문의 관리</h2>
        <p className="text-gray-500">
          고객의 문의사항을 확인하고 답변을 등록합니다.
        </p>
      </div>

      <div className="rounded-sm border border-gray-200 bg-white p-6 shadow-xs">
        <div className="space-y-6">
          {/* 1. 상단 헤더 */}
          <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-amber-700">
                <AlertCircle size={16} />
                <span className="text-sm font-bold">미답변 2건</span>
              </div>
            </div>
          </div>

          {/* 2. 검색 및 필터 컨트롤 */}
          <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="제목, 내용 또는 작성자 검색"
                className="w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none lg:w-40">
                <option>상태 전체</option>
                <option>답변대기</option>
                <option>답변완료</option>
              </select>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Filter size={16} /> 필터
              </button>
            </div>
          </div>

          {/* 3. 목록 영역 */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* 데스크탑 뷰: 테이블 */}
            <div className="hidden md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-4 text-center">문의 내용</th>
                    <th className="px-6 py-4 text-center">작성자</th>
                    <th className="px-6 py-4 text-center">상태</th>
                    <th className="px-6 py-4 text-center">작성일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inquiries.map((item) => (
                    <tr
                      key={item.id}
                      className="cursor-pointer transition-colors hover:bg-gray-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="line-clamp-1 font-semibold text-gray-900">
                          {item.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center gap-1.5 whitespace-nowrap text-gray-600">
                          {item.user}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${
                            item.status === "답변대기"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {item.status === "답변대기" ? (
                            <Clock size={12} />
                          ) : (
                            <CheckCircle2 size={12} />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 모바일 뷰: 카드 리스트 */}
            <div className="block divide-y divide-gray-100 md:hidden">
              {inquiries.map((item) => (
                <div key={item.id} className="space-y-3 p-4 active:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            item.status === "답변대기"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="leading-snug font-bold text-gray-900">
                        {item.title}
                      </h4>
                    </div>
                    <button className="text-gray-400">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[12px] text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600">
                        {item.user.charAt(0)}
                      </div>
                      <span>{item.user}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {item.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. 페이지네이션 */}
          <div className="flex items-center justify-between pt-2">
            <button className="rounded-lg border p-2 text-gray-400 hover:bg-gray-50">
              <ChevronLeft size={20} />
            </button>
            <div className="text-sm font-medium text-gray-600">
              <span className="text-indigo-600">1</span> / 12 페이지
            </div>
            <button className="rounded-lg border p-2 text-gray-400 hover:bg-gray-50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
