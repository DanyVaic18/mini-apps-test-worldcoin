import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import dynamic from "next/dynamic";
import NextAuthProvider from "@/components/next-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Salpicon Jackpot Mini App",
    template: "%s | Vakano Games",
  },
  description: "First app with WorldCoin APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    }
  );
  return (
    <html lang="en">
      <NextAuthProvider>
        {/* <ErudaProvider> */}
        <body className={inter.className}>
          <MiniKitProvider>{children}</MiniKitProvider>
        </body>
        {/* </ErudaProvider> */}
      </NextAuthProvider>
    </html>
  );
}
