import { useState, useRef, useCallback, useEffect } from "react";
import HeartIcon from "./HeartIcon";
import styles from "./QuestionCard.module.css";

const MOOD_LINES = [
  "That button doesn't feel like it...",
  "Are you sure? Think again...",
  "It keeps running away from you.",
  "Maybe the heart knows better?",
  "The 'Yes' is right there, darling.",
  "Some choices make themselves.",
  "Perhaps fate is hinting...",
  "You're so close to perfect.",
  "It really doesn't want to be clicked.",
];

const FONT_SIZES = [14, 13.5, 13, 12.5, 12, 11.5, 11];

function getRandomPos(containerW, containerH, btnW, btnH) {
  const margin = 10;
  const maxX = containerW - btnW - margin;
  const maxY = containerH - btnH - margin;
  return {
    x: Math.floor(Math.random() * (maxX - margin)) + margin,
    y: Math.floor(Math.random() * Math.max(maxY, 1)) + margin / 2,
  };
}

export default function QuestionCard({ onYes, onEscape, containerRef }) {
  const [runs, setRuns] = useState(0);
  const [mood, setMood] = useState("");
  const [moodVisible, setMoodVisible] = useState(false);
  const [noPos, setNoPos] = useState({ x: null, y: null });
  const [noStyle, setNoStyle] = useState({});
  const [flee, setFlee] = useState(false);

  const noBtnRef = useRef(null);
  const rowRef = useRef(null);
  const prevPosRef = useRef({ x: 9999, y: 9999 });

  const spawnSparkles = useCallback(
    (btnEl) => {
      if (!containerRef.current || !btnEl) return;
      const btnRect = btnEl.getBoundingClientRect();
      const wrapRect = containerRef.current.getBoundingClientRect();
      const cx = btnRect.left - wrapRect.left + btnRect.width / 2;
      const cy = btnRect.top - wrapRect.top + btnRect.height / 2;
      const colors = ["#f9a8c9", "#e8d5f0", "#f4c2d8", "#d4537e"];

      for (let i = 0; i < 6; i++) {
        const dot = document.createElement("div");
        const angle = (i / 6) * Math.PI * 2;
        const dist = 18 + Math.random() * 22;
        Object.assign(dot.style, {
          position: "absolute",
          pointerEvents: "none",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          left: cx + "px",
          top: cy + "px",
          background: colors[i % colors.length],
          zIndex: 10,
          animation: "sparkPop 0.6s ease-out forwards",
          "--dx": Math.cos(angle) * dist + "px",
          "--dy": Math.sin(angle) * dist + "px",
        });
        containerRef.current.appendChild(dot);
        setTimeout(() => dot.remove(), 650);
      }
    },
    [containerRef],
  );

  const moveNo = useCallback(() => {
    const card = rowRef.current?.closest("[data-card]");
    const btnEl = noBtnRef.current;
    if (!card || !btnEl) return;

    const cardRect = card.getBoundingClientRect();
    const btnW = btnEl.offsetWidth;
    const btnH = btnEl.offsetHeight;

    let tries = 0;
    let pos;
    do {
      pos = getRandomPos(cardRect.width - 80, cardRect.height - 40, btnW, btnH);
      tries++;
    } while (
      tries < 15 &&
      Math.abs(pos.x - prevPosRef.current.x) < 40 &&
      Math.abs(pos.y - prevPosRef.current.y) < 20
    );

    prevPosRef.current = pos;

    spawnSparkles(btnEl);

    setRuns((r) => {
      const next = r + 1;
      onEscape?.(next);
      const si = Math.min(Math.floor(next / 2), FONT_SIZES.length - 1);
      const opacity = next > 4 ? Math.max(0.12, 1 - (next - 4) * 0.16) : 1;
      setNoStyle({
        fontSize: FONT_SIZES[si] + "px",
        padding: `${11 - si}px ${Math.max(10, 26 - si * 2)}px`,
        opacity,
      });
      const li = Math.min(next - 1, MOOD_LINES.length - 1);
      setMoodVisible(false);
      setTimeout(() => {
        setMood(MOOD_LINES[li]);
        setMoodVisible(true);
      }, 160);
      return next;
    });

    setNoPos(pos);
    setFlee(false);
    requestAnimationFrame(() => setFlee(true));
  }, [spawnSparkles]);

  useEffect(() => {
    const btn = noBtnRef.current;
    if (!btn) return;
    const onTouch = (e) => {
      e.preventDefault();
      moveNo();
    };
    btn.addEventListener("touchstart", onTouch, { passive: false });
    return () => btn.removeEventListener("touchstart", onTouch);
  }, [moveNo]);

  const noBtnPosition =
    noPos.x !== null
      ? { position: "absolute", left: noPos.x, top: noPos.y }
      : { position: "absolute", right: 0, top: 0 };

  return (
    <div className={styles.card} data-card>
      <p className={styles.eyebrow}>a little question for you</p>

      <div className={styles.heartRow}>
        <HeartIcon size={18} fill="#e8aac4" />
        <HeartIcon size={28} fill="#d4537e" className={styles.heartPulse} />
        <HeartIcon size={18} fill="#e8aac4" />
      </div>

      <h1 className={styles.question}>Will you be mine Divyanshi?</h1>
      <p className={styles.sub}>I promise I asked nicely.</p>

      <div className={styles.divider} />

      <div className={styles.btnRow} ref={rowRef}>
        <button className={styles.btnYes} onClick={onYes}>
          Yes, always
        </button>
        <button
          ref={noBtnRef}
          className={`${styles.btnNo} ${flee ? styles.flee : ""}`}
          style={{ ...noBtnPosition, ...noStyle }}
          onMouseEnter={moveNo}
          aria-label="No (but it runs away)"
        >
          No
        </button>
      </div>

      <p
        className={styles.mood}
        style={{ opacity: moodVisible ? 1 : 0 }}
        aria-live="polite"
      >
        {mood}
      </p>
    </div>
  );
}
