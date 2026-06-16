import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "NovaShield | Dijital Dunyada Kalkaniniz",
  description:
    "Web Gelistirme, AI Cozumleri, Dijital Pazarlama, E-Ticaret, Mobil Uygulama ve daha fazlasi. NovaShield ile dijital dunyada one cikin.",
  keywords: "web tasarim, e-ticaret, mobil uygulama, AI, dijital pazarlama, SEO, NovaShield",
  openGraph: {
    title: "NovaShield | Dijital Dunyada Kalkaniniz",
    description: "Web Gelistirme, AI Cozumleri, Dijital Pazarlama ve daha fazlasi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-[#0a0a0a] text-white font-[family-name:var(--font-inter)] antialiased">
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />

      </body>
    </html>
  );
}
