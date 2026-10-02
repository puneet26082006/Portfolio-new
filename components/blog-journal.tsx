"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiClock, FiRss, FiSearch, FiX } from "react-icons/fi";
import { PageIntro } from "./page-intro";
import {
  MEDIUM_POSTS,
  MEDIUM_PROFILE,
  type MediumPost,
} from "@/lib/medium-posts";

const topics = [...new Set(MEDIUM_POSTS.flatMap((post) => post.tags))];

function ArticleCard({
  post,
  featured = false,
}: {
  post: MediumPost;
  featured?: boolean;
}) {
  return (
    <a
      className={`journal-card${featured ? " journal-featured" : ""}`}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${post.title} — read on Medium (opens in a new tab)`}
    >
      <div className="journal-cover">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes={
            featured
              ? "(max-width: 700px) 100vw, 552px"
              : "(max-width: 700px) 100vw, 352px"
          }
          loading={featured ? "eager" : "lazy"}
        />
        <span className="journal-cover-link">
          <FiArrowUpRight aria-hidden /> Read on Medium
        </span>
      </div>
      <div className="journal-card-body">
        <div className="journal-meta">
          <span>{featured ? "Featured" : post.tags[0]}</span>
          <time dateTime={post.date}>{post.displayDate}</time>
        </div>
        {featured ? <h2>{post.title}</h2> : <h3>{post.title}</h3>}
        <p>{post.excerpt}</p>
        <div className="journal-card-bottom">
          <span title="Estimated reading time">
            <FiClock aria-hidden />
            {post.readMinutes} min read
          </span>
          {featured ? (
            <div className="journal-card-tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : (
            <span className="journal-read">
              Read More <FiArrowUpRight aria-hidden />
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

export function BlogJournal({ children }: { children?: ReactNode }) {
  const [topic, setTopic] = useState("All Posts");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchButton = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const posts = MEDIUM_POSTS.filter(
    (post) =>
      (topic === "All Posts" || post.tags.includes(topic)) &&
      `${post.title} ${post.excerpt} ${post.tags.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const showFeatured = topic === "All Posts" && !query.trim();
  const cards = showFeatured ? posts.slice(1) : posts;
  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    searchButton.current?.focus();
  }

  return (
    <main className="journal-page">
      <PageIntro
        eyebrow="The Journal"
        title="Thoughts & Ideas"
        accent="Ideas"
      />
      <section className="journal-container" aria-label="Published articles">
        <div className="journal-toolbar">
          <div
            className="journal-filters"
            role="group"
            aria-label="Filter articles by topic"
          >
            {["All Posts", ...topics].map((tag) => (
              <button
                type="button"
                key={tag}
                aria-pressed={topic === tag}
                onClick={() => setTopic(tag)}
              >
                {tag}
                {tag === "All Posts" && <span> ({MEDIUM_POSTS.length})</span>}
              </button>
            ))}
          </div>
          <button
            ref={searchButton}
            type="button"
            className="journal-icon-button"
            aria-label={searchOpen ? "Close search" : "Search articles"}
            aria-expanded={searchOpen}
            aria-controls="journal-search"
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
          >
            {searchOpen ? <FiX /> : <FiSearch />}
          </button>
          <a
            className="journal-icon-button"
            href="https://medium.com/feed/@puneetsaxena168"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium RSS feed"
          >
            <FiRss />
          </a>
        </div>
        {searchOpen && (
          <div id="journal-search" className="journal-search">
            <FiSearch aria-hidden />
            <input
              autoFocus
              aria-label="Search articles"
              placeholder="Search articles, ideas, and topics..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") closeSearch();
              }}
              type="search"
            />
          </div>
        )}
        <p className="sr-only" role="status">
          {posts.length} {posts.length === 1 ? "article" : "articles"} found
        </p>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {showFeatured && <ArticleCard post={posts[0]} featured />}
          <div className="journal-grid">
            {cards.map((post) => (
              <ArticleCard key={post.url} post={post} />
            ))}
          </div>
          {!posts.length && (
            <div className="journal-empty">
              <FiSearch />
              <h2>No articles found</h2>
              <p>Try another topic or a different search.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTopic("All Posts");
                }}
              >
                Show all posts
              </button>
            </div>
          )}
        </motion.div>
        {children}
        <div className="journal-medium">
          <p>More experiments. More lessons. Always learning.</p>
          <a href={MEDIUM_PROFILE} target="_blank" rel="noopener noreferrer">
            Follow my writing on Medium <FiArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  );
}
