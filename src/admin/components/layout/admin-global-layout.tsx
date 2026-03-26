import {
  ChevronDown,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Users,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Logo from "/logo.png";
import AvatarDefaultImg from "@/assets/images/avatar_default.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { signOut } from "@/api/auth";
import { toast } from "sonner";
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

type NavItemProps = {
  icon: ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
};

// 사이드바 아이템 컴포넌트
const NavItem = ({ icon, label, to, onClick }: NavItemProps) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
        isActive
          ? "bg-blue-500 text-white shadow-md shadow-indigo-100"
          : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
      } `
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default function AdminGlobalLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogOutActionClick = () => {
    signOut();
    toast.success("로그아웃 되었습니다.", {
      position: "top-center",
    });
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div className="flex h-screen flex-col bg-gray-100">
        <header className="z-50 flex h-16 w-full items-center justify-between border-b bg-white px-4">
          <div className="flex items-center gap-4">
            <button
              className="text-gray-500 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center">
              <Link to={"/admin/dashboard"} className="flex items-center gap-2">
                <img className="h-7 md:h-10" src={Logo} alt="logo" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <Popover>
              <PopoverTrigger>
                <div className="group flex cursor-pointer items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                      관리자
                    </p>
                  </div>
                  <img
                    src={AvatarDefaultImg}
                    alt="User"
                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                  />
                  <ChevronDown
                    size={16}
                    className="text-gray-400 group-hover:text-gray-600"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="mr-5 flex w-40 flex-col overflow-hidden p-0">
                <PopoverClose asChild>
                  <div
                    onClick={() => navigate("/", { replace: true })}
                    className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
                  >
                    Front 이동
                  </div>
                </PopoverClose>
                <PopoverClose asChild>
                  <div
                    onClick={() => setIsOpen(true)}
                    className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
                  >
                    로그아웃
                  </div>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* 컨텐츠 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 왼쪽 사이드 메뉴 */}
          <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 border-r bg-white pt-16 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:pt-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} `}
          >
            <div className="flex h-full flex-col p-4">
              <nav className="flex-1 space-y-1">
                <NavItem
                  icon={<Home size={20} />}
                  label="대시보드"
                  to="/admin/dashboard"
                  onClick={() => setIsSidebarOpen(false)} // 모바일 배려
                />
                <NavItem
                  icon={<Users size={20} />}
                  label="사용자 관리"
                  to="/admin/user"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  icon={<MessageSquare size={20} />}
                  label="문의 관리"
                  to="/admin/qna"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  icon={<HelpCircle size={20} />}
                  label="FAQ 관리"
                  to="/admin/faq"
                  onClick={() => setIsSidebarOpen(false)}
                />
              </nav>
            </div>
          </aside>

          {/* 우측 컨텐츠 영역 */}
          <main className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex-1 p-4 md:p-8">
              <Outlet />
            </div>

            <footer className="border-t bg-white px-6 py-4">
              <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
                <p className="text-sm text-gray-500">
                  © 2026 Moxen Project. All rights reserved.
                </p>
              </div>
            </footer>
          </main>
        </div>

        {/* 모바일 오버레이 */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그아웃</AlertDialogTitle>
            <AlertDialogDescription>
              로그아웃 하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleLogOutActionClick}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
