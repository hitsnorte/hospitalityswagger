import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode to avoid warnings coming from third-party
  // components (like swagger-ui) that use deprecated/unsafe lifecycles.
  // This reduces noisy console warnings in development. If you prefer,
  // we can instead implement a local override for `ParameterRow`.
  reactStrictMode: false,
};

export default nextConfig;
