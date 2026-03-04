import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import IconGoogle from "@/assets/images/icon_google.svg";
import IconKakao from "@/assets/images/icon_kakao.svg";

export default function SignInPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">로그인</h1>
          <p className="text-muted-foreground text-sm">
            계정에 로그인하여 서비스를 이용하세요
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">이메일</label>
            <Input type="email" placeholder="example@email.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">비밀번호</label>
            <Input type="password" placeholder="example@email.com" />
          </div>

          <Button className="my-2 w-full cursor-pointer py-5">로그인</Button>

          <div className="flex justify-end">
            <Link
              to={"/forget-password"}
              className="text-muted-foreground text-sm hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="text-muted-foreground bg-white px-2">또는</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full cursor-pointer py-5" variant={"outline"}>
            <img src={IconGoogle} alt="google" className="h-6" />
            Google로 로그인
          </Button>
          <Button className="w-full cursor-pointer py-5" variant={"outline"}>
            <img src={IconKakao} alt="kakao" className="h-6" />
            카카오로 로그인
          </Button>
        </div>

        <div className="text-center text-sm">
          계정이 없으시다면?
          <Link
            to={"/sign-up"}
            className="text-foreground ml-1 text-sm underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
