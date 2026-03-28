import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { StoreProvider } from "@/store/StoreProvider";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";

export const metadata = {
  title: "LuxeCart",
  description: "Premium e-commerce store built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-900 antialiased">
        <SessionProviderWrapper>
          <StoreProvider>
            <AnnouncementBar />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </StoreProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}