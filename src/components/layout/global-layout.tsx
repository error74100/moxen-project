import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import Logo from "/logo.png";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { gnbMenus } from "@/lib/constants";
import { useIsMobile } from "@/utills/use-is-mobile";
import { useMoveScrollTop } from "@/utills/use-move-scrollTop";
import { useSession } from "@/store/session";
import ProfileButton from "./profile-button";
import { signOut } from "@/api/auth";
import { toast } from "sonner";

const headerBgPages = [
  "/sign-in",
  "/sign-up",
  "/forget-password",
  "/reset-password",
];

export default function GlobalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname;
  const isHeaderBg = headerBgPages.includes(pathName);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMobile = useIsMobile();

  const session = useSession();

  useMoveScrollTop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60); // 헤더 높이 기준
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOutActionClick = () => {
    signOut();
    setMobileMenuOpen(false); // Sheet 닫기

    toast.success("로그아웃 되었습니다.", {
      position: "top-center",
    });
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col">
      {isScrolled}
      <header
        className={`fixed top-0 right-0 left-0 z-50 h-15 text-white ${isHeaderBg ? "bg-black/60" : ""} ${
          isScrolled ? "bg-black/60 backdrop-blur" : ""
        }`}
      >
        <div className="m-auto flex h-full w-full items-center justify-between px-5">
          <Link to={"/"} className="flex items-center gap-2">
            <img className="h-10" src={Logo} alt="logo" />
          </Link>

          {/* pc menu */}
          <div className="hidden items-center gap-6 md:flex lg:gap-12">
            {gnbMenus.map((menu) => (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center hover:text-blue-400 ${isActive ? "text-blue-400" : ""}`
                }
              >
                {menu.name}
              </NavLink>
            ))}

            <ProfileButton />
          </div>
          {/* //pc menu */}

          {/* mobile menu */}
          {isMobile && (
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger>
                  <Menu size={28} className="cursor-pointer" />
                </SheetTrigger>

                <SheetContent
                  side="right"
                  showCloseButton={false}
                  className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
                >
                  <SheetHeader>
                    <div className="flex items-center justify-between">
                      <Link
                        to={"/"}
                        className="font-bold"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <SheetTitle>메뉴</SheetTitle>
                      </Link>
                      <SheetClose asChild>
                        <button className="cursor-pointer p-2">
                          <X size={30} />
                        </button>
                      </SheetClose>
                    </div>
                  </SheetHeader>

                  <div className="no-scrollbar overflow-y-auto px-4">
                    <nav className="flex flex-col gap-6">
                      {gnbMenus.map((menu) => (
                        <p
                          key={menu.path}
                          onClick={() => {
                            setMobileMenuOpen(false); // Sheet 닫기

                            setTimeout(() => {
                              navigate(menu.path); // 애니메이션 끝난 뒤 이동
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }, 250);
                          }}
                          className={`flex items-center hover:text-blue-400 ${
                            location.pathname === menu.path
                              ? "text-blue-400"
                              : ""
                          }`}
                        >
                          {menu.name}
                        </p>
                      ))}
                    </nav>
                  </div>

                  <SheetFooter>
                    <div className="flex gap-2">
                      {session ? (
                        <div className="flex items-center gap-3">
                          <p
                            onClick={() => {
                              setMobileMenuOpen(false); // Sheet 닫기

                              setTimeout(() => {
                                navigate(`/profile/${session.user.id}`); // 애니메이션 끝난 뒤 이동
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }, 250);
                            }}
                            className="inline-flex cursor-pointer rounded-full p-1"
                          >
                            <UserRound className="h-5 w-5 hover:text-blue-400" />
                          </p>
                          <LogOut
                            onClick={handleLogOutActionClick}
                            className="h-5 w-5 cursor-pointer hover:text-blue-400"
                          />
                        </div>
                      ) : (
                        <p
                          onClick={() => {
                            setMobileMenuOpen(false); // Sheet 닫기

                            setTimeout(() => {
                              navigate("/sign-in"); // 애니메이션 끝난 뒤 이동
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }, 250);
                          }}
                          className="inline-flex cursor-pointer rounded-full p-1"
                        >
                          <UserRound className="h-5 w-5 hover:text-blue-400" />
                        </p>
                      )}
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          )}
          {/* //mobile menu */}
        </div>
      </header>
      <main className="m-auto min-h-screen w-full flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-gray-200 py-10 text-center">
        © 2026 Moxen Project. All rights reserved.
      </footer>
    </div>
  );
}
