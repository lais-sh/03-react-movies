import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
import noimage from "/src/assets/noimage.jpg";

interface MovieModalProps {
  movie: Movie;
}

export default function MovieModal({ movie }: MovieModalProps) {
  const { backdrop_path, title, overview, release_date, vote_average } = movie;

  return (
    <>
      <img
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
            : noimage
        }
        alt={title}
        className={css.image}
      />
      <div className={css.content}>
        <h2>{title}</h2>
        <p>{overview}</p>
        <p>
          <strong>Release Date:</strong> {release_date}
        </p>
        <p>
          <strong>Rating:</strong> {`${vote_average}/10`}
        </p>
      </div>
    </>
  );
}
