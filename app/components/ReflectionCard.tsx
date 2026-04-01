import type { ReflectionResult } from "../lib/types";
import styles from "./ReflectionCard.module.css";

interface ReflectionCardProps {
  result: ReflectionResult;
}

const EMOTION_COLORS: Record<string, string> = {
  Hopeful: "teal",
  Overwhelmed: "warm",
  Reflective: "slate",
  Grounded: "sage",
  Resolute: "indigo",
};

function getEmotionStyle(emotion: string): string {
  return EMOTION_COLORS[emotion] ?? "slate";
}

export default function ReflectionCard({ result }: ReflectionCardProps) {
  const emotionStyle = getEmotionStyle(result.emotion);

  return (
    <div className={styles.card}>
      {/* Card header */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.sparkle} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v3M8 12v3M1 8h3M12 8h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3.5 3.5l2.1 2.1M10.4 10.4l2.1 2.1M10.4 5.6l2.1-2.1M3.5 12.5l2.1-2.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className={styles.headerLabel}>Reflection</span>
        </div>
        <span className={styles.headerTime}>Just now</span>
      </div>

      {/* Summary */}
      <div className={styles.summarySection}>
        <p className={styles.summaryText}>{result.summary}</p>
      </div>

      {/* Emotion + themes row */}
      <div className={styles.metaRow}>
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Emotion</span>
          <span className={`${styles.emotionBadge} ${styles[emotionStyle]}`}>
            {result.emotion}
          </span>
        </div>

        <div className={`${styles.metaBlock} ${styles.metaBlockThemes}`}>
          <span className={styles.metaLabel}>Themes</span>
          <div className={styles.themeList}>
            {result.themes.map((t) => (
              <span key={t} className={styles.themePill}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Next step */}
      <div className={styles.nextStep}>
        <div className={styles.nextStepHeader}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M2 6.5h9M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.nextStepLabel}>One next step</span>
        </div>
        <p className={styles.nextStepText}>{result.nextStep}</p>
      </div>
    </div>
  );
}
