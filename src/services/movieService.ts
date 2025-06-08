import axios from "axios";
import type { Movie } from "../types/movie";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
interface MoviesResponce {
  results: Movie[];
}
export default async function fetchMovies(query: string): Promise<Movie[]> {
  if (!TMDB_TOKEN) {
    throw new Error("TMDB token is missing in environment variables");
  }
  const response = await axios.get<MoviesResponce>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: true,
      },
      headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
    }
  );
  return response.data.results;
}
