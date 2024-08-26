import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.BASE_URL}`,
    },
    {
      url: `${process.env.BASE_URL}/about`,
    },
    {
      url: `${process.env.BASE_URL}/test`,
    },
    {
      url: `${process.env.BASE_URL}/sign-in`,
    },
    {
      url: `${process.env.BASE_URL}/sign-up`,
    },
  ];
}
