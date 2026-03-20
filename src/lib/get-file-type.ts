import type { FileType } from "@/types";

export const getFileType = (file: File): FileType => {
  const type = file.type;

  if (type.startsWith("image/")) return "image";
  if (type === "application/pdf") return "pdf";

  // excel (xlsx, xls, csv 포함)
  if (
    type.includes("spreadsheet") ||
    type.includes("excel") ||
    type === "text/csv"
  ) {
    return "excel";
  }

  return "etc";
};

export const getFileTypeFromUrl = (url: string) => {
  const cleanUrl = url.split("?")[0];
  const ext = cleanUrl.split(".").pop()?.toLowerCase();

  if (!ext) return "etc";

  if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext)) {
    return "image";
  }

  if (ext === "pdf") return "pdf";

  if (["xls", "xlsx", "csv"].includes(ext)) {
    return "excel";
  }

  return "etc";
};
