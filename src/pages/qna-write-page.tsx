import QnaBg from "@/assets/images/qna_bg.jpg";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQna } from "@/hooks/mutations/qna/use-create-qna";
import { useSession } from "@/store/session";
import { Paperclip, Pen, X, XIcon } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type Image = {
  file: File;
  previewUrl: string;
};

export default function QnaDetailPage() {
  const navigate = useNavigate();
  const session = useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createQna, isPending: isCreateQnaPending } = useCreateQna({
    onSuccess: () => {
      toast.message("문의글이 등록되었습니다.", {
        position: "top-center",
      });
      navigate("/qna", { replace: true });
    },
    onError: (error) => {
      toast.error("문의글 등록에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );

    URL.revokeObjectURL(image.previewUrl);
  };

  const handleSaveQnaClick = () => {
    if (title.trim() === "" || content.trim() === "") {
      toast.message("제목 및 내용을 입력해주세요.", {
        position: "top-center",
      });

      return;
    }

    createQna({
      title,
      content,
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-100 w-full overflow-hidden md:h-125">
        <img
          src={QnaBg}
          alt="입실문의"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-normal md:text-5xl">
            입실문의를 소개합니다
          </h1>
          <p className="max-w-2xl text-sm opacity-90 md:text-lg">
            더 나은 경험을 만들기 위해 우리는 끊임없이 고민하고 발전합니다.
          </p>
        </div>
      </section>

      <section className="container mx-auto space-y-20 px-6 pt-20 pb-30">
        <div className="space-y-10 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">입실문의</h2>

          <div className="overflow-hidden border-t border-black text-left">
            <div className="border-b p-4 md:p-5">
              <h2>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="문의제목"
                  className="py-4"
                />
              </h2>
            </div>

            <div className="min-h-45 p-4 leading-relaxed whitespace-pre-line md:p-5">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-[30vh] resize-none py-4 md:h-[40vh]"
                placeholder="문의내용"
              />
            </div>

            <div className="border-t border-b p-4 md:p-5">
              {images.length > 0 && (
                <Carousel className="mb-5">
                  <CarouselContent>
                    {images.map((image) => (
                      <CarouselItem
                        className="basis-2/5"
                        key={image.previewUrl}
                      >
                        <div className="relative aspect-square w-full">
                          <img
                            src={image.previewUrl}
                            className="h-full w-full rounded-sm object-cover"
                          />
                          <div
                            onClick={() => handleDeleteImage(image)}
                            className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                          >
                            <XIcon className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              )}
              <input
                onChange={handleSelectImages}
                ref={fileInputRef}
                type="file"
                accept="*"
                multiple
                // className="hidden"
              />
              <Button
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                // disabled={isPending}
                variant={"outline"}
                className="cursor-pointer"
              >
                <Paperclip />
                첨부파일 추가
              </Button>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/qna")}
              className="cursor-pointer"
            >
              <X />
              취소
            </Button>
            <Button
              onClick={handleSaveQnaClick}
              size="lg"
              className="cursor-pointer"
            >
              <Pen />
              등록
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
