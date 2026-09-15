import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 開発中に本番ビルドを実行しても、生成ファイルが競合しないようにする。
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
