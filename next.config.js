module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap_movies",
        permanent: true,
      },
    ];
  },
};
