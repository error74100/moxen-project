import type { Database } from "./database.types";

export type PostEntity = Database["public"]["Tables"]["qna"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type CommentEntity = Database["public"]["Tables"]["comment"]["Row"];

export type Qna = PostEntity & { author: ProfileEntity };
export type Comment = CommentEntity & { author: ProfileEntity };
export type NestedComment = Comment & {
  parentComment?: Comment;
  children?: NestedComment[];
  isAdmin?: boolean;
};

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type UploadFile = {
  file?: File;
  previewUrl?: string;
  fileType?: FileType;
};
export type FileType = "image" | "pdf" | "excel" | "etc";
