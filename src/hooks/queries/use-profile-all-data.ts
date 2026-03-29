import { fetchProfileAll } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useProfileAllData() {
  return useQuery({
    queryKey: QUERY_KEYS.profile.list,
    queryFn: () => fetchProfileAll(),
  });
}
