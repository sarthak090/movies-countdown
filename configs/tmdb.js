import MoviesTmdb from "moviestmdb";

const tmdb = new MoviesTmdb(process.env.NEXT_TMDB_API);

export default tmdb;
