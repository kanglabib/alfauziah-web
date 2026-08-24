export const SITE_NAME = "Pondok Pesantren Al Fauziah";
export const SITE_TAGLINE = "Membentuk Generasi Berilmu, Berakhlak, dan Berdaya Saing Global";
export const SITE_DESCRIPTION = "Pondok Pesantren Modern yang memadukan kemurnian turats Islam klasik dengan keunggulan kurikulum sains, teknologi modern, dan kepemimpinan global.";
export const SITE_URL = "https://alfauziah.sch.id";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", href: "/" },
  { 
    label: "Profil", 
    href: "/about",
    children: [
      { label: "Tentang Pesantren", href: "/about" },
      { label: "Visi & Misi", href: "/about#vision" },
      { label: "Pimpinan & Pengasuh", href: "/about#founder" },
    ]
  },
  { 
    label: "Program", 
    href: "/program",
    children: [
      { label: "Tahfizh Al-Qur'an", href: "/program/tahfizh" },
      { label: "Madrasah Tsanawiyah (MTs)", href: "/program/mts" },
      { label: "Madrasah Aliyah (MA)", href: "/program/ma" },
    ]
  },
  { label: "PPDB", href: "/ppdb" },
  { label: "Galeri", href: "/gallery" },
  { label: "Berita", href: "/news" },
  { label: "Donasi", href: "/donation" },
  { label: "Kontak", href: "/contact" },
];