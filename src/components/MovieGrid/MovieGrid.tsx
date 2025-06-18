import type { Movie } from "../../types/movie";
import noImage from "/src/assets/noimage.jpg";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <section>
      <ul className={css.wrapper}>
        {movies.map(({ id, title, poster_path, ...rest }) => {
          const imageUrl = poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : noImage;

          const movie = { id, title, poster_path, ...rest };

          return (
            <li
              key={id}
              className={css.cardItem}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(movie)}
              onKeyDown={(e) => e.key === "Enter" && onSelect(movie)}
            >
              <div className={css.imageWrapper}>
                <img
                  src={imageUrl}
                  alt={title || "Movie poster"}
                  className={css.image}
                  loading="lazy"
                />
              </div>
              <p className={css.captionText}>{title}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
