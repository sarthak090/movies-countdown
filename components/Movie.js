import Image from "next/image";
import Link from "next/link";
import useCountDown from "../hooks/useCountDown";
import { getOverView } from "../utils/get-overview";
import { getSlug } from "../utils/get-slug";
export default function Movie({ movie }) {
  const { coundownText, showReleaseDate } = useCountDown(movie.release_date);

  return (
    <div>
      {showReleaseDate && (
        <div
          key={movie.id}
          className="flex flex-col sm:flex-row gap-3 border border-gray-300 relative"
        >
          <div className="flex justify-center flex-shrink-0">
            <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              width={300}
              height={350}
            />
          </div>

          <div className="p-3">
            <p className="text-3xl font-semibold mb-2">
              <Link href={`/movies/${getSlug(movie.title, movie.id)}`}>
                <a href={`/movies/${getSlug(movie.title, movie.id)}`}>
                  {movie.title}
                </a>
              </Link>
            </p>
            <p>
              {movie.overview && (
                <>
                  <span className="block  text-xl font-semibold">Plot</span>
                  {getOverView(movie.overview, 10)}..
                  <Link href={`/movies/${getSlug(movie.title, movie.id)}`}>
                    <a
                      href={`/movies/${getSlug(movie.title, movie.id)}`}
                      className="ml-1 text-indigo-500"
                    >
                      Read More
                    </a>
                  </Link>
                </>
              )}
            </p>

            <p className="text-sm md:text-md font-semibold flex gap-2 items-center mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 md:h-12 md:w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {coundownText}
            </p>
            {/* <div className="my-2">
              <Link href={`/movies/${getSlug(movie.title, movie.id)}`}>
                <a
                  href={`/movies/${getSlug(movie.title, movie.id)}`}
                  className="ml-1 text-indigo-500"
                >
                  <button className="p-3 rounded-md mr-3 w-full text-gray-100 focus:outline-none bg-blue-500">
                    Learn More
                  </button>
                </a>
              </Link>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
