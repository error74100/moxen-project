import ProfileBg from "@/assets/images/map_bg.jpg";
import AvatarDefaultImg from "@/assets/images/avatar_default.png";
import { Navigate, useParams } from "react-router";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useSession } from "@/store/session";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "lucide-react";
import { useUpdateProfile } from "@/hooks/mutations/profile/use-update-profile";
import { toast } from "sonner";

type Image = { file: File; previewUrl: string };

export default function ProfileDetailPage() {
  const params = useParams();
  const session = useSession();
  const userId = params.userId;
  const userEmail = session?.user.email;

  const isMine = session?.user.id === userId;
  const [isEditMode, setIsEditMode] = useState(false);
  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [test, setTest] = useState("");

  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchngProfilePending,
  } = useProfileData({ userId: userId!, userEmail: userEmail });

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onSuccess: () => {
        toast.error("프로필이 수정되었습니다.", {
          position: "top-center",
        });
        setIsEditMode(false);
      },
      onError: (error) => {
        toast.error("프로필 수정에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  useEffect(() => {
    if (profile?.email) setEmail(profile.email);
    if (profile?.nickname) setNickname(profile.nickname);
    if (profile?.bio) setBio(profile.bio);
  }, [profile, isEditMode]);

  useEffect(() => {
    if (!isEditMode) {
      if (avatarImage) {
        setAvatarImage(null);
        URL.revokeObjectURL(avatarImage.previewUrl);
      }
    }
  }, [isEditMode]);

  const handleUpdateCancleClick = () => {
    setIsEditMode(false);
  };

  const handleUpdateClick = () => {
    if (nickname.trim() === "") return;

    updateProfile({
      userId: session!.user.id,
      nickname,
      bio,
      avatarImageFile: avatarImage?.file,
    });
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    setAvatarImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });
  };

  if (!userId) return <Navigate to={"/"} replace />;
  if (fetchProfileError) return "fetch Profile Error..";
  if (isFetchngProfilePending) return "loading..";

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

          <section className="px-6 pb-20 md:pb-40">
            <div className="mx-auto mb-15 max-w-md pt-10 text-center md:pt-30">
              <h2 className="mb-5 text-2xl font-semibold md:text-3xl">
                내정보/{test}
              </h2>

              <div className="space-y-6 rounded-xl border bg-white p-6">
                {/* 프로필 이미지 */}
                <div className="flex flex-col items-center gap-3">
                  {isMine && !isEditMode ? (
                    <div className="relative">
                      <img
                        src={
                          avatarImage?.previewUrl ||
                          profile.avatar_url ||
                          AvatarDefaultImg
                        }
                        className="h-30 w-30 rounded-full border object-cover"
                        alt="avatar"
                      />
                    </div>
                  ) : (
                    <div
                      className="relative cursor-pointer"
                      onClick={() => {
                        if (fileInputRef.current) fileInputRef.current.click();
                      }}
                    >
                      <img
                        src={
                          avatarImage?.previewUrl ||
                          profile.avatar_url ||
                          AvatarDefaultImg
                        }
                        className="h-30 w-30 rounded-full border object-cover"
                        alt="avatar"
                      />

                      <input
                        disabled={isUpdateProfilePending}
                        onChange={handleSelectImage}
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />

                      {isMine && isEditMode && (
                        <Image className="absolute right-0 bottom-0 z-5 h-8 w-8 rounded-full bg-gray-200 p-1.5" />
                      )}
                    </div>
                  )}
                </div>

                {/* 이메일 */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-sm text-gray-500">이메일</label>

                  {!isEditMode ? (
                    <p>{profile!.email}</p>
                  ) : (
                    <Input
                      disabled
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-lg border px-3 py-5"
                    />
                  )}
                </div>

                {/* 닉네임 */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-sm text-gray-500">닉네임</label>
                  {!isEditMode ? (
                    <p>{profile!.nickname}</p>
                  ) : (
                    <Input
                      disabled={isUpdateProfilePending}
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="rounded-lg border px-3 py-5"
                    />
                  )}
                </div>

                {/* 자기소개 */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-sm text-gray-500">자기소개</label>
                  {!isEditMode ? (
                    <p>{profile!.bio}</p>
                  ) : (
                    <Textarea
                      disabled={isUpdateProfilePending}
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="resize-none rounded-lg border px-3 py-2"
                    />
                  )}
                </div>

                {/* 버튼 */}
                {isMine && !isEditMode && (
                  <Button
                    disabled={isUpdateProfilePending}
                    onClick={() => setIsEditMode(true)}
                    className="w-full cursor-pointer py-6"
                    size={"default"}
                  >
                    정보 수정
                  </Button>
                )}

                {isMine && isEditMode && (
                  <div className="flex gap-2">
                    <Button
                      disabled={isUpdateProfilePending}
                      onClick={handleUpdateCancleClick}
                      className="flex-1 cursor-pointer py-6"
                      variant={"outline"}
                      size={"default"}
                    >
                      취소하기
                    </Button>
                    <Button
                      disabled={isUpdateProfilePending}
                      onClick={handleUpdateClick}
                      className="flex-1 cursor-pointer py-6"
                      size={"default"}
                    >
                      저장하기
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
