import type { NextConfig } from "next";
import { SITE_BASE_PATH } from "./src/config/constants";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  basePath: SITE_BASE_PATH,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
