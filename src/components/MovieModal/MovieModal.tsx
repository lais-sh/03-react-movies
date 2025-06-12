import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
import fallbackImg from "/src/assets/noimage.jpg";

interface Props {
  movie: Movie;
}

export default function MovieDetails({ movie }: Props) {
  const imgSrc = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : fallbackImg;

  return (
    <>
      <img src={imgSrc} alt={movie.title} className={css.image} />
      <div className={css.content}>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>
          <strong>Release:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Score:</strong> {movie.vote_average}/10
        </p>
      </div>
    </>
  );
}
