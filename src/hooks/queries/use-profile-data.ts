import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useProfileData({
  userId,
  userEmail,
}: {
  userId?: string;
  userEmail?: string;
}) {
  const session = useSession();
  const isMine = userId === session?.user.id;

  const rawProvider = session?.user?.app_metadata?.provider;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          return await createProfile({
            userId: userId,
            userEmail: userEmail,
            provider: rawProvider || "social",
          });
        }
        throw error;
      }
    },
    enabled: !!userId && (!isMine || !!session),
  });
}
