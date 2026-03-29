import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar, Mail, MoreVertical, Share2 } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router";
import Loader from "@/components/loader";
import { useProfileAllData } from "@/hooks/queries/use-profile-all-data";
import { formatTime } from "@/lib/time";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
import { useState } from "react";
import { toast } from "sonner";

export default function AdminUserPage() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: profile,
    error: fetchProfileError,
    isLoading: isFetchingProfileLoading,
    fetchStatus: isFetchingProfileStatus,
  } = useProfileAllData();

  const handleDeleteUserAction = () => {
    toast("삭제 되었습니다.", {
      position: "top-center",
    });
    // deleteQna(qnaId);
  };

  if (isFetchingProfileLoading) {
    return <Loader />;
  }

  if (fetchProfileError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-500">
        에러 발생: {fetchProfileError?.message}
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">사용자 관리</h2>
        <p className="text-gray-500">전체 가입자 목록을 조회하고 관리합니다.</p>
      </div>

      <div className="rounded-sm border border-gray-200 bg-white p-6 shadow-xs">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* 1. 데스크탑 뷰 (표 형식) */}
            <div className="hidden md:block">
              <table className="w-full table-fixed text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-4 text-center">이메일</th>
                    <th className="px-6 py-4 text-center">자기소개</th>
                    <th className="px-6 py-4 text-center">가입경로</th>
                    <th className="px-6 py-4 text-center">가입날짜</th>

                    <th className="px-6 py-4 text-center">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {profile &&
                    profile.map((user, i) => (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div>{user.email}</div>
                          <div className="text-xs text-blue-400">
                            {user.nickname}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <TooltipProvider>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <div className="block w-full truncate text-gray-700">
                                  {user.bio || "소개글이 없습니다."}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="max-w-75 break-all"
                              >
                                <p>{user.bio || "소개글이 없습니다."}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${user.provider_type === "email" ? "bg-gray-100 text-gray-600" : "bg-indigo-50 text-indigo-600"}`}
                          >
                            {user.provider_type === "email" ? (
                              <Mail size={10} />
                            ) : (
                              <Share2 size={10} />
                            )}
                            {user.provider_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">
                          {formatTime(user.created_at)}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <Popover>
                            <PopoverTrigger>
                              <MoreVertical
                                size={18}
                                className="cursor-pointer hover:text-blue-400"
                              />
                            </PopoverTrigger>
                            <PopoverContent className="mr-15 flex w-24 flex-col overflow-hidden p-0">
                              <PopoverClose asChild>
                                <div
                                  onClick={() => setIsOpen(true)}
                                  className="hover:bg-muted cursor-pointer px-4 py-3 text-xs"
                                >
                                  삭제
                                </div>
                              </PopoverClose>
                            </PopoverContent>
                          </Popover>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* 2. 모바일 뷰 (카드 형식) */}
            <div className="block divide-y divide-gray-100 md:hidden">
              {profile &&
                profile.map((user, i) => (
                  <div key={i} className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start gap-2">
                        <span>{user.email}</span>
                        <div className="text-xs text-blue-400">
                          {user.nickname}
                        </div>
                      </div>
                      <Popover>
                        <PopoverTrigger>
                          <MoreVertical
                            size={18}
                            className="cursor-pointer hover:text-blue-400"
                          />
                        </PopoverTrigger>
                        <PopoverContent className="mr-15 flex w-24 flex-col overflow-hidden p-0">
                          <PopoverClose asChild>
                            <Link to={`/profile/`}>
                              <div className="hover:bg-muted cursor-pointer px-4 py-3 text-xs">
                                삭제
                              </div>
                            </Link>
                          </PopoverClose>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <TooltipProvider>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <div className="text-muted-foreground block truncate text-xs">
                            {user.bio || "소개글이 없습니다."}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="max-w-75 break-all"
                        >
                          <p>{user.bio || "소개글이 없습니다."}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="space-y-2">
                      {/* 가입경로 + 날짜 정보 라인 */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold ${user.provider_type === "email" ? "bg-gray-100 text-gray-600" : "bg-indigo-50 text-indigo-600"}`}
                        >
                          {user.provider_type}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Calendar size={12} />
                          <span className="inline-block pt-0.75 align-middle">
                            {formatTime(user.created_at)}
                          </span>
                        </div>
                        {/* <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-500">
                          <LogIn size={12} />
                          <span className="inline-block pt-0.75 align-middle">
                            {formatTime(user.created_at)}
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>글삭제</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="text-blue-400">"000"</span> 사용자를 정말 삭제
              하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleDeleteUserAction}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
