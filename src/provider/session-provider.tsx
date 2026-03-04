import supabase from "@/lib/supabase";
import { type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  //   const session = useSession();
  //   const setSession = useSetSession();
  //   const isSessionLoaded = useIsSessionLoaded();

  //   const {
  //     data: profile,
  //     isLoading: isProfileLoading,
  //     isPending,
  //   } = useProfileData(session?.user.id);

  //   useEffect(() => {
  //     supabase.auth.onAuthStateChange((event, session) => {
  //       setSession(session);
  //     });
  //   }, []);

  //   if (!isSessionLoaded) return <GlobalLoader />;
  //   if (isProfileLoading) return <GlobalLoader />;

  return children;
}
