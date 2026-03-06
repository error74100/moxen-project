import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

export default function SignUpPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-5 shadow-lg md:p-8">
        <div className="text-center">
          <h1 className="pb-1 text-2xl font-bold">회원가입</h1>
          <p className="text-muted-foreground text-sm">
            회원가입하여 서비스를 이용하세요.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">이메일</span>
            <Input
              type="email"
              placeholder="example@email.com"
              className="py-6"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">비밀번호</span>
            <Input type="password" placeholder="password" className="py-6" />
          </div>

          <Button className="my-2 w-full cursor-pointer py-6">로그인</Button>
        </div>

        <div className="flex flex-col items-center gap-2 pb-4 sm:flex-row sm:justify-between md:pb-2">
          <div className="text-center text-sm">
            이미 계정이 있다면?
            <Link
              to={"/sign-in"}
              className="text-foreground ml-1 text-sm underline"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
