import supabase from "@/lib/supabase";
import type { PostEntity } from "@/types";

export async function fetchQnas({
  from,
  to,
  // userId,
  authorId,
}: {
  from: number;
  to: number;
  // userId: string;
  authorId?: string;
}) {
  const request = supabase
    .from("qna")
    // .select("*, author:profile!author_id (*), myLiked:like!post_id (*)")
    // .eq("like.user_id", userId)
    .select("*, author:profile!author_id (*)")
    .order("created_at", { ascending: false })
    .range(from, to);

  // if (authorId) request.eq("author_id", authorId);

  const { data, error } = await request;

  if (error) throw error;
  // return data.map((qna) => ({
  //   ...qna,
  //   isLiked: qna.myLiked && qna.myLiked.length > 0,
  // }));
  return data.map((qna) => ({
    ...qna,
  }));
}

export async function fetchQnaById({
  qnaId,
  // userId,
}: {
  qnaId: number;
  // userId: string;
}) {
  const { data, error } = await supabase
    .from("qna")
    // .select("*, author:profile!author_id (*), myLiked:like!post_id (*)")
    // .eq("like.user_id", userId)
    .select("*, author:profile!author_id (*)")
    .eq("id", qnaId)
    .single();

  if (error) throw error;
  return {
    ...data,
  };
}

export async function createQna({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const { data, error } = await supabase
    .from("qna")
    .insert({ title, content })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// export async function createQnaWithImages({
//   content,
//   images,
//   userId,
// }: {
//   content: string;
//   images: File[];
//   userId: string;
// }) {
//   // 1. 새로운 포스트 생성
//   const post = await createPost(content);
//   if (images.length === 0) return post;

//   try {
//     // 2. 이미지 업로드
//     const imageUrls = await Promise.all(
//       images.map((image) => {
//         const fileExtension = image.name.split(".").pop() || "webp";
//         const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
//         const filePath = `${userId}/${post.id}/${fileName}`;

//         return uploadImage({
//           file: image,
//           filePath,
//         });
//       }),
//     );

//     // 3. 포스트 테이블 업데이트
//     const updatedPost = await updatePost({
//       id: post.id,
//       image_urls: imageUrls,
//     });

//     return updatedPost;
//   } catch (error) {
//     await deletePost(post.id);
//     throw error;
//   }
// }

export async function updateQna(qna: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("qna")
    .update(qna)
    .eq("id", qna.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteQna(id: number) {
  const { data, error } = await supabase
    .from("qna")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// export async function toggleQnaLike({
//   postId,
//   userId,
// }: {
//   postId: number;
//   userId: string;
// }) {
//   const { data, error } = await supabase.rpc("toggle_post_like", {
//     p_post_id: postId,
//     p_user_id: userId,
//   });

//   if (error) throw error;
//   return data;
// }
