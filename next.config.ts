import type { NextConfig } from "next";
import { SITE_BASE_PATH } from "./src/config/constants";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
