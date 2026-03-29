import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  LogIn,
  Mail,
  MoreVertical,
  Plus,
  Search,
  Share2,
  UserRound,
} from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router";

const users = [
  {
    name: "김철수",
    email: "chulsoo@example.com",
    type: "이메일",
    date: "2024.03.20",
    lastLogin: "10분 전",
    provider: "mail",
  },
  {
    name: "이지현",
    email: "jihyun_g@gmail.com",
    type: "소셜",
    date: "2024.03.18",
    lastLogin: "2시간 전",
    provider: "google",
  },
  {
    name: "박준영",
    email: "junyoung@kakao.com",
    type: "소셜",
    date: "2024.03.15",
    lastLogin: "어제",
    provider: "kakao",
  },
  {
    name: "최수민",
    email: "sumin_c@test.com",
    type: "이메일",
    date: "2024.03.10",
    lastLogin: "3일 전",
    provider: "mail",
  },
  {
    name: "정은지",
    email: "eunji@naver.com",
    type: "이메일",
    date: "2024.03.05",
    lastLogin: "1주일 전",
    provider: "mail",
  },
];

export default function AdminUserPage() {
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
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-4">사용자</th>
                    <th className="px-6 py-4 text-center">가입경로</th>
                    <th className="px-6 py-4">가입날짜</th>
                    <th className="px-6 py-4">마지막 로그인</th>
                    <th className="px-6 py-4 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <div>{user.email}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${user.type === "이메일" ? "bg-gray-100 text-gray-600" : "bg-indigo-50 text-indigo-600"}`}
                        >
                          {user.provider === "mail" ? (
                            <Mail size={10} />
                          ) : (
                            <Share2 size={10} />
                          )}
                          {user.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>{" "}
                          {/* 접속 상태 표시등 */}
                          {user.lastLogin}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 2. 모바일 뷰 (카드 형식) */}
            <div className="block divide-y divide-gray-100 md:hidden">
              {users.map((user, i) => (
                <div key={i} className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{user.email}</span>
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

                  <div className="space-y-2">
                    {/* 가입경로 + 날짜 정보 라인 */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${user.type === "이메일" ? "bg-gray-100 text-gray-600" : "bg-indigo-50 text-indigo-600"}`}
                      >
                        {user.type}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Calendar size={12} />
                        <span className="inline-block pt-0.75 align-middle">
                          {user.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-500">
                        <LogIn size={12} />
                        <span className="inline-block pt-0.75 align-middle">
                          {user.lastLogin}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
