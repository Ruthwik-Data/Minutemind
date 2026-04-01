import styles from "./ReflectionCard.module.css";

export interface ReflectionResult {
  summary: string;
  emotion: string;
  themes: string[];
  nextStep: string;
}

interface ReflectionCardProps {
  result: ReflectionResult;
}

export default function ReflectionCard({ result }: ReflectionCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>✦</div>
        <span className={styles.cardLabel}>Your Reflection</span>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Summary</p>
        <p className={styles.summaryText}>{result.summary}</p>
      </div>

      <div className={styles.row}>
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Emotion</p>
          <span className={styles.emotionBadge}>{result.emotion}</span>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Themes</p>
        <div className={styles.themeList}>
          {result.themes.map((theme) => (
            <span key={theme} className={styles.themeBadge}>
              {theme}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.nextStepSection}>
        <p className={styles.sectionLabel}>One Next Step</p>
        <p className={styles.nextStepText}>{result.nextStep}</p>
      </div>
    </div>
  );
}
