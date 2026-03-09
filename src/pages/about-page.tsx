import AboutBg from "@/assets/images/about_bg.jpg";
import CtaSection from "@/components/layout/cta-section";
import IntroBg01 from "@/assets/images/room_deluxe_a.jpg";
import IntroBg02 from "@/assets/images/environment_bg.jpg";

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-100 w-full overflow-hidden md:h-125">
        <img
          src={AboutBg}
          alt="소개"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-normal md:text-5xl">
            서비스를 소개합니다
          </h1>
          <p className="max-w-2xl text-sm opacity-90 md:text-lg">
            더 나은 경험을 만들기 위해 우리는 끊임없이 고민하고 발전합니다.
          </p>
        </div>
      </section>

      <section className="container mx-auto space-y-20 px-6 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">소개</h2>
            <p className="text-muted-foreground leading-relaxed">
              Moxen 고시원은 직장인과 학생을 위한 쾌적한 1인 주거 공간을
              제공합니다. 조용하고 깨끗한 환경에서 편안한 생활을 할 수 있도록
              항상 관리하고 있습니다. 합리적인 가격과 다양한 편의시설로
              입주자분들의 만족도를 높이고 있습니다.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={IntroBg01}
              alt="서비스 설명"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-10 pt-10 pb-10 text-center md:pt-30 md:pb-20">
          <h2 className="text-2xl font-semibold md:text-3xl">
            편리한 생활 환경
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl">
            지하철역과 가까운 위치로 출퇴근과 통학이 편리하며,
            <br />
            주변에 다양한 편의시설이 위치해 있습니다.
          </p>

          <div
            className="mt-15 mb-10 h-[50vh] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${IntroBg02})` }}
          />
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
