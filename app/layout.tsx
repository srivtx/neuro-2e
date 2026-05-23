import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import YouTubeMusicPlayer from "@/components/YouTubeMusicPlayer";
import { SessionProvider } from "@/components/SessionProvider";
import ActiveSessionTimer from "@/components/ActiveSessionTimer";
import PageTransition from "@/components/PageTransition";
import SoundProvider from "@/components/SoundProvider";

export const metadata: Metadata = {
  title: "NEURO-OS | Cognitive Execution System",
  description: "Structured algorithmic practice for the 2e monolithic systems thinker.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <SoundProvider>
            <Nav />
            <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <ActiveSessionTimer />
            <YouTubeMusicPlayer />
          </SoundProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
