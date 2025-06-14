import { CircleLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <CircleLoader color="blue" />
    </div>
  );
}
