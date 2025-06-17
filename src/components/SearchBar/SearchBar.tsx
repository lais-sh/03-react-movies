import { toast } from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface Props {
  action: (formData: FormData) => void;
  defaultValue?: string;
}

export default function SearchBar({ action, defaultValue = '' }: Props) {
  const handleSubmit = async (formData: FormData) => {
    const searchText = formData.get('query')?.toString().trim();

    if (!searchText) {
      toast.error('Please type something to search!');
      return;
    }

    action(formData); // передаємо у верхній компонент
  };

  return (
    <section className={styles.wrapper}>
      <form action={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={defaultValue}
          placeholder="Find your movie..."
          className={styles.input}
          autoComplete="off"
        />
        <button type="submit" className={styles.button}>
          🔍 Search
        </button>
      </form>
    </section>
  );
}
