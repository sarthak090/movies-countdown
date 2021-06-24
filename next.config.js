module.exports = {
  reactStrictMode: false,
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
