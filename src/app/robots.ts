import { MetadataRoute } from "next";
import { DOMAIN, SITE_BASE_PATH } from "@/config/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${DOMAIN}${SITE_BASE_PATH}/sitemap.xml`,
  };
}
