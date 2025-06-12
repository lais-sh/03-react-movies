import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGallery from "../MovieGrid/MovieGrid";
import MovieDetails from "../MovieModal/MovieModal";
import ModalWrapper from "../Common/Modal";
import Spinner from "../Loader/Loader";
import ErrorNotice from "../ErrorMessage/ErrorMessage";
import RandomBackdrop from "../RandomBackdrop/RandomBackdrop";
import fetchMovies from "../../services/movieService";
import { getRandomBackdropUrl } from "../../services/getRandomBackdrop";
import type { Movie } from "../../types/movie";
import "./App.module.css";

export default function App() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [chosenMovie, setChosenMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [backdrop, setBackdrop] = useState<string | null>(null);

  const handleSearch = async (searchTerm: string) => {
    setHasError(false);
    setIsLoading(true);
    try {
      setMovieList([]);
      const result = await fetchMovies(searchTerm);
      if (result.length === 0) {
        toast("No movies found for your request.", { icon: "🎬" });
      }
      setMovieList(result);
    } catch (err) {
      console.error("Search failed:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setChosenMovie(null);
  };

  useEffect(() => {
    if (movieList.length > 0) return;

    const updateBackdrop = async () => {
      try {
        const url = await getRandomBackdropUrl();
        const img = new Image();
        img.src = url || "";
        img.onload = () => setBackdrop(url);
      } catch (error) {
        console.error("Backdrop load failed:", error);
      }
    };

    updateBackdrop();
    const interval = setInterval(updateBackdrop, 8000);
    return () => clearInterval(interval);
  }, [movieList.length]);

  return (
    <>
      <Toaster />

      {isLoading && <Spinner />}

      {movieList.length === 0 && <RandomBackdrop bgUrl={backdrop} />}

      <SearchBar onSubmit={handleSearch} />

      {!hasError ? (
        <MovieGallery
          movies={movieList}
          onSelectMovie={(movie) => {
            setChosenMovie(movie);
            openModal();
          }}
        />
      ) : (
        <ErrorNotice />
      )}

      {showModal && chosenMovie && (
        <ModalWrapper onClose={closeModal}>
          <MovieDetails movie={chosenMovie} />
        </ModalWrapper>
      )}
    </>
  );
}
