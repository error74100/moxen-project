import logo from "/logo.png";

export default function GlobalLoader() {
  return (
    <div className="bg-muted flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex animate-bounce items-center gap-4">
        <img src={logo} alt="logo" className="w-30" />
      </div>
    </div>
  );
}
