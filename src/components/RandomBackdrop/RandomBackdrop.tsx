import { memo } from "react";
import styles from "./RandomBackdrop.module.css";
import "animate.css";

interface RandomBackdropProps {
  bgUrl: string | null;
}

const RandomBackdrop = memo(({ bgUrl }: RandomBackdropProps) => {
  if (!bgUrl) return null;

  return (
    <div
      className={`${styles.backdrop} animate__animated animate__fadeIn`}
      style={{ backgroundImage: `url("${bgUrl}")` }}
      aria-hidden="true"
    />
  );
});

export default RandomBackdrop;
