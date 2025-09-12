import { createRequire } from "module";
const require = createRequire(import.meta.url);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/cYjHFDguxS',
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },
};

export default withBundleAnalyzer(nextConfig);