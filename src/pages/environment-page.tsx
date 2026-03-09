import EnvironmentBg from "@/assets/images/environment_bg.jpg";
import EnvironmentBg01 from "@/assets/images/facilities_bg.jpg";
import EnvironmentBg02 from "@/assets/images/map_bg.jpg";
import CtaSection from "@/components/layout/cta-section";

export default function EnvironmentPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-100 w-full overflow-hidden md:h-125">
        <img
          src={EnvironmentBg}
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

      <section className="container mx-auto space-y-20 px-6 py-20">
        <div className="grid items-center gap-5 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              주변환경
            </h2>
            <ul className="text-muted-foreground space-y-1 leading-relaxed break-keep">
              <li className="flex">
                <span className="mr-2">-</span>
                <span>
                  주변에도 소음을 유발하는 영업장이 없어서 조용합니다.
                </span>
              </li>

              <li className="flex">
                <span className="mr-2">-</span>
                <span>
                  1층에 편의점과 커피 전문점 입점해있으며 1분거리 수협이 있어서
                  생활하기 편리한 곳입니다.
                </span>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={EnvironmentBg01}
              alt="서비스 설명"
              className="h-[40vh] w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="grid items-center gap-5 border-t py-20 md:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-2xl shadow-lg md:order-1">
            <img
              src={EnvironmentBg02}
              alt="서비스 설명"
              className="h-[40vh] w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="order-1 text-left md:order-2 md:text-right">
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              교통환경
            </h2>
            <ul className="text-muted-foreground space-y-1 leading-relaxed break-keep">
              <li className="flex justify-start md:justify-end">
                <span className="mr-2">-</span>
                <span>노량진역 1,9호선에서 5분거리.</span>
              </li>
              <li className="flex justify-start md:justify-end">
                <span className="mr-2">-</span>
                <span>삼익 수협 마트바로 뒤.</span>
              </li>
              <li className="flex flex-col justify-start md:justify-end">
                <p className="text-foreground pt-2 font-semibold">＊버스노선</p>
                <p className="pt-1">
                  <span className="rounded bg-blue-600 p-1 text-xs text-white">
                    일반
                  </span>{" "}
                  100, 200, 300
                </p>
                <p className="pt-1">
                  <span className="rounded bg-green-600 p-1 text-xs text-white">
                    좌석
                  </span>{" "}
                  1000, 2022
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
