import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Modal from "../Common/Modal";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import RandomBackdrop from "../RandomBackdrop/RandomBackdrop";
import { getRandomBackdropUrl } from "../../services/getRandomBackdrop";
import Loader from "../Loader/Loader";

export default function App() {
  //STATES
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //SEARCHING AND RENDERING MOVIES BY QUERY
  async function handleSearch(query: string) {
    setIsError(false);
    setIsLoading(true);
    try {
      setMovies([]);
      const data = await fetchMovies(query);
      setMovies(data);
      if (data.length === 0) {
        toast("No movies found for your request.", { icon: "😞" });
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  //MOVIECARD MODAL WINDOW OPTIONS
  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  //FETCH RANDOM POSTERS FOR PAGE BACKDROP
  useEffect(() => {
    if (movies.length > 0) return;

    async function preloadAndSetBackdrop() {
      try {
        const url = await getRandomBackdropUrl();

        const img = new Image();
        if (url) {
          img.src = url;
        }

        img.onload = () => {
          setBgUrl(url);
        };
      } catch (error) {
        console.error("Failed to load backdrop", error);
      }
    }

    preloadAndSetBackdrop();

    const intervalId = setInterval(() => {
      preloadAndSetBackdrop();
    }, 8000);

    return () => {
      clearInterval(intervalId);
    };
  }, [movies.length]);

  //MARKUP
  return (
    <>
      <div>
        <Toaster />
      </div>

      {/* ---------------------------- */}

      {isLoading && <Loader />}

      {/* ---------------------------- */}

      {movies.length === 0 && <RandomBackdrop bgUrl={bgUrl} />}

      {/* ---------------------------- */}

      <SearchBar onSubmit={handleSearch} />

      {/* ---------------------------- */}

      {!isError ? (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => {
            setSelectedMovie(movie);
            openModal();
          }}
        />
      ) : (
        <ErrorMessage />
      )}

      {/* ----------------------------- */}

      {isModalOpen && selectedMovie && (
        <Modal
          onClose={() => {
            closeModal();
            setSelectedMovie(null);
          }}
        >
          <MovieModal movie={selectedMovie} />
        </Modal>
      )}
    </>
  );
}
