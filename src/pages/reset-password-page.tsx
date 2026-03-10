import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/mutations/auth/use-update-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.info("비밀번호가 성공적으로 변경되었습니다.", {
          position: "top-center",
        });
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
    });

  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;

    updatePassword(password);
  };

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-5 shadow-lg md:p-8">
        <div className="text-center">
          <h1 className="pb-1 text-2xl font-bold">비밀번호 재설정하기</h1>
          <p className="text-muted-foreground text-sm">
            새로운 비밀번호를 입력하세요.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">비밀번호</span>
            <Input
              disabled={isUpdatePasswordPending}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
              className="py-6"
            />
          </div>

          <Button
            disabled={isUpdatePasswordPending}
            onClick={handleUpdatePasswordClick}
            className="my-2 w-full cursor-pointer py-6"
          >
            비밀번호 변경하기
          </Button>
        </div>
      </div>
    </div>
  );
}
