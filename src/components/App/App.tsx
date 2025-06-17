import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backdrop, setBackdrop] = useState<string | null>(null);

  const handleForm = async (formData: FormData) => {
    const term = formData.get('query')?.toString().trim() ?? '';
    setSearchTerm(term);
    setError(false);
    setLoading(true);

    try {
      const results = await fetchMovies(term);
      if (results.length === 0) {
        toast('No movies found.', { icon: '🎬' });
      }
      setMovies(results);
    } catch (err) {
      console.error('Ошибка загрузки фильмов:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movies.length) return;

    const loadBackdrop = async () => {
      try {
        const url = await getRandomBackdropUrl();
        const img = new Image();
        img.src = url ?? '';
        img.onload = () => setBackdrop(url);
      } catch (err) {
        console.warn('Backdrop failed:', err);
      }
    };

    loadBackdrop();
    const timer = setInterval(loadBackdrop, 8000);
    return () => clearInterval(timer);
  }, [movies]);

  const closeModal = () => setActiveMovie(null);

  return (
    <div className={css.app}>
      <Toaster />
      {loading && <Loader />}
      {!movies.length && <RandomBackdrop bgUrl={backdrop} />}

      <SearchBar action={handleForm} defaultValue={searchTerm} />

      {error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movieList={movies} handleMovieClick={setActiveMovie} />
      )}

      {activeMovie && <MovieModal movie={activeMovie} onClose={closeModal} />}
    </div>
  );
}
