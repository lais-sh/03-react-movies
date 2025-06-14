import css from "./SearchBar.module.css";

interface SearchBarProps {
  action: (formData: FormData) => void;
  defaultValue?: string;
}

export default function SearchBar({ action, defaultValue = "" }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    action(formData);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="query"
        defaultValue={defaultValue}
        autoComplete="off"
        placeholder="Search movies..."
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}
