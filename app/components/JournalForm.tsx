"use client";

import { useState, useRef } from "react";
import VoiceButton from "./VoiceButton";
import ReflectionCard from "./ReflectionCard";
import { runReflection } from "../providers";
import { saveEntry } from "../lib/db";
import type { AppSettings, JournalEntry, ReflectionResult } from "../lib/types";
import styles from "./JournalForm.module.css";

interface JournalFormProps {
  formRef: React.RefObject<HTMLElement | null>;
  settings: AppSettings;
  onEntrySaved: () => void;
}

export default function JournalForm({ formRef, settings, onEntrySaved }: JournalFormProps) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReflectionResult | null>(null);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  async function handleReflect() {
    if (!text.trim()) {
      setError("Please write something before reflecting.");
      return;
    }
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const reflection = await runReflection(text, settings);
      setResult(reflection);

      const entry: JournalEntry = {
        id: crypto.randomUUID(),
        text,
        createdAt: new Date().toISOString(),
        reflection,
      };
      await saveEntry(entry);
      onEntrySaved();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleReflect();
  }

  function handleVoiceTranscript(t: string) {
    setText(t);
    if (error) setError("");
  }

  const modeLabelMap: Record<string, string> = {
    mock: "Demo mode",
    cloud: "Cloud AI",
    local: "Local model",
  };

  return (
    <section className={styles.section} ref={formRef as React.RefObject<HTMLElement>}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>New entry</h2>
        <div className={styles.modeTag}>
          <span className={styles.modeDot} />
          {modeLabelMap[settings.modelMode]}
        </div>
      </div>

      {/* Form card */}
      <div className={`${styles.formCard} ${isLoading ? styles.formCardLoading : ""}`}>

        {/* Textarea area */}
        <div className={styles.textareaWrapper}>
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="What&#39;s on your mind? Write a thought, paste a transcript, or speak freely below…"
            rows={9}
            aria-label="Journal entry"
            disabled={isLoading}
          />
        </div>

        {/* Error */}
        {error && (
          <div className={styles.errorMessage} role="alert">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6.5 3.5v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="6.5" cy="9.5" r="0.75" fill="currentColor" />
            </svg>
            {error}
          </div>
        )}

        {/* Footer toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <VoiceButton
              onTranscript={handleVoiceTranscript}
              disabled={isLoading}
            />
            {wordCount > 0 && (
              <span className={styles.wordCount}>
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
            )}
          </div>

          <button
            className={styles.reflectButton}
            onClick={handleReflect}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingContent}>
                <span className={styles.buttonSpinner} aria-hidden="true" />
                Reflecting…
              </span>
            ) : (
              <>
                Reflect
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className={styles.thinkingState}>
          <div className={styles.thinkingDots}>
            <span /><span /><span />
          </div>
          <p className={styles.thinkingText}>Finding patterns in your entry…</p>
        </div>
      )}

      {/* Result */}
      {result && !isLoading && (
        <div ref={resultRef} className={styles.resultWrapper}>
          <ReflectionCard result={result} />
        </div>
      )}
    </section>
  );
}
