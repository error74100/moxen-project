export const gnbMenus = [
  { name: "소개", path: "/about" },
  { name: "생활안내", path: "/information" },
  { name: "시설보기", path: "/facilities" },
  { name: "주변환경", path: "/environment" },
  { name: "오시는길", path: "/map" },
  { name: "입실문의", path: "/qna" },
];

export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
  qna: {
    all: ["qna"],
    // list: ["qna", "list"],
    list: (page: number, keyword?: string) => [
      "qna",
      "list",
      { page, keyword },
    ],
    userList: (userId: string) => ["qna", "userList", userId],
    byId: (postId: number) => ["qna", "byId", postId],
  },
  comment: {
    all: ["comment"],
    qna: (qnaId: number) => ["comment", "qna", qnaId],
  },
  faq: {
    all: ["faq"],
    list: ["faq", "list"],
  },
};

export const BUCKET_NAME = "uploads";
export const QNA_PAGE_SIZE = 10;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB를 바이트 단위로 계산
