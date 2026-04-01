import styles from "./Hero.module.css";

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.eyebrow}>Your private reflection space</div>
      <h1 className={styles.title}>
        Capture a moment.<br />
        Reflect with clarity.
      </h1>
      <p className={styles.subtitle}>
        Speak your mind, paste a transcript, or write freely.
        MinuteMind helps you understand yourself — one entry at a time.
      </p>
      <button className={styles.ctaButton} onClick={onStart}>
        Start journaling
      </button>
    </section>
  );
}
