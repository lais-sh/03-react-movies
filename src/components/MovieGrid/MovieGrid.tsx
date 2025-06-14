import type { Movie } from "../../types/movie";
import placeholder from "/src/assets/noimage.jpg";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const imagePath = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : placeholder;

        return (
          <li key={movie.id} className={css.card} onClick={() => onSelect(movie)}>
            <img
              className={css.poster}
              src={imagePath}
              alt={movie.title}
              loading="lazy"
            />
            <div className={css.caption}>
              <h3 className={css.title}>{movie.title}</h3>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
