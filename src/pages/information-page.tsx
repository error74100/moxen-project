import InformationBg from "@/assets/images/information_bg.jpg";
import CtaSection from "@/components/layout/cta-section";
import InformationBg01 from "@/assets/images/room_deluxe_a.jpg";
import InformationBg02 from "@/assets/images/information_bg.jpg";
import InformationBg03 from "@/assets/images/information_intro_02.jpg";
import InformationBg04 from "@/assets/images/information_intro_03.jpg";

export default function InformationPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-[400px] w-full overflow-hidden md:h-[500px]">
        <img
          src={InformationBg}
          alt="주변환경"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-normal md:text-5xl">
            주변환경을 소개합니다
          </h1>
          <p className="max-w-2xl text-sm opacity-90 md:text-lg">
            더 나은 경험을 만들기 위해 우리는 끊임없이 고민하고 발전합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-20 px-6 py-20">
        <div className="grid items-center gap-5 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              풀옵션 원룸텔
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              - 개인 냉장고, 옷장, 책장 포함이며 벽돌시공으로 소음이 적습니다.
              <br />- 방에 따라 베란다, 개인 화장실, 샤워실, 개인 에어컨
              포함입니다.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={InformationBg01}
              alt="서비스 설명"
              className="h-[40vh] w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="grid items-center gap-5 border-t border-b py-20 md:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-2xl shadow-lg md:order-1">
            <img
              src={InformationBg02}
              alt="서비스 설명"
              className="h-[40vh] w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="order-1 text-left md:order-2 md:text-right">
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              인터넷 환경
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              - 초고속 wifi 설치되어 있습니다.
            </p>
          </div>
        </div>

        <div className="grid items-center gap-5 border-b pb-20 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              주방시설 및 세탁
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              - 밥솥, 정수기, 인덕션, 전자레인지, 냄비, 그릇, 수저, 라면, 쌀
              등이 있습니다.
              <br />- 세탁기, 세탁세제 등이 있습니다.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={InformationBg03}
              alt="서비스 설명"
              className="h-[40vh] w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="grid items-center gap-5 pb-40 md:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-2xl shadow-lg md:order-1">
            <img
              src={InformationBg04}
              alt="서비스 설명"
              className="h-[40vh] w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="order-1 text-left md:order-2 md:text-right">
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              소방시설
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              - 자동 화재감지시스템 및 스프링클러가 장착되어 있습니다.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
