import type { Movie } from "../../types/movie";
import placeholder from "/src/assets/noimage.jpg";
import css from "./MovieGrid.module.css";

interface Props {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export default function MovieGallery({ movies, onSelectMovie }: Props) {
  return (
    <ul className={css.grid}>
      {movies.map((film) => {
        const imagePath = film.poster_path
          ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
          : placeholder;

        return (
          <li key={film.id}>
            <div
              className={css.card}
              onClick={() => onSelectMovie(film)}
              role="button"
              tabIndex={0}
            >
              <img
                className={css.image}
                src={imagePath}
                alt={film.title}
                loading="lazy"
              />
              <h2 className={css.title}>{film.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
