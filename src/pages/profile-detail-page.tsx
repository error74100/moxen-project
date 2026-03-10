import ProfileBg from "@/assets/images/map_bg.jpg";
import { useSession } from "@/store/session";
import { Navigate, useNavigate, useParams } from "react-router";

export default function ProfileDetailPage() {
  const params = useParams();
  const userId = params.userId;

  // 임시값
  const session = useSession();

  // const {
  //   data: profile,
  //   error: fetchProfileError,
  //   isPending: isFetchngProfilePending,
  // } = useProfileData(userId);

  if (!userId) return <Navigate to={"/"} replace />;

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-100 w-full overflow-hidden md:h-125">
        <img
          src={ProfileBg}
          alt="프로필"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-normal md:text-5xl">내정보</h1>
          <p className="max-w-2xl text-sm opacity-90 md:text-lg">
            더 나은 경험을 만들기 위해 우리는 끊임없이 고민하고 발전합니다.
          </p>
        </div>
      </section>

      <section className="container mx-auto space-y-10 px-6 pb-20 md:pb-40">
        <div className="mb-15 space-y-10 pt-10 text-center md:pt-30">
          <h2 className="text-2xl font-semibold md:text-3xl">내정보</h2>

          <p className="text-muted-foreground mx-auto max-w-2xl">
            {session?.user.email}
          </p>
        </div>
      </section>
    </div>
  );
}
