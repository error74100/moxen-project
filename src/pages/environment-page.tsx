import EnvironmentBg from "@/assets/images/environment_bg.jpg";

export default function EnvironmentPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-[400px] w-full overflow-hidden md:h-[500px]">
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

      <section className="mx-auto max-w-6xl space-y-20 px-6 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              왜 이 서비스를 만들었나요?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              우리는 사용자들이 더 편리하게 서비스를 이용할 수 있도록 직관적이고
              효율적인 플랫폼을 만들고자 했습니다. 복잡한 과정은 줄이고, 핵심
              가치에 집중했습니다.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692"
              alt="서비스 설명"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-10 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">핵심 기능</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-card rounded-2xl border p-6 shadow-sm transition hover:shadow-md">
              <h3 className="mb-3 text-lg font-semibold">111</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                222
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
