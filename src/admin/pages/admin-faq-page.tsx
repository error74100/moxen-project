import {
  ChevronDown,
  ChevronUp,
  CircleX,
  Edit3,
  Eye,
  EyeOff,
  HelpCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useFaqsData } from "@/hooks/queries/use-faqs-data";
import { createFaq, deleteFaq, updateFaq } from "@/api/faq";
import { QUERY_KEYS } from "@/lib/constants";
import Loader from "@/components/loader";
import { toast } from "sonner";
import type { FaqEntity } from "@/types";
import { useUpdateFaq } from "@/hooks/mutations/faq/use-update-faq";
import { useDeleteFaq } from "@/hooks/mutations/faq/use-delete-faq";
import { useCreateFaq } from "@/hooks/mutations/faq/use-create-faq";

type EditingFaq = Pick<FaqEntity, "id" | "question" | "answer" | "status">;

export default function AdminFaqPage() {
  const queryClient = useQueryClient();

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [createStatus, setCreateStatus] = useState(true);

  const [editingFaq, setEditingFaq] = useState<EditingFaq | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const { data: faqs, isLoading, error } = useFaqsData();

  const { mutate: create, isPending: isCreating } = useCreateFaq({
    onSuccess: () => {
      setIsCreateOpen(false);
      setQuestion("");
      setAnswer("");
      setCreateStatus(true);
      toast.success("FAQ가 등록되었습니다.", { position: "top-center" });
    },
    onError: () => {
      toast.error("등록에 실패했습니다.", { position: "top-center" });
    },
  });

  const { mutate: update, isPending: isUpdating } = useUpdateFaq({
    onSuccess: () => {
      setEditingFaq(null);
      toast.success("저장되었습니다.", { position: "top-center" });
    },
    onError: () => {
      toast.error("저장에 실패했습니다.", { position: "top-center" });
    },
  });

  const { mutate: remove, isPending: isDeleting } = useDeleteFaq({
    onSuccess: () => {
      setDeleteTargetId(null);
      setExpandedId(null);
      toast.success("삭제되었습니다.", { position: "top-center" });
    },
    onError: () => {
      toast.error("삭제에 실패했습니다.", { position: "top-center" });
    },
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
    setEditingFaq(null);
  };

  const handleCreateFaqAction = () => {
    if (question.trim() === "" || answer.trim() === "") return;
    create({ question, answer, status: createStatus });
  };

  const handleEditStart = (faq: FaqEntity) => {
    setEditingFaq({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      status: faq.status,
    });
  };

  const handleEditCancel = () => {
    setEditingFaq(null);
  };

  const handleSave = () => {
    if (!editingFaq) return;
    update({
      id: editingFaq.id,
      question: editingFaq.question,
      answer: editingFaq.answer,
      status: editingFaq.status,
    });
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-500">
        에러 발생: {error.message}
      </div>
    );
  }

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
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700"
            >
              <Plus size={18} />
              <span>FAQ 등록</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs?.map((faq) => {
              const isExpanded = expandedId === faq.id;
              const isEditing = editingFaq?.id === faq.id;
              const statusLabel = faq.status ? "공개" : "비공개";

              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-xl border transition-all ${
                    isExpanded
                      ? "border-indigo-200 ring-1 ring-indigo-100"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {/* 질문 헤더 */}
                  <div
                    className={`flex cursor-pointer items-center gap-3 p-4 hover:bg-gray-50/50 ${isExpanded ? "bg-indigo-50/30" : ""}`}
                    onClick={() => toggleExpand(faq.id)}
                  >
                    <div className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold ${
                            faq.status
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {faq.status ? (
                            <Eye size={10} />
                          ) : (
                            <EyeOff size={10} />
                          )}
                          {statusLabel}
                        </span>
                      </div>
                      <h4 className="leading-snug font-bold text-gray-900">
                        <span className="mr-2 text-lg text-indigo-500">Q.</span>
                        {faq.question}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronUp className="text-gray-400" />
                      ) : (
                        <ChevronDown className="text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* 답변 영역 */}
                  {isExpanded && (
                    <div className="animate-in slide-in-from-top-2 border-t border-indigo-100 bg-white p-5 duration-200">
                      <div className="flex flex-col gap-4">
                        {isEditing && (
                          <div className="flex items-start gap-3">
                            <div className="min-w-7 shrink-0 pt-0.5 text-sm font-bold text-indigo-500">
                              Q.
                            </div>
                            <div className="flex-1">
                              <input
                                className="w-full border bg-transparent p-2 text-sm leading-relaxed font-bold text-gray-900 focus:ring-0"
                                value={editingFaq.question}
                                onChange={(e) =>
                                  setEditingFaq({
                                    ...editingFaq,
                                    question: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <div className="text-indigo-400">
                            <p className="min-w-7">
                              <HelpCircle size={20} />
                            </p>
                          </div>
                          <div className="flex-1">
                            <textarea
                              className="w-full resize-none border bg-transparent p-2 text-sm leading-relaxed whitespace-pre-wrap text-gray-700 focus:ring-0"
                              rows={3}
                              value={isEditing ? editingFaq.answer : faq.answer}
                              readOnly={!isEditing}
                              onChange={(e) =>
                                isEditing &&
                                setEditingFaq({
                                  ...editingFaq,
                                  answer: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        {isEditing && (
                          <div className="relative flex items-start gap-4">
                            <div className="min-w-7 shrink-0 pt-0.5 text-xs font-bold text-indigo-500">
                              상태
                            </div>
                            <div className="relative">
                              <select
                                className="cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 py-1.5 pr-8 pl-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                                value={editingFaq.status ? "공개" : "비공개"}
                                onChange={(e) =>
                                  setEditingFaq({
                                    ...editingFaq,
                                    status: e.target.value === "공개",
                                  })
                                }
                              >
                                <option value="공개">공개</option>
                                <option value="비공개">비공개</option>
                              </select>
                              <ChevronDown
                                size={14}
                                className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-current opacity-60"
                              />
                            </div>
                          </div>
                        )}

                        {/* 하단 액션 */}
                        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-gray-50 pt-4">
                          <div className="flex items-center gap-2">
                            {!isEditing ? (
                              <button
                                onClick={() => handleEditStart(faq)}
                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                              >
                                <Edit3 size={14} />
                                수정
                              </button>
                            ) : (
                              <button
                                onClick={handleEditCancel}
                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                              >
                                <CircleX size={14} />
                                취소
                              </button>
                            )}

                            <button
                              onClick={() => setDeleteTargetId(faq.id)}
                              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                              삭제
                            </button>

                            {isEditing && (
                              <button
                                onClick={handleSave}
                                disabled={isUpdating}
                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
                              >
                                {isUpdating ? "저장 중..." : "저장하기"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ 등록 다이얼로그 */}
      <AlertDialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) {
            setQuestion("");
            setAnswer("");
            setCreateStatus(true);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>FAQ 등록</AlertDialogTitle>
            <AlertDialogDescription>
              질문과 답변을 추가해주세요.
            </AlertDialogDescription>
            <div className="w-full">
              <div className="flex w-full flex-col gap-2 border-b py-4 md:flex-row md:items-center md:justify-between">
                <label className="shrink-0 text-left text-sm font-semibold text-gray-700 md:w-15">
                  Q. 질문
                </label>
                <div className="w-full md:flex-1">
                  <Input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-2 py-5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="질문을 입력하세요"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 border-b py-4 md:flex-row md:items-center md:justify-between">
                <label className="shrink-0 text-left text-sm font-semibold text-gray-700 md:w-15">
                  A. 답변
                </label>
                <div className="w-full md:flex-1">
                  <Textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-40 w-full resize-none rounded-md border border-gray-300 px-2 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="답변을 입력하세요"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between">
                <label className="shrink-0 text-left text-sm font-semibold text-gray-700 md:w-15">
                  공개상태
                </label>
                <div className="w-full md:flex-1">
                  <div className="relative w-fit">
                    <select
                      className="cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pr-8 pl-3 text-sm font-medium text-gray-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      value={createStatus ? "공개" : "비공개"}
                      onChange={(e) =>
                        setCreateStatus(e.target.value === "공개")
                      }
                    >
                      <option value="공개">공개</option>
                      <option value="비공개">비공개</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-current opacity-60"
                    />
                  </div>
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
              disabled={isCreating}
              onClick={handleCreateFaqAction}
            >
              {isCreating ? "등록 중..." : "등록"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>FAQ 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              해당 FAQ를 정말 삭제하시겠습니까? 삭제 후 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
              onClick={() => deleteTargetId !== null && remove(deleteTargetId)}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
