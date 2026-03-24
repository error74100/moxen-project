import { BUCKET_NAME } from "@/lib/constants";
import supabase from "@/lib/supabase";

export async function uploadFile({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
}

export async function deleteFilesInPath(path: string) {
  const { data: files, error: fetchFilesError } = await supabase.storage
    .from(BUCKET_NAME)
    .list(path);

  if (!files || files.length === 0) {
    return;
  }

  if (fetchFilesError) throw fetchFilesError;

  const { error: removeError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove(files.map((file) => `${path}/${file.name}`));

  if (removeError) throw removeError;
}

export async function deleteQnaFilesInPath({
  path,
  fileName,
}: {
  path: string;
  fileName: string;
}) {
  const { data: files, error: fetchFilesError } = await supabase.storage
    .from(BUCKET_NAME)
    .list(path);

  if (!path?.trim() || !fileName?.trim()) {
    console.warn("삭제를 위한 경로 또는 파일명이 부족합니다.");
    return;
  }

  if (fetchFilesError) throw fetchFilesError;

  const { error: removeError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([`${path}/${fileName}`]);

  if (removeError) throw removeError;
}
