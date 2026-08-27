import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alfauziah-web.vercel.app"),
  title: {
    default: "Pondok Pesantren Al-Fauziah | SMP Islam Al-Fauziah | MA Al-Fauziah",
    template: "%s | Pondok Pesantren Al-Fauziah",
  },
  description:
    "Website Resmi Pondok Pesantren Al-Fauziah & SMP Islam Al-Fauziah Bogor. Informasi pendaftaran santri baru (PPDB), program tahfizh, dan warta kegiatan.",
  keywords: [
    "Pondok Pesantren Al-Fauziah",
    "SMP Islam Al-Fauziah",
    "MA Al-Fauziah",
    "Pesantren di Bogor",
    "PPDB Pesantren Bogor",
    "Sekolah Islam Bogor",
  ],
  authors: [{ name: "Pondok Pesantren Al-Fauziah" }],
  openGraph: {
    title: "Pondok Pesantren Al-Fauziah Bogor",
    description:
      "Membentuk generasi unggul berlandaskan al-Qur'an dan as-Sunnah serta siap menghadapi tantangan dunia global.",
    url: "https://alfauziah-web.vercel.app",
    siteName: "Pondok Pesantren Al-Fauziah",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}