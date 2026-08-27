import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Melindungi folder admin agar tidak diindeks Google
    },
    sitemap: 'https://alfauziah-web.vercel.app/sitemap.xml',
  };
}