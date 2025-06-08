import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
import noimage from "/src/assets/noimage.jpg";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const { id, poster_path, title } = movie;

        return (
          <li key={id}>
            <div
              className={css.card}
              onClick={() => onSelect(movie)}
              role="button"
              tabIndex={0}
            >
              <img
                className={css.image}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : noimage
                }
                alt={title}
                loading="lazy"
              />
              <h2 className={css.title}>{title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
