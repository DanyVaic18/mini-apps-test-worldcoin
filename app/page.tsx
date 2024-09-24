import { Navbar } from "@/components/Layout/Navbar.tsx";
import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center gap-y-3">
        
        <VerifyBlock />
        {/* <PayBlock /> */}
      </main>
    </>
  );
}
