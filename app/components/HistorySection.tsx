"use client";

import { useEffect, useState } from "react";
import { getAllEntries, exportEntries } from "../lib/db";
import type { JournalEntry } from "../lib/types";
import styles from "./HistorySection.module.css";

interface HistorySectionProps {
  refreshKey: number;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function truncate(text: string, maxChars = 140): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trimEnd() + "…";
}

export default function HistorySection({ refreshKey }: HistorySectionProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    getAllEntries()
      .then((data) => {
        if (!cancelled) {
          setEntries(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [refreshKey]);

  async function handleExport() {
    setIsExporting(true);
    try {
      await exportEntries();
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleRow}>
          <h2 className={styles.sectionTitle}>Past entries</h2>
          {entries.length > 0 && (
            <span className={styles.entryCount}>{entries.length}</span>
          )}
        </div>

        {entries.length > 0 && (
          <button
            className={styles.exportButton}
            onClick={handleExport}
            disabled={isExporting}
            title="Download all entries as JSON"
          >
            {isExporting ? (
              "Exporting…"
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v7M3 5.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 9.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Export
              </>
            )}
          </button>
        )}
      </div>

      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
        </div>
      )}

      {!isLoading && entries.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="5" width="20" height="18" rx="3" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9 11h10M9 15h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <p className={styles.emptyTitle}>No entries yet</p>
          <p className={styles.emptyText}>
            Your reflections will appear here after you write your first entry.
          </p>
        </div>
      )}

      {!isLoading && entries.length > 0 && (
        <div className={styles.entryList}>
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className={styles.entryCard}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <p className={styles.preview}>{truncate(entry.text)}</p>
              <div className={styles.cardMeta}>
                <span className={styles.date}>{formatDate(entry.createdAt)}</span>
                {entry.reflection?.emotion && (
                  <span className={styles.emotion}>{entry.reflection.emotion}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
