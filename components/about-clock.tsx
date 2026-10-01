"use client";
import { useEffect, useState } from "react";
const TIME_FORMAT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export function AboutClock() {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setDate(new Date());
    const first = setTimeout(update, 0);
    const timer = setInterval(update, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);
  const parts = date
    ? TIME_FORMAT.format(date).split(":").map(Number)
    : [10, 10, 0];
  const [hours, minutes, seconds] = parts;
  return (
    <div className="about-clock" data-reveal>
      <div className="clock-halo" />
      <svg
        viewBox="0 0 360 360"
        className="clock-face"
        role="img"
        aria-label={date ? "Jaipur time: " + parts.join(":") : "Jaipur clock"}
      >
        <defs>
          <linearGradient id="clock-metal" x2="1" y2="1">
            <stop stopColor="var(--clock-metal-edge)" />
            <stop offset=".5" stopColor="var(--clock-metal-light)" />
            <stop offset="1" stopColor="var(--clock-metal-edge)" />
          </linearGradient>
          <radialGradient id="clock-dial">
            <stop stopColor="var(--clock-face-center)" />
            <stop offset="1" stopColor="var(--clock-face-edge)" />
          </radialGradient>
          <filter id="clock-lume">
            <feGaussianBlur stdDeviation="2" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="180"
          cy="180"
          r="177"
          fill="url(#clock-dial)"
          stroke="url(#clock-metal)"
          strokeWidth="5"
        />
        <circle
          cx="180"
          cy="180"
          r="171"
          fill="none"
          stroke="var(--clock-ring)"
          strokeWidth="3"
        />
        {[...Array(60)].map((_, i) => (
          <line
            key={i}
            x1="180"
            y1={i % 5 ? 23 : 31}
            x2="180"
            y2="16"
            stroke={i % 5 ? "var(--clock-tick)" : "var(--clock-hand)"}
            strokeWidth={i % 5 ? 0.7 : 2.2}
            transform={"rotate(" + i * 6 + " 180 180)"}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <text
            key={i}
            x={Number((180 + 130 * Math.sin((i * Math.PI) / 6)).toFixed(4))}
            y={Number((185 - 130 * Math.cos((i * Math.PI) / 6)).toFixed(4))}
            textAnchor="middle"
            fill="var(--clock-label)"
            fontSize="11"
          >
            {i || 12}
          </text>
        ))}
        <text
          x="180"
          y="99"
          textAnchor="middle"
          fill="var(--clock-label)"
          fontSize="10"
          letterSpacing="3"
        >
          JAIPUR
        </text>
        <circle
          cx="119"
          cy="180"
          r="27"
          fill="var(--clock-inset)"
          stroke="var(--clock-ring)"
        />
        <circle cx="117" cy="176" r="14" fill="var(--clock-moon)" />
        <circle cx="125" cy="170" r="14" fill="var(--clock-inset)" />
        <text
          x="119"
          y="200"
          textAnchor="middle"
          fill="var(--clock-label)"
          fontSize="6"
          letterSpacing="2"
        >
          MOON
        </text>
        <rect
          x="222"
          y="166"
          width="39"
          height="27"
          rx="4"
          fill="var(--clock-inset)"
          stroke="var(--clock-ring)"
        />
        <text
          x="241"
          y="184"
          textAnchor="middle"
          fill="var(--clock-label)"
          fontSize="14"
        >
          {date
            ? new Intl.DateTimeFormat("en", {
                timeZone: "Asia/Kolkata",
                day: "numeric",
              }).format(date)
            : "—"}
        </text>
        <text
          x="180"
          y="256"
          textAnchor="middle"
          fill="var(--clock-label)"
          fontSize="9"
          letterSpacing="3"
        >
          {date
            ? new Intl.DateTimeFormat("en", {
                timeZone: "Asia/Kolkata",
                weekday: "short",
              })
                .format(date)
                .toUpperCase()
            : "INDIA"}
        </text>
        <g filter="url(#clock-lume)">
          <path
            d="M177 190 L178 96 L182 96 L183 190Z"
            fill="var(--clock-hand)"
            transform={"rotate(" + (hours * 30 + minutes / 2) + " 180 180)"}
          />
          <path
            d="M178.5 196 L179 51 L181 51 L181.5 196Z"
            fill="var(--clock-hand)"
            transform={"rotate(" + (minutes * 6 + seconds / 10) + " 180 180)"}
          />
        </g>
        <line
          x1="180"
          y1="207"
          x2="180"
          y2="40"
          stroke="#d4547e"
          strokeWidth="1.2"
          transform={"rotate(" + seconds * 6 + " 180 180)"}
        />
        <circle cx="180" cy="180" r="5" fill="var(--clock-metal-light)" />
        <circle cx="180" cy="180" r="2" fill="#d4547e" />
      </svg>
    </div>
  );
}
