import { CircleLoader } from 'react-spinners';
import type { FC } from 'react';
import styles from './Loader.module.css';

const Loader: FC = () => {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading content">
      <CircleLoader color="#38bdf8" size={80} speedMultiplier={0.8} />
    </div>
  );
};

export default Loader;
