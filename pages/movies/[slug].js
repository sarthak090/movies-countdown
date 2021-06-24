import { getSlug } from "../../utils/get-slug";
import { getDate } from "../../utils/get-date";
import Header from "../../components/Layout/Header";
import useCountDown from "../../hooks/useCountDown";
import moment from "moment";

export default function MoviePage({ movieData, error }) {
  if (typeof movieData == "object") {
    const { showReleaseDate, coundownText } = useCountDown(
      movieData.release_date
    );
    const { overview, genres, tagline, release_date, videos } = movieData;

    return (
      <>
        <Header />

        <div className="relative block h-96 mb-8">
          <div
            className="absolute w-full h-96 top-0   "
            style={{
              background: `linear-gradient(
                  rgba(0, 0, 0, 0.62),
                   rgba(0, 0, 0, 0.62)
                ),url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",

              backgroundPosition: "center",
              zIndex: -5,
            }}
          >
            <section className="text-gray-100 h-full  text-center flex flex-col justify-center ">
              <h1 className="text-3xl md:text-6xl my-4 text-gray-50">
                {movieData.title}
              </h1>
              <p className="my-4">{movieData.tagline}</p>

              <h2 className="text-2xl md:text-5xl block">
                {showReleaseDate && coundownText}
              </h2>
            </section>
          </div>
        </div>

        <main className="mx-auto container relative px-2 md:px-8">
          {movieData.videos.results && (
            <>
              {movieData.videos.results.length > 0 ? (
                <a
                  href={`https://www.youtube.com/watch?v=${movieData.videos.results[0].key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="p-3 bg-indigo-500 text-gray-100 rounded-md my-4 focus:outline-none">
                    Watch Trailer
                  </button>
                </a>
              ) : (
                ""
              )}
            </>
          )}

          {movieData.overview && (
            <section className="my-4">
              <h3 className="text-3xl font-semibold mb-4">Plot</h3>
              <p>{movieData.overview}</p>
            </section>
          )}
          <section className="my-4">
            <h4 className="text-3xl font-semibold mb-4">Genres</h4>
            <div className="flex gap-2">
              {movieData.genres.map((genre) => (
                <div key={genre.id}>{genre.name}</div>
              ))}
            </div>
          </section>
          {movieData && (
            <section className="my-4">
              <h5 className="text-3xl font-semibold mb-4">Release Date</h5>
              <div className="flex gap-2">
                {getDate(movieData.release_date)}
              </div>
            </section>
          )}
        </main>
      </>
    );
  }
  return <div>Not Found</div>;
}

export const getStaticPaths = async () => {
  const currentDate = moment().format("YYYY-MM-DD");
  const lastDate = moment().endOf("year").format("YYYY-MM-DD");
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_TMDB_API}&primary_release_date.gte=${currentDate}&primary_release_date.lte=${lastDate}&language=en-US&page=1`;
  const res = await fetch(url);
  const moviesRes = await res.json();
  const movies = moviesRes.results;

  const paths = movies
    .filter((v) => v)
    .map((movie, i) => {
      return {
        params: { slug: getSlug(movie.title, movie.id).toString() },
      };
    });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const slug = ctx.params !== undefined ? ctx.params.slug : "";
  const url = `https://api.themoviedb.org/3/movie/${slug
    .split("-")
    .pop()}?api_key=${
    process.env.NEXT_TMDB_API
  }&language=en-US&append_to_response=credits,videos`;

  const res = await fetch(url).then();
  const data = await res.json();
  if (data == undefined) {
    return {
      props: {
        error: true,
        movieData: null,
      },
    };
  }

  return {
    props: {
      movieData: data,
    },
  };
};
