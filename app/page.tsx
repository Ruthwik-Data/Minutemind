"use client";

import { useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import JournalForm from "./components/JournalForm";
import HistorySection from "./components/HistorySection";
import SettingsPanel from "./components/SettingsPanel";
import { loadSettings } from "./lib/settings";
import type { AppSettings } from "./lib/types";
import styles from "./page.module.css";

export default function Home() {
  const journalRef = useRef<HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [historyKey, setHistoryKey] = useState(0);

  function scrollToJournal() {
    journalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleEntrySaved() {
    setHistoryKey((k) => k + 1);
  }

  function handleSettingsChange(s: AppSettings) {
    setSettings(s);
  }

  return (
    <div className={styles.appShell}>
      <Header onSettingsOpen={() => setSettingsOpen(true)} />

      <main className={styles.main}>
        <div className={styles.container}>
          <Hero onStart={scrollToJournal} />

          <div className={styles.sectionDivider} />

          <JournalForm
            formRef={journalRef}
            settings={settings}
            onEntrySaved={handleEntrySaved}
          />

          <div className={styles.sectionDivider} />

          <HistorySection refreshKey={historyKey} />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerBrand}>MinuteMind</span>
          <span className={styles.footerDivider}>·</span>
          <span className={styles.footerText}>Your data stays on this device</span>
        </div>
      </footer>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}
