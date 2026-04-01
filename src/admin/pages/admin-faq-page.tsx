import {
  ChevronDown,
  ChevronUp,
  CircleX,
  Edit3,
  Eye,
  EyeOff,
  GripVertical,
  HelpCircle,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const faqs = [
  {
    id: 1,
    category: "계정",
    question: "비밀번호를 잊어버렸어요. 어떻게 재설정하나요?",
    answer:
      "로그인 화면 하단의 '비밀번호 찾기'를 클릭하신 후, 가입하신 이메일 주소를 입력해 주세요. 재설정 링크가 발송됩니다.",
    status: "공개",
  },
  {
    id: 2,
    category: "결제",
    question: "환불 규정이 어떻게 되나요?",
    answer:
      "유료 서비스 결제 후 7일 이내, 사용 기록이 없는 경우에 한해 100% 환불이 가능합니다. 고객센터로 문의해 주세요.",
    status: "공개",
  },
  {
    id: 3,
    category: "이용방법",
    question: "다크 모드 설정은 어디서 하나요?",
    answer:
      "우측 상단 프로필 메뉴 -> 설정 -> 화면 테마에서 다크 모드를 선택하실 수 있습니다.",
    status: "비공개",
  },
  {
    id: 4,
    category: "기타",
    question: "서비스 점검 시간은 언제인가요?",
    answer:
      "매월 마지막 주 일요일 새벽 2시부터 6시까지 정기 점검이 진행됩니다.",
    status: "공개",
  },
];

export default function AdminFaqPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">FAQ 관리</h2>
        <p className="text-gray-500">시스템에 등록된 FAQ를 관리합니다.</p>
      </div>

      <div className="rounded-sm border border-gray-200 bg-white p-6 shadow-xs">
        <div className="space-y-6">
          <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700"
            >
              <Plus size={18} />
              <span>FAQ 등록</span>
            </button>
          </div>

          {/* FAQ 목록 (카드/아코디언 스타일) */}
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-xl border transition-all ${
                  expandedId === faq.id
                    ? "border-indigo-200 ring-1 ring-indigo-100"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* 질문 헤더 */}
                <div
                  className={`flex cursor-pointer items-center gap-3 p-4 hover:bg-gray-50/50 ${expandedId === faq.id ? "bg-indigo-50/30" : ""}`}
                  onClick={() => toggleExpand(faq.id)}
                >
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold ${
                          faq.status === "공개"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {faq.status === "공개" ? (
                          <Eye size={10} />
                        ) : (
                          <EyeOff size={10} />
                        )}
                        {faq.status}
                      </span>
                    </div>
                    <h4 className="leading-snug font-bold text-gray-900">
                      <span className="mr-2 text-lg text-indigo-500">Q.</span>
                      {faq.question}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {expandedId === faq.id ? (
                      <ChevronUp className="text-gray-400" />
                    ) : (
                      <ChevronDown className="text-gray-400" />
                    )}
                  </div>
                </div>

                {/* 답변 영역 (확장 시 노출) */}
                {expandedId === faq.id && (
                  <div className="animate-in slide-in-from-top-2 border-t border-indigo-100 bg-white p-5 duration-200">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <div className="text-indigo-400">
                          <HelpCircle size={20} />
                        </div>
                        <div className="flex-1">
                          {/* 답변 내용 텍스트박스 (수정 모드를 가정하여 textarea로 구성 가능) */}
                          <textarea
                            className="w-full resize-none border bg-transparent p-0 text-sm leading-relaxed whitespace-pre-wrap text-gray-700 focus:ring-0"
                            rows={3}
                            defaultValue={faq.answer}
                          />
                        </div>
                      </div>

                      {/* 하단 우측 액션 영역 */}
                      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-gray-50 pt-4">
                        {/* 관리 버튼 그룹 */}
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <select
                              className="cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 py-1.5 pr-8 pl-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                              defaultValue={faq.status}
                            >
                              <option value="공개">공개 상태</option>
                              <option value="비공개">비공개 상태</option>
                            </select>
                            <ChevronDown
                              size={14}
                              className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-current opacity-60"
                            />
                          </div>

                          <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50">
                            <Edit3 size={14} />
                            수정
                          </button>

                          <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50">
                            <CircleX size={14} />
                            취소
                          </button>

                          <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">
                            <Trash2 size={14} />
                            삭제
                          </button>

                          <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700">
                            저장하기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>FAQ 등록</AlertDialogTitle>
            <AlertDialogDescription>
              질문과 답변을 추가해주세요.
            </AlertDialogDescription>
            <div className="w-full">
              <div className="flex w-full flex-col gap-2 border-b py-4 md:flex-row md:items-center md:justify-between">
                <label className="shrink-0 font-semibold text-gray-700 md:w-15">
                  Q. 질문
                </label>

                <div className="w-full md:flex-1">
                  <Input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-2 py-5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="질문을 입력하세요"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between">
                <label className="shrink-0 font-semibold text-gray-700 md:w-15">
                  A. 답변
                </label>

                <div className="w-full md:flex-1">
                  <Textarea
                    className="w-full rounded-md border border-gray-300 px-2 py-5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="답변을 입력하세요"
                  />
                </div>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              // onClick={handleDeleteQnaAction}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
