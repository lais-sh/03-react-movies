import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

type Props = {
  onSubmit: (value: string) => void;
};

export default function SearchBar({ onSubmit }: Props) {
  const [inputValue, setInputValue] = useState('');

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchValue = inputValue.trim();

    if (searchValue === '') {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(searchValue);
    setInputValue('');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Powered by TMDB
        </a>

        <form onSubmit={onFormSubmit} className={styles.form}>
          <input
            type="text"
            name="movieSearch"
            placeholder="Search movies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            autoComplete="off"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
