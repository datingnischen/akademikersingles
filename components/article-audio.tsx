"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./article-audio.module.css";

const RATES = [1, 1.25, 1.5, 0.75];

function clock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

// Audio-Zusammenfassung als eigene Karte statt des nackten <audio>-Players aus dem WordPress-Import.
export function ArticleAudio({ src }: { src: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const element = audio.current;
    if (element && element.readyState >= 1) setDuration(element.duration);
  }, []);

  const toggle = () => {
    const element = audio.current;
    if (!element) return;
    if (element.paused) void element.play();
    else element.pause();
  };
  const skip = (delta: number) => {
    const element = audio.current;
    if (element) element.currentTime = Math.min(Math.max(element.currentTime + delta, 0), element.duration || 0);
  };
  const nextRate = () => {
    const index = (rate + 1) % RATES.length;
    setRate(index);
    if (audio.current) audio.current.playbackRate = RATES[index];
  };
  const progress = duration ? (time / duration) * 100 : 0;
  const minutes = duration ? Math.max(1, Math.round(duration / 60)) : 0;

  return <section className={`${styles.card} ${playing ? styles.playing : ""}`} id="anhoeren" aria-labelledby="anhoeren-titel">
    <audio
      ref={audio}
      src={src}
      preload="metadata"
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)}
      onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
      onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
    />
    <button type="button" className={styles.play} onClick={toggle} aria-label={playing ? "Audio pausieren" : "Audio abspielen"}>
      {playing
        ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>}
    </button>
    <div className={styles.main}>
      <div className={styles.head}>
        <p className={styles.kicker}>
          <span className={styles.bars} aria-hidden="true"><i /><i /><i /><i /></span>
          Audio-Zusammenfassung{minutes ? ` · ${minutes} Min.` : ""}
        </p>
        <h2 id="anhoeren-titel" className={styles.title}>Artikel kurz anhören</h2>
        <p className={styles.lead}>Die wichtigsten Punkte kurz und verständlich zusammengefasst.</p>
      </div>
      <div className={styles.controls}>
        <span className={styles.time}>{clock(time)}</span>
        <input
          className={styles.range}
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          onChange={event => { if (audio.current) audio.current.currentTime = Number(event.currentTarget.value); }}
          aria-label="Wiedergabeposition"
          aria-valuetext={`${clock(time)} von ${clock(duration)}`}
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
          disabled={!duration}
        />
        <span className={styles.time}>{clock(duration)}</span>
        <button type="button" className={styles.small} onClick={() => skip(-15)} aria-label="15 Sekunden zurück">−15 s</button>
        <button type="button" className={styles.small} onClick={nextRate} aria-label={`Geschwindigkeit ${String(RATES[rate]).replace(".", ",")}-fach, ändern`}>
          {String(RATES[rate]).replace(".", ",")}×
        </button>
      </div>
    </div>
    <noscript><audio className={styles.fallback} src={src} controls preload="none" /></noscript>
  </section>;
}
