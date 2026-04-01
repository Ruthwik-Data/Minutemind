"use client";

import { useState, useRef } from "react";
import styles from "./JournalForm.module.css";
import ReflectionCard, { ReflectionResult } from "./ReflectionCard";

const MOCK_REFLECTIONS: ReflectionResult[] = [
  {
    summary:
      "You're navigating a period of meaningful transition. Your thoughts reveal both excitement about new possibilities and a natural anxiety about letting go of the familiar. This tension is healthy and signals that you're taking the change seriously.",
    emotion: "Hopeful",
    themes: ["Change & transition", "Self-trust", "Uncertainty"],
    nextStep:
      "Write down one small action you can take this week to move toward the thing that excites you most.",
  },
  {
    summary:
      "There's a recurring thread of feeling stretched across too many commitments. You're aware of this but find it hard to draw boundaries. The clarity you're seeking may come from identifying what you'd protect first if you had to choose.",
    emotion: "Overwhelmed",
    themes: ["Boundaries", "Priorities", "Energy"],
    nextStep:
      "List your top three commitments and notice which one energizes you versus which one drains you.",
  },
  {
    summary:
      "Today's reflection carries a quiet sense of gratitude underneath some surface-level frustration. You seem to have more perspective than you give yourself credit for, and the frustration may be pointing toward something worth addressing directly.",
    emotion: "Reflective",
    themes: ["Gratitude", "Frustration", "Growth"],
    nextStep:
      "Reach out to one person you mentioned feeling grateful for — even a short note can shift your energy.",
  },
];

function getMockReflection(): ReflectionResult {
  return MOCK_REFLECTIONS[Math.floor(Math.random() * MOCK_REFLECTIONS.length)];
}

interface JournalFormProps {
  formRef: React.RefObject<HTMLElement | null>;
}

export default function JournalForm({ formRef }: JournalFormProps) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReflectionResult | null>(null);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  async function handleReflect() {
    if (!text.trim()) {
      setError("Please write something before reflecting.");
      return;
    }
    setError("");
    setResult(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsLoading(false);
    const reflection = getMockReflection();
    setResult(reflection);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleReflect();
    }
  }

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <section className={styles.section} ref={formRef as React.RefObject<HTMLElement>}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>New Entry</h2>
        <p className={styles.sectionSubtitle}>
          Write freely or paste a voice transcript below.
        </p>
      </div>

      <div className={styles.formCard}>
        <div className={styles.textareaWrapper}>
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind? You can write a journal entry, paste a voice transcript, or just start with how you're feeling right now..."
            rows={8}
            aria-label="Journal entry"
          />
          {text.length > 0 && (
            <div className={styles.textStats}>
              {wordCount} {wordCount === 1 ? "word" : "words"}
              <span className={styles.statsDivider}>·</span>
              {charCount} chars
            </div>
          )}
        </div>

        {error && (
          <div className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}

        <div className={styles.formFooter}>
          <span className={styles.shortcut}>⌘ + Return to reflect</span>
          <button
            className={styles.reflectButton}
            onClick={handleReflect}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingContent}>
                <span className={styles.spinner} aria-hidden="true" />
                Reflecting…
              </span>
            ) : (
              "Reflect"
            )}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.loadingDots}>
            <span />
            <span />
            <span />
          </div>
          <p className={styles.loadingText}>Reading your entry…</p>
        </div>
      )}

      {result && !isLoading && (
        <div ref={resultRef} className={styles.resultWrapper}>
          <ReflectionCard result={result} />
        </div>
      )}
    </section>
  );
}
