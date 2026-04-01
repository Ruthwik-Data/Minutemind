"use client";

import { useRef, useState, useCallback } from "react";
import styles from "./VoiceButton.module.css";

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

type SpeechState = "idle" | "listening" | "unsupported";

// Extend Window to include webkit-prefixed SpeechRecognition
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

export default function VoiceButton({ onTranscript, disabled }: VoiceButtonProps) {
  const [state, setState] = useState<SpeechState>(() => {
    if (typeof window === "undefined") return "idle";
    return window.SpeechRecognition || window.webkitSpeechRecognition
      ? "idle"
      : "unsupported";
  });
  const [error, setError] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const start = useCallback(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }
      onTranscript((finalTranscript + interim).trimStart());
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      if (event.error === "not-allowed") {
        setError("Microphone access was denied. Please allow it in your browser settings.");
      } else if (event.error === "no-speech") {
        setError("No speech detected. Try speaking closer to your microphone.");
      } else {
        setError("Voice input unavailable. Please type your entry.");
      }
      setState("idle");
    };

    recognition.onend = () => {
      setState("idle");
    };

    recognitionRef.current = recognition;
    recognition.start();
    setState("listening");
    setError("");
  }, [onTranscript]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setState("idle");
  }, []);

  if (state === "unsupported") {
    return (
      <span className={styles.unsupported}>
        Voice not supported in this browser
      </span>
    );
  }

  const isListening = state === "listening";

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={`${styles.micButton} ${isListening ? styles.active : ""}`}
        onClick={isListening ? stop : start}
        disabled={disabled}
        aria-label={isListening ? "Stop recording" : "Start voice input"}
        title={isListening ? "Stop recording" : "Speak your entry"}
      >
        {isListening ? (
          /* Stop icon */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="4" y="4" width="8" height="8" rx="1.5" fill="currentColor" />
          </svg>
        ) : (
          /* Mic icon */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5.5" y="1" width="5" height="8" rx="2.5" fill="currentColor" />
            <path
              d="M2.5 7.5A5.5 5.5 0 0 0 8 13a5.5 5.5 0 0 0 5.5-5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <line
              x1="8"
              y1="13"
              x2="8"
              y2="15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="5.5"
              y1="15"
              x2="10.5"
              y2="15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
        {isListening && <span className={styles.ripple} aria-hidden="true" />}
      </button>

      {isListening && (
        <span className={styles.listeningLabel}>Listening…</span>
      )}
      {error && (
        <span className={styles.errorLabel}>{error}</span>
      )}
    </div>
  );
}
