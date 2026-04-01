import styles from "./Hero.module.css";

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className={styles.hero}>
      {/* Abstract organic doodle — purely decorative */}
      <div className={styles.doodleLayer} aria-hidden="true">
        <svg
          className={styles.doodle}
          viewBox="0 0 320 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Large flowing organic loop */}
          <path
            d="M280 40 C320 80, 310 160, 240 180 C170 200, 100 160, 80 200 C60 240, 100 290, 60 300"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small leaf-like curves */}
          <path
            d="M200 20 C220 40, 230 80, 200 90 C170 100, 160 70, 180 50 C190 35, 200 20, 200 20Z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Delicate branch */}
          <path
            d="M60 80 C80 60, 120 70, 130 100"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M95 65 C100 50, 115 48, 118 58"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tiny scattered dots */}
          <circle cx="150" cy="30" r="1.5" fill="currentColor" />
          <circle cx="170" cy="22" r="1" fill="currentColor" />
          <circle cx="260" cy="130" r="1.5" fill="currentColor" />
          <circle cx="50" cy="180" r="1" fill="currentColor" />
          {/* Gentle arc bottom right */}
          <path
            d="M230 220 C270 210, 300 240, 290 270"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Private · Local-first · Calm
        </div>

        <h1 className={styles.title}>
          Capture a moment.<br />
          <span className={styles.titleAccent}>Reflect</span> with clarity.
        </h1>

        <p className={styles.subtitle}>
          Speak freely, write openly, or paste a transcript.
          MinuteMind helps you understand yourself — one entry at a time.
        </p>

        <div className={styles.actions}>
          <button className={styles.ctaButton} onClick={onStart}>
            Start journaling
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className={styles.privacyBadge}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M5.5 1L1 3v3.3C1 8.7 3 10 5.5 10S10 8.7 10 6.3V3L5.5 1Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            Entries never leave your device
          </p>
        </div>
      </div>
    </section>
  );
}
