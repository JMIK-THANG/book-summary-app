import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Bookmark } from "lucide-react";
import "./ShortReads.css";

const DESKTOP_PAGE_SIZE = 6;
const MOBILE_PAGE_SIZE = 5;
const SAVED_KEY = "1989-saved-short-reads";

const ShortReads = ({ shortReads = [], isLoading, error }) => {
  const [pageSize] = useState(() =>
    window.matchMedia("(max-width: 600px)").matches
      ? MOBILE_PAGE_SIZE
      : DESKTOP_PAGE_SIZE,
  );
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [filter, setFilter] = useState(null);
  const [saved, setSaved] = useState(() => {
    try {
      const ids = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      return Array.isArray(ids) ? ids : [];
    } catch {
      return [];
    }
  });

  const categories = [...new Set(shortReads.map((item) => item.category?.trim()).filter(Boolean))];
  const filteredReads = shortReads.filter((item) => {
    if (filter === null) return true;
    if (filter === "saved") return saved.includes(String(item.id));
    return item.category?.trim() === filter.category;
  });
  const visibleShortReads = filteredReads.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReads.length;

  const selectFilter = (next) => {
    setFilter(next);
    setVisibleCount(pageSize);
  };

  const toggleSaved = (id) => {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    } catch {
      // The bookmark remains available for this visit.
    }
  };

  return (
    <main className="short-reads-page short-reads-index">
      <div className="short-reads-shell">
        <header className="short-reads-intro">
          <p className="short-reads-kicker">Words for the journey</p>
          <h1>Short <em>Reads</em></h1>
          <p className="short-reads-description">
            A quiet place for brief thoughts, reflections, and encouragement.
          </p>
        </header>

        <div className="reflection-filters" role="group" aria-label="Filter Short Reads">
          <button type="button" aria-pressed={filter === null} onClick={() => selectFilter(null)}>All</button>
          {categories.map((category) => (
            <button key={category} type="button" aria-pressed={filter?.category === category} onClick={() => selectFilter({ category })}>
              {category}
            </button>
          ))}
          <button type="button" aria-pressed={filter === "saved"} onClick={() => selectFilter("saved")}>Saved</button>
        </div>

        <section className="short-reads-list" aria-label="Short reads">
          {isLoading ? (
            <p className="short-reads-status">Loading Short Reads...</p>
          ) : error ? (
            <p className="short-reads-status" role="alert">
              {error}
            </p>
          ) : shortReads.length === 0 ? (
            <p className="short-reads-status">
              No Short Reads have been published yet.
            </p>
          ) : filteredReads.length === 0 ? (
            <p className="short-reads-status">No saved reflections yet.</p>
          ) : (
            visibleShortReads.map((shortRead) => (
              <article className="short-read" key={shortRead.id}>
                <Link
                  className="reflection-card-link"
                  to={`/short-reads/${shortRead.id}`}
                  aria-label={shortRead.title}
                >
                  <div className="reflection-thumbnail" aria-hidden="true">
                    {shortRead.image ? <img src={shortRead.image} alt="" loading="lazy" /> : <BookOpen size={28} />}
                  </div>
                  <div className="reflection-card-copy">
                    <header className="short-read-header">
                      {shortRead.category?.trim() && <p>{shortRead.category.trim()}</p>}
                      <h2>{shortRead.title}</h2>
                      {shortRead.author && <p className="short-read-author">By {shortRead.author}</p>}
                    </header>
                    <p className="short-read-content">{shortRead.content}</p>
                  </div>
                </Link>
                <button
                  type="button"
                  className="reflection-bookmark"
                  aria-label={`Bookmark ${shortRead.title}`}
                  aria-pressed={saved.includes(String(shortRead.id))}
                  onClick={() => toggleSaved(String(shortRead.id))}
                >
                  <Bookmark size={20} aria-hidden="true" />
                </button>
              </article>
            ))
          )}
        </section>

        {hasMore && !isLoading && !error && (
          <div className="short-reads-more">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + pageSize)}
            >
              Load more
            </button>
            <p>
              Showing {visibleShortReads.length} of {filteredReads.length}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShortReads;
