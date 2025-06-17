import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
import fallbackImg from "/src/assets/noimage.jpg";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const { backdrop_path, title, overview, release_date, vote_average } = movie;

  const imageUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
    : fallbackImg;

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyPress);
    return () => window.removeEventListener("keydown", onKeyPress);
  }, [onClose]);

  return createPortal(
    <div
      className={css.overlay}
      onClick={onOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.container}>
        <header className={css.header}>
          <button
            onClick={onClose}
            className={css.closeButton}
            aria-label="Close modal"
          >
            &times;
          </button>
          <h2 className={css.title}>{title}</h2>
        </header>

        <div className={css.content}>
          <img
            src={imageUrl}
            alt={title || "Movie poster"}
            className={css.poster}
          />

          <div className={css.details}>
            <p className={css.description}>{overview}</p>
            <p className={css.info}><strong>Release Date:</strong> {release_date}</p>
            <p className={css.info}><strong>Rating:</strong> {vote_average}/10</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
