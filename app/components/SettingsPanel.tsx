"use client";

import { useState, useEffect, useCallback } from "react";
import { loadSettings, saveSettings } from "../lib/settings";
import type { AppSettings, ModelMode } from "../lib/types";
import styles from "./SettingsPanel.module.css";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (s: AppSettings) => void;
}

const MODE_OPTIONS: { value: ModelMode; label: string; description: string }[] = [
  {
    value: "mock",
    label: "Demo mode",
    description: "Instant reflections — no API key needed.",
  },
  {
    value: "cloud",
    label: "Cloud AI",
    description: "Your entry will be sent to your selected AI provider using your API key.",
  },
  {
    value: "local",
    label: "Local model",
    description: "Your entry can be processed locally using your own model setup (Ollama).",
  },
];

export default function SettingsPanel({
  isOpen,
  onClose,
  onSettingsChange,
}: SettingsPanelProps) {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  // Re-read latest settings from storage when the panel opens.
  // We use a ref-based approach to avoid setState-in-effect lint error.
  const refreshSettings = useCallback(() => {
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Defer to avoid synchronous setState inside effect body
      const id = setTimeout(refreshSettings, 0);
      return () => clearTimeout(id);
    }
  }, [isOpen, refreshSettings]);

  function update<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    saveSettings(settings);
    onSettingsChange(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
        aria-label="Settings"
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Settings</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close settings"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.panelBody}>

          {/* Privacy notice */}
          <div className={styles.privacyNote}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 1L1.5 3.5v4c0 3 2.5 4.5 5.5 5.5 3-1 5.5-2.5 5.5-5.5v-4L7 1Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
            </svg>
            <p>
              Your entries stay on your device.{" "}
              <strong>MinuteMind does not store your data.</strong>
            </p>
          </div>

          {/* Model selection */}
          <div className={styles.section}>
            <label className={styles.sectionLabel}>Reflection model</label>
            <div className={styles.modeList}>
              {MODE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.modeCard} ${
                    settings.modelMode === opt.value ? styles.modeSelected : ""
                  }`}
                  onClick={() => update("modelMode", opt.value)}
                >
                  <div className={styles.modeTop}>
                    <span className={styles.modeLabel}>{opt.label}</span>
                    {settings.modelMode === opt.value && (
                      <span className={styles.modeCheck} aria-hidden="true">✓</span>
                    )}
                  </div>
                  <p className={styles.modeDesc}>{opt.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Cloud API key */}
          {settings.modelMode === "cloud" && (
            <div className={styles.section}>
              <label className={styles.sectionLabel} htmlFor="apiKey">
                API key
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="apiKey"
                  type={showKey ? "text" : "password"}
                  className={styles.textInput}
                  placeholder="sk-..."
                  value={settings.apiKey}
                  onChange={(e) => update("apiKey", e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  className={styles.revealButton}
                  onClick={() => setShowKey((v) => !v)}
                  aria-label={showKey ? "Hide API key" : "Show API key"}
                >
                  {showKey ? "Hide" : "Show"}
                </button>
              </div>
              <p className={styles.fieldNote}>
                Stored locally on this device only. Never sent to MinuteMind servers.
              </p>
            </div>
          )}

          {/* Local endpoint */}
          {settings.modelMode === "local" && (
            <div className={styles.section}>
              <label className={styles.sectionLabel} htmlFor="localEndpoint">
                Ollama endpoint
              </label>
              <input
                id="localEndpoint"
                type="url"
                className={styles.textInput}
                value={settings.localEndpoint}
                onChange={(e) => update("localEndpoint", e.target.value)}
                placeholder="http://localhost:11434"
                autoComplete="off"
              />
              <p className={styles.fieldNote}>
                Make sure Ollama is running locally before reflecting.
              </p>
            </div>
          )}

          {/* Save */}
          <button
            className={`${styles.saveButton} ${saved ? styles.saveSuccess : ""}`}
            onClick={handleSave}
          >
            {saved ? "Saved ✓" : "Save settings"}
          </button>
        </div>
      </aside>
    </>
  );
}
