import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import MobileTopBar from "@/components/layout/MobileTopBar";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "My Tests | Intellishala",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-page font-sans text-ink antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <MobileTopBar />
            <main className="flex-1 px-4 py-6 xl:px-8 xl:pt-8 xl:pb-11">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
