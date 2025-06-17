import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const AUTH_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface ApiResponse {
  results: Movie[];
}

export const fetchMovies = async (searchQuery: string): Promise<Movie[]> => {
  try {
    const { data } = await axios.get<ApiResponse>(API_URL, {
      params: {
        query: searchQuery,
        language: "en-US",
        include_adult: false,
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    return data.results;
  } catch (err) {
    console.error("TMDB API error:", err);
    throw new Error("Could not retrieve movies. Please try again later.");
  }
};

export default fetchMovies;
