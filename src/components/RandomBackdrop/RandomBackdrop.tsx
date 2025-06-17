import css from "./RandomBackdrop.module.css";
import "animate.css";

interface RandomBackdropProps {
  bgUrl: string | null;
}

export default function RandomBackdrop({ bgUrl }: RandomBackdropProps) {
  return (
    <div
      className={css.backdrop}
      style={{
        backgroundImage: bgUrl ? `url("${bgUrl}")` : "none",
      }}
    />
  );
}
