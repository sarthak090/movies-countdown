import Header from "../components/Layout/Header";
import moment from "moment";
import Movie from "../components/Movie";
import tmdb from "../configs/tmdb";
export default function Home({ movies }) {
  return (
    <>
      <Header />
      <div className="container mx-auto text-gray-800 px-4">
        <h1 className="text-4xl my-4">Upcoming Movies Countdown</h1>
        <section className="grid lg:grid-cols-2   gap-3">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </section>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const currentDate = moment().format("YYYY-MM-DD");
  const endDate = moment().endOf("year").format("YYYY-MM-DD"); //Last date of current year

  /**
  * If you don't want to use moviestmdb package then url will be this
  * https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_TMDB_API}&primary_release_date.gte=${currentDate}&primary_release_date.lte=${endDate}&language=en-US&page=1

  */

  const moviesResp = await tmdb.discoverMovies([
    {
      param: "primary_release_date.gte",
      value: currentDate,
    },
    {
      param: "primary_release_date.lte",
      value: endDate,
    },
  ]);

  return {
    props: {
      movies: moviesResp.results,
    },
  };
};
