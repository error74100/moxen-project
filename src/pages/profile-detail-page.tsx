import ProfileBg from "@/assets/images/map_bg.jpg";
import AvatarDefaultImg from "@/assets/images/avatar_default.png";
import { Navigate, useParams } from "react-router";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useSession } from "@/store/session";

export default function ProfileDetailPage() {
  const params = useParams();
  const session = useSession();
  const userId = params.userId;
  const userEmail = session?.user.email;

  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchngProfilePending,
  } = useProfileData({ userId: userId!, userEmail: userEmail });

  if (!userId) return <Navigate to={"/"} replace />;

  return (
    <>
      {profile && (
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

              <div className="flex flex-col gap-10">
                <div className="flex flex-col items-center justify-center gap-5">
                  <img
                    // src={profile.avatar_url || AvatarDefaultImg}
                    src={AvatarDefaultImg}
                    className="h-30 w-30 rounded-full object-cover"
                    alt=""
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-foreground">
                      - email: {profile!.email}
                    </div>
                    <div className="text-foreground">
                      - nickname: {profile!.nickname}
                    </div>
                    <div className="text-foreground">- bio: {profile!.bio}</div>
                  </div>
                  {/* {isMine && <EditProfileButton />} */}
                </div>
                <div className="border-b"></div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
