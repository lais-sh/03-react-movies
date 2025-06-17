import css from './SearchBar.module.css';
import { toast } from 'react-hot-toast';

interface SearchBarProps {
  action: (formData: FormData) => void;
  defaultValue?: string;
}

export default function SearchBar({ action, defaultValue = '' }: SearchBarProps) {
  const handleFormAction = async (formData: FormData) => {
    const query = formData.get('query')?.toString().trim();

    if (!query) {
      toast.error('Please enter a movie name');
      return;
    }

    action(formData); // передаємо далі в App
  };

  return (
    <form action={handleFormAction} className={css.form}>
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
