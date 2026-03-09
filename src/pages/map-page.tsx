import MapBg from "@/assets/images/map_bg.jpg";
import CtaSection from "@/components/layout/cta-section";
import KakaoMap from "@/components/layout/kakao-map";

export default function MapPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-100 w-full overflow-hidden md:h-125">
        <img
          src={MapBg}
          alt="오시는길"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-normal md:text-5xl">
            오시는길을 소개합니다
          </h1>
          <p className="max-w-2xl text-sm opacity-90 md:text-lg">
            더 나은 경험을 만들기 위해 우리는 끊임없이 고민하고 발전합니다.
          </p>
        </div>
      </section>

      <section className="container mx-auto space-y-10 px-6 pb-20 md:pb-40">
        <div className="mb-15 space-y-10 pt-10 text-center md:pt-30">
          <h2 className="text-2xl font-semibold md:text-3xl">오시는길</h2>

          <p className="text-muted-foreground mx-auto max-w-2xl">
            지하철역과 가까운 위치로 출퇴근과 통학이 편리하며,
            <br />
            주변에 다양한 편의시설이 위치해 있습니다.
          </p>

          <KakaoMap />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">주소</h2>
          <ul className="text-muted-foreground space-y-1 leading-relaxed break-keep">
            <li className="flex">
              <span className="mr-2">-</span>
              <span>서울 동작구 만양로8길 69 (노량진동 222-5)</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">오시는 길</h2>
          <ul className="text-muted-foreground space-y-1 leading-relaxed break-keep">
            <li className="flex">
              <span className="mr-2">-</span>
              <span>노량진역 1,9호선에서 5분거리.</span>
            </li>
            <li className="flex">
              <span className="mr-2">-</span>
              <span>삼익 수협 마트바로 뒤.</span>
            </li>
            <li className="flex flex-col">
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
      </section>

      <CtaSection />
    </div>
  );
}
