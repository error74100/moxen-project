import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { PhoneCall } from "lucide-react";

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-800 py-24 text-center text-white">
      <p className="pb-6 text-center">
        <PhoneCall className="mx-auto h-12 w-12" />
      </p>
      <h2 className="mb-6 text-2xl font-bold md:text-3xl">
        지금 바로 입실 문의하세요
      </h2>
      <p className="mb-8 text-white/70">빠른 상담을 통해 방을 안내해드립니다</p>
      <Button
        size="lg"
        variant="secondary"
        className="cursor-pointer font-bold"
        onClick={() => navigate("/qna")}
      >
        문의하기
      </Button>
    </section>
  );
}
