const fs = require("fs");
const axios = require("axios");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const fetchUrl = "http://localhost:4000/api/movies/all-slugs";
const YOUR_AWESOME_DOMAIN = "https://moviesmania.xyz";
const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });
const changefreq = "monthly";
const priority = 0.8;
(async () => {
  const fetchPosts = await axios(fetchUrl)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const postList = [];
  fetchPosts.forEach((post) => postList.push(post.slug));

  const postListSitemap = `
      ${postList
        .map((id) => {
          return `
            <url>
              <loc>${`${YOUR_AWESOME_DOMAIN}/movie/${id}`}</loc>
              <lastmod>${getDate}</lastmod>
              <changefreq>${changefreq}</changefreq>
              <priority>${priority}</priority>
            </url>`;
        })
        .join("")}
    `;

  const generatedSitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      >
        ${postListSitemap}
      </urlset>
    `;

  const formattedSitemap = [formatted(generatedSitemap)];

  fs.writeFileSync(
    "../../public/sitemap_movies.xml",
    formattedSitemap.toString(),
    "utf8"
  );
})();
