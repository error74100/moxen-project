import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import IconGoogle from "@/assets/images/icon_google.svg";
import IconGithub from "@/assets/images/icon_github.png";
import { useState } from "react";
import { useSignInWithPassword } from "@/hooks/mutations/auth/use-sign-in-with-password";
import { generateErrorMessage } from "@/lib/error";
import { toast } from "sonner";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/use-sign-in-with-oauth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onSuccess: () => {
        toast.success("로그인 되었습니다.", {
          position: "top-center",
        });

        setEmail("");
        setPassword("");
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

  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);

        toast.error(message, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSignInWithGoogleClick = () => {
    signInWithOAuth("google");
  };

  const handleSignInWithGithubClick = () => {
    signInWithOAuth("github");
  };

  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4 py-20">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-5 shadow-lg md:p-8">
        <div className="text-center">
          <h1 className="pb-1 text-2xl font-bold">로그인</h1>
          <p className="text-muted-foreground text-sm">
            로그인하여 서비스를 이용하세요.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">이메일</span>
            <Input
              disabled={isPending}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="example@email.com"
              className="py-6"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">비밀번호</span>
            <Input
              disabled={isPending}
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
            disabled={isPending}
            onClick={handleSignInWithPasswordClick}
            className="my-2 w-full cursor-pointer py-6"
          >
            로그인
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="text-muted-foreground bg-white px-2">
              간편 로그인
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            disabled={isPending}
            onClick={handleSignInWithGoogleClick}
            className="w-full cursor-pointer py-6"
            variant={"outline"}
          >
            <img src={IconGoogle} alt="google" className="h-6" />
            Google 로그인
          </Button>
          <Button
            disabled={isPending}
            onClick={handleSignInWithGithubClick}
            className="w-full cursor-pointer py-6"
            variant={"outline"}
          >
            <img src={IconGithub} alt="kakao" className="h-6" />
            Github 로그인
          </Button>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <div className="text-center text-sm">
            계정이 없으시다면?
            <Link
              to={"/sign-up"}
              className="text-foreground ml-1 text-sm underline"
            >
              회원가입
            </Link>
          </div>

          <div className="flex justify-end">
            <Link
              to={"/forget-password"}
              className="text-muted-foreground text-sm underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
