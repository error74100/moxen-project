import supabase from "@/lib/supabase";
import type { PostEntity, UploadFile } from "@/types";
import { deleteFilesInPath, uploadFile } from "./file";

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
  // uploads?: File[];
  uploads?: UploadFile[];
  userId: string;
}) {
  // 1. 새로운 포스트 생성
  const qna = await createQna({
    title,
    content,
  });

  if (uploads?.length === 0) return qna;

  try {
    // 1. 첨부파일 업로드
    const fileUrls = await Promise.all(
      uploads!.map((upload) => {
        console.log(upload);
        console.log(upload.file!.name);

        // const fileExtension = upload.name.split(".").pop() || "webp";
        // const fileExtension = upload.name.split(".").pop() || "webp";
        // const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        // const filePath = `${userId}/${qna.id}/${fileName}`;

        // return uploadFile({
        //   file: upload,
        //   filePath,
        // });
      }),
    );

    // 2. 포스트 테이블 업데이트
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
  existingFileUrls = [], // 프론트에서 유지하기로 한 기존 파일 URL 리스트
  newUploads = [], // 새로 추가된 파일 객체
  userId,
}: {
  qnaId: number;
  title: string;
  content: string;
  uploads?: UploadFile[];
  existingFileUrls?: string[];
  newUploads?: File[];
  userId: string;
}) {
  try {
    // 1. 새로 추가된 파일들 업로드
    const oldQna = await fetchQnaById({ qnaId: qnaId });
    const prevFileUrls: string[] = oldQna.file_urls ?? [];
    let updatedPost;

    console.log(uploads);

    // 업로드파일 없을때
    if (!uploads || uploads.length === 0) {
      // 포스트 정보 업데이트 (제목, 내용)
      updatedPost = await updateQna({
        id: qnaId,
        title,
        content,
      });

      return updatedPost;
    }

    // 1. 유지되는 파일 외의 파일 제거.
    // 현재 유지할 파일
    const existingFileUrls = uploads
      .filter((file) => !!file.previewUrl)
      .map((file) => file.previewUrl!);

    // 삭제 대상
    const filesToDelete = prevFileUrls.filter(
      (url) => !existingFileUrls.includes(url),
    );

    console.log(filesToDelete);

    // 삭제할 첨부파일이 있을때
    if (filesToDelete.length > 0) {
      console.log(11);
      // if (filesToDelete) {
      //   await Promise.all(
      //     filesToDelete.map((url) => {
      //       const fileName = url.split("/").pop()!;

      //       return deleteFilesInPath(`${userId}/${qnaId}/${fileName}`);
      //     }),
      //   );
      // }
    }

    console.log("add file..");
    // 2. 추가되는 첨부파일 추가.
    const fileUrls = await Promise.all(
      uploads!.map((upload) => {
        const fileExtension = upload.previewUrl!.split(".").pop() || "bin";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${qnaId}/${fileName}`;

        return uploadFile({
          file: upload.file!,
          filePath,
        });
      }),
    );

    console.log(fileUrls);

    // 3. 포스트 테이블 업데이트
    updatedPost = await updateQna({
      id: qnaId,
      title,
      content,
      // file_urls: fileUrls,
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
