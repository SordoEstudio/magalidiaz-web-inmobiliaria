/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"], // Mantener console.error y console.warn para debugging
          }
        : false,
  },
  
  // Configuración condicional para desarrollo con proxy
  async rewrites() {
    // Solo usar proxy si está habilitado en desarrollo
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_USE_PROXY === "true"
    ) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      return [
        {
          source: "/api/public/v1/:path*",
          destination: `${apiUrl}/api/public/v1/:path*`,
        },
      ];
    }
    return [];
  },

  // Headers para CORS solo en desarrollo
  async headers() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
