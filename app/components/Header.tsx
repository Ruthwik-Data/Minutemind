import styles from "./Header.module.css";

interface HeaderProps {
  onSettingsOpen: () => void;
}

export default function Header({ onSettingsOpen }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoMark} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1.5C4 1.5 2 3.5 2 6.5c0 1.8.8 3.2 2 4l-0.5 2 2.5-1c0.3 0.1 0.6 0.1 1 0.1 3 0 5-2 5-5S10 1.5 7 1.5Z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>
        <span className={styles.logoText}>MinuteMind</span>
      </div>

      <button
        className={styles.settingsButton}
        onClick={onSettingsOpen}
        aria-label="Open settings"
        title="Settings"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}
