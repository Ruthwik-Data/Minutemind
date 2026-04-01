import styles from "./HistorySection.module.css";

interface HistoryEntry {
  id: string;
  preview: string;
  date: string;
  emotion: string;
  emotionColor: "calm" | "warm" | "cool";
}

const HISTORY_ENTRIES: HistoryEntry[] = [
  {
    id: "1",
    preview:
      "Talked through the presentation nerves with my team. Realized the anxiety is actually excitement in disguise…",
    date: "Mar 29, 2025",
    emotion: "Curious",
    emotionColor: "cool",
  },
  {
    id: "2",
    preview:
      "Long walk this morning. Found myself thinking about what home really means now that so much has changed…",
    date: "Mar 27, 2025",
    emotion: "Nostalgic",
    emotionColor: "warm",
  },
  {
    id: "3",
    preview:
      "Called my sister after months. There's still so much left unsaid but the call felt like a first step…",
    date: "Mar 24, 2025",
    emotion: "Grateful",
    emotionColor: "calm",
  },
];

export default function HistorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Past Entries</h2>
        <span className={styles.entryCount}>
          {HISTORY_ENTRIES.length} entries
        </span>
      </div>

      <div className={styles.entryList}>
        {HISTORY_ENTRIES.map((entry) => (
          <div key={entry.id} className={styles.entryCard}>
            <div className={styles.cardTop}>
              <p className={styles.preview}>{entry.preview}</p>
            </div>
            <div className={styles.cardBottom}>
              <span className={styles.date}>{entry.date}</span>
              <span className={`${styles.emotion} ${styles[entry.emotionColor]}`}>
                {entry.emotion}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
