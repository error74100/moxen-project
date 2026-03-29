import supabase from "@/lib/supabase";

export async function fetchFaqs() {
  const { data, error } = await supabase.from("faq").select("*");

  if (error) throw error;
  return data;
}
