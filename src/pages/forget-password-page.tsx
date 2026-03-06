import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgetPasswordPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-5 shadow-lg md:p-8">
        <div className="text-center">
          <h1 className="pb-1 text-2xl font-bold">비밀번호를 잊으셨나요?</h1>
          <p className="text-muted-foreground text-sm">
            이메일로 비밀번호를 재설정 할 수 있는
            <br />
            인증 링크를 보내드립니다.
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

          <Button className="my-2 w-full cursor-pointer py-6">
            인증메일 요청하기
          </Button>
        </div>
      </div>
    </div>
  );
}
