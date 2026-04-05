import { fetchFaqs } from "@/api/faq";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useFaqsData() {
  return useQuery({
    queryKey: QUERY_KEYS.faq.list,
    queryFn: () => fetchFaqs(),
  });
}
