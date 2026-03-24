import { LoaderCircleIcon } from "lucide-react";

export default function LoaderLayer({ show }: { show: boolean }) {
  return (
    <div
      className={`text-muted-foreground absolute top-0 right-0 bottom-0 left-0 flex-col items-center justify-center gap-5 bg-white/50 ${!show ? "hidden" : "flex"}`}
    >
      <LoaderCircleIcon className="animate-spin" />
      {/* <div className="text-sm">loading..</div> */}
    </div>
  );
}
