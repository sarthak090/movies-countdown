import moment from "moment";
import { getSlug } from "../../utils/get-slug";
const handler = async (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  const lastDate = moment().endOf("year").format("YYYY-MM-DD");
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_TMDB_API}&primary_release_date.gte=${currentDate}&primary_release_date.lte=${lastDate}&language=en-US&page=1`;
  const resp = await fetch(url);
  const moviesRes = await resp.json();
  const movies = moviesRes.results;

  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(movies));
  res.end();
};
const YOUR_SITENAME_WITH_PATH = process.env.NEXT_PUBLIC_DOMAIN_NAME;

const createSitemap = (movies) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${movies
          .map(({ title, id }) => {
            return `
                    <url>
                        <loc>${`${YOUR_SITENAME_WITH_PATH}/${getSlug(
                          title,
                          id
                        )}`}</loc>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;
export default handler;
