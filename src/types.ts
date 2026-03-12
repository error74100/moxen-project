import type { Database } from "./database.types";

export type PostEntity = Database["public"]["Tables"]["qna"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type Qna = PostEntity & { author: ProfileEntity };

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
