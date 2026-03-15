import supabase from "@/lib/supabase";

export async function fetchComments(qnaId: number) {
  const { data, error } = await supabase
    .from("comment")
    .select("*, author:profile!author_id (*)")
    .eq("qna_id", qnaId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function createComment({
  qnaId,
  content,
  parentCommentId,
  rootCommentId,
}: {
  qnaId: number;
  content: string;
  parentCommentId?: number;
  rootCommentId?: number;
}) {
  const { data, error } = await supabase
    .from("comment")
    .insert({
      qna_id: qnaId,
      content: content,
      parent_comment_id: parentCommentId,
      root_comment_id: rootCommentId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateComment({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const { data, error } = await supabase
    .from("comment")
    .update({
      content,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteComment(id: number) {
  const { data, error } = await supabase
    .from("comment")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
