import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import RandomBackdrop from '../RandomBackdrop/RandomBackdrop';

import fetchMovies from '../../services/movieService';
import { getRandomBackdropUrl } from '../../services/getRandomBackdrop';
import type { Movie } from '../../types/movie';

import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [backdropUrl, setBackdropUrl] = useState<string | null>(null);

  // ✅ Новий правильний обробник для React Form Action API
  const handleSearch = async (formData: FormData) => {
    const newQuery = formData.get('query')?.toString().trim() ?? '';
    setQuery(newQuery);
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await fetchMovies(newQuery);
      if (result.length === 0) {
        toast('No movies found for your request.', { icon: '🎬' });
      }
      setMovies(result);
    } catch (error) {
      console.error('Search failed:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (movies.length > 0) return;

    const updateBackdrop = async () => {
      try {
        const url = await getRandomBackdropUrl();
        const img = new Image();
        img.src = url || '';
        img.onload = () => setBackdropUrl(url);
      } catch (error) {
        console.error('Backdrop load failed:', error);
      }
    };

    updateBackdrop();
    const interval = setInterval(updateBackdrop, 8000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster />
      {isLoading && <Loader />}
      {movies.length === 0 && <RandomBackdrop bgUrl={backdropUrl} />}

      {/* ✅ використовує action замість onSubmit */}
      <SearchBar action={handleSearch} defaultValue={query} />

      {!isError ? (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      ) : (
        <ErrorMessage />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
