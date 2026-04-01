import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoMark}>M</div>
      <span className={styles.logoText}>MinuteMind</span>
    </header>
  );
}
