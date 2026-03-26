import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function AdminOnlyLayout() {
  const session = useSession();
  const userId = session?.user.id;

  const {
    data: profile,
    error: fetchProfileError,
    isLoading: isFetchingProfileLoading,
    fetchStatus: isFetchingProfileStatus,
  } = useProfileData({ userId: session?.user.id });

  const isAdmin = profile?.role === "admin";

  if (!session || !isAdmin) return <Navigate to={"/"} replace={true} />;

  return <Outlet />;
}
