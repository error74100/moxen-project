import supabase from "@/lib/supabase";
import type { FaqEntity } from "@/types";

export async function fetchFaqs() {
  const { data, error } = await supabase
    .from("faq")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createFaq({
  question,
  answer,
  status = true,
}: {
  question: string;
  answer: string;
  status?: boolean;
}) {
  const { data, error } = await supabase
    .from("faq")
    .insert({ question, answer, status })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateFaq(faq: Partial<FaqEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("faq")
    .update(faq)
    .eq("id", faq.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFaq(id: number) {
  const { data, error } = await supabase
    .from("faq")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
