import { Link, Outlet } from "react-router";
import reactImg from "@/assets/react.svg";
import { UserRound } from "lucide-react";

export default function GlobalLayout() {
  return (
    <div className="flex flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full justify-between px-5">
          <Link to={"/"} className="flex items-center gap-2">
            <img className="h-5" src={reactImg} alt="logo" />
            <div className="font-bold">House</div>
          </Link>
          <div className="flex items-center gap-5">
            <Link to={"/about"} className="flex items-center">
              소개
            </Link>
            <Link to={"/information"} className="flex items-center">
              생활안내
            </Link>
            <Link to={"/facilities"} className="flex items-center">
              시설보기
            </Link>
            <Link to={"/environment"} className="flex items-center">
              주변환경
            </Link>
            <Link to={"/map"} className="flex items-center">
              오시는길
            </Link>
            <Link to={"/qna"} className="flex items-center">
              입실문의
            </Link>

            <Link to={"/reset-password"} className="flex items-center">
              비밀번호 재설정
            </Link>
            <Link to={"/profile-detail"} className="flex items-center">
              내정보
            </Link>
            <Link
              to={"/sign-in"}
              className="inline-flex cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300"
            >
              <UserRound className="h-5 w-5" />
            </Link>
          </div>
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
