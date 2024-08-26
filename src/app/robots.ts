import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: [
      `${process.env.BASE_URL}/sitemap.xml`,
      `${process.env.BASE_URL}/tests`,
    ],
  };
}
