import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useSession } from "@/store/session";
import { toast } from "sonner";

export default function QnaWriteButton() {
  const navigate = useNavigate();
  const session = useSession();

  const handleQnaWriteClick = () => {
    if (!session) {
      toast.message("로그인 후 등록 가능합니다.", {
        position: "top-center",
      });
      return;
    }
    navigate("/qna-write");
  };

  return (
    <div>
      <Button className="cursor-pointer" onClick={handleQnaWriteClick}>
        문의하기
      </Button>
    </div>
  );
}
