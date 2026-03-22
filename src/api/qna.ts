import supabase from "@/lib/supabase";
import type { PostEntity } from "@/types";
import { uploadFile } from "./file";

export async function fetchQnas({
  from,
  to,
  // userId,
  keyword,
  authorId,
}: {
  from: number;
  to: number;
  // userId: string;
  keyword?: string;
  authorId?: string;
}) {
  const request = supabase
    .from("qna")
    // .select("*, author:profile!author_id (*), myLiked:like!post_id (*)")
    // .eq("like.user_id", userId)
    .select("*, author:profile!author_id (*)", { count: "exact" })
    // .or(
    //   `title.ilike.%${keyword}%,content.ilike.%${keyword}%,profile.nickname.ilike.%${keyword}%`,
    //   { foreignTable: "profile" },
    // )
    .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (authorId) request.eq("author_id", authorId);

  const { data, error, count } = await request;

  if (error) throw error;
  // return data.map((qna) => ({
  //   ...qna,
  //   isLiked: qna.myLiked && qna.myLiked.length > 0,
  // }));

  // return data.map((qna) => ({
  //   ...qna,
  // }));

  return {
    qnas: data ?? [],
    count: count ?? 0,
  };
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

export async function createQnaWithUploads({
  title,
  content,
  uploads,
  userId,
}: {
  title: string;
  content: string;
  uploads?: File[];
  userId: string;
}) {
  // 1. 새로운 포스트 생성
  const qna = await createQna({
    title,
    content,
  });
  if (uploads?.length === 0) return qna;

  try {
    // 1. 기존 이미지 모두 삭제
    // if (avatarImageFile) {
    //   await deleteFilesInPath(`${userId}/avatar`);
    // }

    // 2. 이미지 업로드
    const fileUrls = await Promise.all(
      uploads!.map((upload) => {
        const fileExtension = upload.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${qna.id}/${fileName}`;

        return uploadFile({
          file: upload,
          filePath,
        });
      }),
    );

    // 3. 포스트 테이블 업데이트
    const updatedPost = await updateQna({
      id: qna.id,
      file_urls: fileUrls,
    });

    return updatedPost;
  } catch (error) {
    await deleteQna(qna.id);
    throw error;
  }
}

export async function updateQnaWithUploads({
  qnaId,
  title,
  content,
  uploads,
  // existingUrls = [], // 기존 파일 중 유지할 URL 리스트
  // newUploads = [], // 새로 추가할 File 객체 리스트
  userId,
  isUploadsChanged,
}: {
  qnaId: number;
  title: string;
  content: string;
  uploads?: File[];
  // existingUrls?: string[];
  // newUploads?: File[];
  userId: string;
  isUploadsChanged: boolean;
}) {
  try {
    // 1. 새로 추가된 파일들 업로드
    // let newFileUrls: string[] = [];

    // if (newUploads.length > 0) {
    //   newFileUrls = await Promise.all(
    //     newUploads.map((file) => {
    //       const fileExtension = file.name.split(".").pop() || "webp";
    //       const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
    //       // 경로 구조 유지: userId/postId/fileName
    //       const filePath = `${userId}/${qnaId}/${fileName}`;

    //       return uploadFile({
    //         file,
    //         filePath,
    //       });
    //     }),
    //   );
    // }

    // 2. 최종적으로 DB에 저장될 파일 URL 합치기 (기존 유지 + 신규)
    // const finalFileUrls = [...existingUrls, ...newFileUrls];

    // 2. 이미지 업로드
    const fileUrls = await Promise.all(
      uploads!.map((upload) => {
        const fileExtension = upload.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${qnaId}/${fileName}`;

        return uploadFile({
          file: upload,
          filePath,
        });
      }),
    );

    console.log(isUploadsChanged);

    // 3. 포스트 정보 업데이트 (제목, 내용, 파일 URL 리스트)
    const updatedPost = await updateQna({
      id: qnaId,
      title,
      content,
      // file_urls: fileUrls,
      ...(isUploadsChanged && { file_urls: fileUrls }),
    });

    return updatedPost;
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
}

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
