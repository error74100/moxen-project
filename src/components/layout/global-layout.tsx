import { Link, NavLink, Outlet, useLocation } from "react-router";
import reactImg from "@/assets/react.svg";
import { Menu, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "../ui/sheet";
import { gnbMenus } from "@/lib/constants";

const headerBgPages = [
  "/sign-in",
  "/sign-up",
  "/forget-password",
  "/reset-password",
];

export default function GlobalLayout() {
  const location = useLocation();
  const pathName = location.pathname;
  const isHeaderBg = headerBgPages.includes(pathName);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60); // 헤더 높이 기준
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <img className="h-5" src={reactImg} alt="logo" />
            <div className="font-bold">House</div>
          </Link>

          {/* pc menu */}
          <div className="hidden items-center gap-10 md:flex">
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
            <Link
              to={"/sign-in"}
              className="inline-flex cursor-pointer rounded-full p-1"
            >
              <UserRound className="h-5 w-5 hover:text-blue-400" />
            </Link>
          </div>
          {/* //pc menu */}

          {/* mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu size={28} className="cursor-pointer" />
              </SheetTrigger>

              <SheetContent
                side="right"
                showCloseButton={false}
                className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
              >
                <div className="flex items-center justify-between px-4 py-2">
                  <Link to={"/"} className="font-bold">
                    MENU
                  </Link>
                  <SheetClose asChild>
                    <button className="cursor-pointer p-2">
                      <X size={30} />
                    </button>
                  </SheetClose>
                </div>

                <div className="no-scrollbar overflow-y-auto px-4">
                  <nav className="flex flex-col gap-6">
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
                  </nav>
                </div>

                <SheetFooter>
                  <div className="flex gap-2">
                    <Link
                      to={"/sign-in"}
                      className="inline-flex cursor-pointer rounded-full p-1"
                    >
                      <UserRound className="h-5 w-5 hover:text-blue-400" />
                    </Link>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          {/* //mobile menu */}
        </div>
      </header>

      <main className="m-auto min-h-screen w-full flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-gray-800 py-10 text-center text-white">
        @copyright
      </footer>
    </div>
  );
}
