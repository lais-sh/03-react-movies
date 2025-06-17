import styles from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <section className={styles.container} role="alert" aria-live="assertive">
      <p className={styles.message}>Oops! Something went wrong. Please try again later.</p>
    </section>
  );
}
