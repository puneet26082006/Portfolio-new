"use client";
import { useEffect, useState, type CSSProperties } from "react";
import { FaGithub, FaUsers, FaBook, FaStar } from "react-icons/fa";
import { ReferenceSection } from "./reference-ui";
import { CountUp } from "./ui";
type Day = { date: string; count: number; level: number };
type Activity = { contributions: Day[]; total: Record<string, number> };
type Stats = { followers: number; repos: number; stars: number | null };
const USER = "puneet26082006";
const COLORS = Array.from(
  { length: 5 },
  (_, index) => `var(--contribution-${index})`,
);
export function GitHubActivity() {
  const [activity, setActivity] = useState<Activity | null>(null),
    [stats, setStats] = useState<Stats | null>(null),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(
      "https://github-contributions-api.jogruber.de/v4/" + USER + "?y=last",
      { signal },
    )
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((data: Activity) => {
        if (!Array.isArray(data.contributions) || !data.contributions.length)
          throw Error();
        setActivity(data);
      })
      .catch(() => {
        if (!signal.aborted) setFailed(true);
      });
    (async () => {
      try {
        const r = await fetch("https://api.github.com/users/" + USER, {
          signal,
        });
        if (!r.ok) throw Error();
        const user = await r.json();
        let stars = 0;
        let complete = true;
        for (let page = 1; page <= Math.ceil(user.public_repos / 100); page++) {
          const repos = await fetch(
            "https://api.github.com/users/" +
              USER +
              "/repos?per_page=100&page=" +
              page,
            { signal },
          );
          if (!repos.ok) {
            complete = false;
            break;
          }
          const list = await repos.json();
          stars += list.reduce(
            (sum: number, repo: { stargazers_count: number }) =>
              sum + repo.stargazers_count,
            0,
          );
        }
        if (!signal.aborted)
          setStats({
            followers: user.followers,
            repos: user.public_repos,
            stars: complete ? stars : null,
          });
      } catch {}
    })();
    return () => controller.abort();
  }, []);
  const days = activity?.contributions ?? [];
  const start = days.length
    ? new Date(days[0].date + "T00:00:00Z").getUTCDay()
    : 0;
  const weeks = Math.ceil((start + days.length) / 7);
  const width = weeks * 17;
  const total = days.reduce((n, day) => n + day.count, 0);
  const cards = [
    {
      label: "Followers",
      value: stats?.followers,
      icon: FaUsers,
      color: "#ec4899",
    },
    {
      label: "Repositories",
      value: stats?.repos,
      icon: FaBook,
      color: "#14b8a6",
    },
    {
      label: "GitHub Stars",
      value: stats?.stars,
      icon: FaStar,
      color: "#f59e0b",
    },
  ];
  return (
    <ReferenceSection id="github" title="Code & Contributions">
      <div className="github-layout">
        <div className="github-calendar-area" data-reveal>
          <div className="github-header">
            <span className="github-mark">
              <FaGithub />
            </span>
            <div>
              <a
                href={"https://github.com/" + USER}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{USER}
              </a>
              <p>Contribution activity on GitHub</p>
            </div>
            {activity && (
              <div className="github-total">
                <strong className="gradient-text">
                  {total.toLocaleString()}
                </strong>
                <span>contributions</span>
              </div>
            )}
          </div>
          {activity ? (
            <>
              <div
                className="contribution-calendar"
                role="region"
                aria-label="GitHub contribution calendar"
              >
                <svg
                  viewBox={`0 0 ${width} 143`}
                  width="100%"
                  preserveAspectRatio="xMidYMin meet"
                  role="img"
                  aria-label={total + " GitHub contributions in the last year"}
                >
                  {days.map((day, i) => {
                    const index = i + start,
                      x = Math.floor(index / 7) * 17,
                      y = (index % 7) * 17 + 23;
                    const date = new Date(day.date + "T00:00:00Z");
                    return (
                      <g key={day.date}>
                        {date.getUTCDate() <= 7 && date.getUTCDay() === 0 && (
                          <text
                            x={x}
                            y="12"
                            fontSize="11"
                            fill="var(--color-muted)"
                          >
                            {date.toLocaleDateString("en", {
                              month: "short",
                              timeZone: "UTC",
                            })}
                          </text>
                        )}
                        <rect
                          x={x}
                          y={y}
                          width="13"
                          height="13"
                          rx="2"
                          fill={COLORS[Math.min(4, Math.max(0, day.level))]}
                        >
                          <title>
                            {day.count + " contributions on " + day.date}
                          </title>
                        </rect>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="calendar-footer">
                <span>
                  {total.toLocaleString()} contributions in the last year
                </span>
                <span className="calendar-legend">
                  Less{" "}
                  {COLORS.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}{" "}
                  More
                </span>
              </div>
            </>
          ) : (
            <div className="calendar-placeholder" role="status">
              {failed ? (
                <>
                  <p>Contribution activity is temporarily unavailable.</p>
                  <a
                    href={"https://github.com/" + USER + "?tab=overview"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View contributions on GitHub ↗
                  </a>
                </>
              ) : (
                "Loading GitHub activity…"
              )}
            </div>
          )}
        </div>
        <div className="github-stats">
          {cards.map((card) => (
            <div
              key={card.label}
              data-reveal
              className="github-stat-card"
              style={{ "--stat-accent": card.color } as CSSProperties}
            >
              <card.icon style={{ color: card.color }} />
              {card.value != null ? (
                <CountUp to={card.value} className="github-stat-number" />
              ) : (
                <span className="github-stat-number" aria-label="Unavailable">
                  —
                </span>
              )}
              <span>{card.label}</span>
            </div>
          ))}
        </div>
      </div>
    </ReferenceSection>
  );
}
