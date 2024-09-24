import { SignIn } from "@/components/SignIn";

export const Navbar = () => {
  return (
    <header className="min-h-16 shadow-md shadow-slate-400 sticky top-0 p-2">
      <nav className="w-full h-full flex gap-2 justify-between items-center">
        <div>
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
            Salpicon Jackpot
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <SignIn />
        </div>
      </nav>
    </header>
  );
};
