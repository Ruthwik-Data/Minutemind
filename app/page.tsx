"use client";

import { useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import JournalForm from "./components/JournalForm";
import HistorySection from "./components/HistorySection";
import styles from "./page.module.css";

export default function Home() {
  const journalRef = useRef<HTMLElement>(null);

  function scrollToJournal() {
    journalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={styles.appShell}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Hero onStart={scrollToJournal} />
          <div className={styles.divider} />
          <JournalForm formRef={journalRef} />
          <div className={styles.divider} />
          <HistorySection />
        </div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          MinuteMind — your private space to reflect.
        </p>
      </footer>
    </div>
  );
}
