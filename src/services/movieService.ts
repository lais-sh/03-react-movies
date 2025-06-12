import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  try {
    const response = await axios.get<TMDBResponse>(BASE_URL, config);
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch movies from TMDB.");
  }
}
