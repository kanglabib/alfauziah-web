import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
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
  title: {
    default: "Pondok Pesantren Al-Fauziah | SMP Islam & Pesantren Bogor",
    template: "%s | Pondok Pesantren Al-Fauziah",
  },
  description:
    "Website Resmi Pondok Pesantren Al-Fauziah & SMP Islam Al-Fauziah Bogor. Informasi pendaftaran santri baru (PPDB), program tahfizh, dan warta kegiatan.",
  keywords: [
    "Pondok Pesantren Al-Fauziah",
    "SMP Islam Al Fauziah",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}