import { useSession } from "@/store/session";
import { UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { signOut } from "@/api/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useProfileData } from "@/hooks/queries/use-profile-data";

export default function ProfileButton() {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const {
    data: profile,
    error: fetchProfileError,
    isLoading: isFetchingProfileLoading,
    fetchStatus: isFetchingProfileStatus,
  } = useProfileData({ userId: session?.user.id });

  const isAdmin = profile?.role === "admin";

  const handleLogOutActionClick = () => {
    signOut();
    toast.success("로그아웃 되었습니다.", {
      position: "top-center",
    });
    navigate("/", { replace: true });
  };

  return (
    <>
      {session ? (
        <Popover>
          <PopoverTrigger>
            <UserRound className="h-5 w-5 cursor-pointer hover:text-blue-400" />
          </PopoverTrigger>
          <PopoverContent className="mr-4 flex w-40 flex-col overflow-hidden p-0">
            <PopoverClose asChild>
              <Link to={`/profile/${session.user.id}`}>
                <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
                  프로필
                </div>
              </Link>
            </PopoverClose>
            <PopoverClose asChild>
              <div
                onClick={() => setIsOpen(true)}
                className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
              >
                로그아웃
              </div>
            </PopoverClose>
            {isAdmin && (
              <PopoverClose asChild>
                <div
                  onClick={() =>
                    navigate("/admin/dashboard", { replace: true })
                  }
                  className="hover:bg-muted cursor-pointer px-4 py-3 text-sm text-blue-500"
                >
                  관리자페이지
                </div>
              </PopoverClose>
            )}
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          to={"/sign-in"}
          className="inline-flex cursor-pointer rounded-full p-1"
        >
          <UserRound className="h-5 w-5 hover:text-blue-400" />
        </Link>
      )}

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
    </>
  );
}
