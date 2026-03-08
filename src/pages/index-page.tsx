import MainMovie from "@/assets/images/main_movie.mp4";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RoomBg01 from "@/assets/images/room_single_a.jpg";
import RoomBg02 from "@/assets/images/room_single_b.jpg";
import RoomBg03 from "@/assets/images/room_deluxe_a.jpg";
import IntroBg from "@/assets/images/about_bg.jpg";
import CtaSection from "@/components/layout/cta-section";
import { useNavigate } from "react-router";
import { Bath, CookingPot, WashingMachine, Wifi } from "lucide-react";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={MainMovie} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="mb-6 text-3xl leading-tight font-semibold md:text-5xl">
            프리미엄 1인 주거공간
          </h1>

          <p className="mb-8 max-w-2xl text-sm opacity-90 md:text-lg">
            조용하고 쾌적한 고시원 생활을 경험하세요
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/qna")}
              className="cursor-pointer rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
            >
              입실문의
            </button>

            <button
              onClick={() => navigate("/about")}
              className="cursor-pointer rounded-xl border border-white px-6 py-3 font-medium transition hover:bg-white hover:text-black"
            >
              소개
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container mx-auto px-6 py-30 text-center">
        <h2 className="mb-6 text-3xl font-bold">편안한 1인 주거 공간</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          직장인과 학생을 위한 조용하고 쾌적한 공간을 제공합니다.
          <br />
          합리적인 가격과 깨끗한 시설로 편안한 생활을 경험하세요.
        </p>

        <div
          className="mt-15 mb-10 h-[50vh] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${IntroBg})` }}
        />
      </section>

      {/* Facility */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">생활 안내</h2>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="pb-4 text-center">
                  <Bath className="mx-auto h-10 w-10" />
                </p>
                <h3 className="text-lg font-semibold">개인 공간</h3>
                <p className="text-muted-foreground text-sm">
                  프라이빗한 1인실 제공
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <p className="pb-4 text-center">
                  <WashingMachine className="mx-auto h-10 w-10" />
                </p>
                <h3 className="text-lg font-semibold">세탁 시설</h3>
                <p className="text-muted-foreground text-sm">
                  세탁기 무료 이용
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <p className="pb-4 text-center">
                  <CookingPot className="mx-auto h-10 w-10" />
                </p>
                <h3 className="text-lg font-semibold">공용 주방</h3>
                <p className="text-muted-foreground text-sm">
                  취사가 가능한 주방
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <p className="pb-4 text-center">
                  <Wifi className="mx-auto h-10 w-10" />
                </p>
                <h3 className="text-lg font-semibold">와이파이</h3>
                <p className="text-muted-foreground text-sm">
                  초고속 인터넷 제공
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold">시설 안내</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="overflow-hidden pt-0">
            <div
              className="h-60 w-full bg-cover bg-center bg-no-repeat transition-transform duration-300 hover:scale-105"
              style={{ backgroundImage: `url(${RoomBg01})` }}
            />
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-semibold">싱글룸 A</h3>
              <p className="text-muted-foreground mb-1 text-sm">월 35만원</p>
              <p className="text-muted-foreground mb-4 text-sm">3평</p>
              <Button
                onClick={() => navigate("/facilities")}
                className="w-full cursor-pointer"
              >
                상세보기
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden pt-0">
            <div
              className="h-60 w-full bg-cover bg-center bg-no-repeat transition-transform duration-300 hover:scale-105"
              style={{ backgroundImage: `url(${RoomBg02})` }}
            />
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-semibold">싱글룸 B</h3>
              <p className="text-muted-foreground mb-1 text-sm">월 40만원</p>
              <p className="text-muted-foreground mb-4 text-sm">4평</p>
              <Button
                onClick={() => navigate("/facilities")}
                className="w-full cursor-pointer"
              >
                상세보기
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden pt-0">
            <div
              className="h-60 w-full bg-cover bg-center bg-no-repeat transition-transform duration-300 hover:scale-105"
              style={{ backgroundImage: `url(${RoomBg03})` }}
            />
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-semibold">디럭스룸</h3>
              <p className="text-muted-foreground mb-1 text-sm">월 50만원</p>
              <p className="text-muted-foreground mb-4 text-sm">5평</p>
              <Button
                onClick={() => navigate("/facilities")}
                className="w-full cursor-pointer"
              >
                상세보기
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
