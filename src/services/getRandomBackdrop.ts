import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3/movie/popular";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MovieWithBackdrop {
  backdrop_path: string | null;
}

interface ApiResponse {
  results: MovieWithBackdrop[];
}

export const getRandomBackdropUrl = async (): Promise<string | null> => {
  if (!TMDB_TOKEN) {
    console.error("❌ Missing TMDB API token.");
    return null;
  }

  const randomPage = Math.floor(Math.random() * 500) + 1;

  try {
    const { data } = await axios.get<ApiResponse>(TMDB_BASE_URL, {
      params: {
        sort_by: "vote_average.desc",
        "vote_count.gte": 10000,
        include_adult: false,
        page: randomPage,
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });

    const validBackdrops = data.results.filter(({ backdrop_path }) => backdrop_path);

    if (!validBackdrops.length) return null;

    const { backdrop_path } = validBackdrops[Math.floor(Math.random() * validBackdrops.length)];
    return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  } catch (error) {
    console.error("🎬 Failed to fetch backdrop from TMDB:", error);
    return null;
  }
};

export default getRandomBackdropUrl;
