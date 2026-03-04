import MainMovie from "@/assets/images/main_movie.mp4";

export default function IndexPage() {
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
            공간을 더 스마트하게 관리하세요
          </h1>

          <p className="mb-8 max-w-2xl text-sm opacity-90 md:text-lg">
            고시원·공간 운영을 위한 올인원 SaaS 플랫폼. 입실 관리부터 결제까지
            한 번에 해결하세요.
          </p>

          <div className="flex gap-4">
            <button className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90">
              시작하기
            </button>

            <button className="rounded-xl border border-white px-6 py-3 font-medium transition hover:bg-white hover:text-black">
              서비스 소개
            </button>
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-20">
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold md:text-4xl">
              왜 우리 서비스를 선택해야 할까요?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              복잡한 관리 업무를 단순하게. 직관적인 UI와 강력한 기능으로 운영
              효율을 극대화합니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-card rounded-2xl border p-8 shadow-sm transition hover:shadow-lg">
              <h3 className="mb-4 text-lg font-semibold">입실 관리</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                입실자 현황을 한눈에 파악하고 효율적으로 관리하세요
              </p>
            </div>
            <div className="bg-card rounded-2xl border p-8 shadow-sm transition hover:shadow-lg">
              <h3 className="mb-4 text-lg font-semibold">월세 자동화</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                자동 알림과 결제 연동으로 관리 부담을 줄입니다.
              </p>
            </div>
            <div className="bg-card rounded-2xl border p-8 shadow-sm transition hover:shadow-lg">
              <h3 className="mb-4 text-lg font-semibold">통계 분석</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                매출과 운영 데이터를 시각화하여 의사결정을 돕습니다.
              </p>
            </div>
          </div>

          <div className="pt-10 text-center">
            <button className="bg-primary rounded-2xl px-8 py-4 text-lg font-medium text-white transition hover:opacity-90">
              지금 무료로 시작하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
