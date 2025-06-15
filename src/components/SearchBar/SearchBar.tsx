import css from './SearchBar.module.css';
import { toast } from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (query: string) => void;
  defaultValue?: string;
}

export default function SearchBar({ onSubmit, defaultValue = '' }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('query') as HTMLInputElement;
    const query = input.value.trim();

    if (!query) {
      toast.error('Please enter a movie name');
      return;
    }

    onSubmit(query);
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
