import css from "./ErrorMessage.module.css";

export default function ErrorNotice() {
  return <p className={css.text}>Oops! Something went wrong. Try again later.</p>;
}
