import type { Movie } from "../../types/movie";
import noImage from "/src/assets/noimage.jpg";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movieList: Movie[];
  handleMovieClick: (movie: Movie) => void;
}

export default function MovieGrid({ movieList, handleMovieClick }: MovieGridProps) {
  return (
    <section>
      <ul className={css.wrapper}>
        {movieList.map(({ id, title, poster_path, ...rest }) => {
          const posterUrl = poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : noImage;

          const movieData = { id, title, poster_path, ...rest };

          return (
            <li
              key={id}
              className={css.cardItem}
              role="button"
              tabIndex={0}
              onClick={() => handleMovieClick(movieData)}
              onKeyDown={(e) => e.key === "Enter" && handleMovieClick(movieData)}
            >
              <div className={css.imageWrapper}>
                <img
                  src={posterUrl}
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
