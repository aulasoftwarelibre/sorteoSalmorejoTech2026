import { MetadataRoute } from "next";
import { DOMAIN, SITE_BASE_PATH } from "@/config/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${DOMAIN}${SITE_BASE_PATH}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${DOMAIN}${SITE_BASE_PATH}/aboutUs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
