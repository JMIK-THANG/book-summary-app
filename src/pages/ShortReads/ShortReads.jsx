import { useState } from "react";
import { Link } from "react-router-dom";
import "./ShortReads.css";

const DESKTOP_PAGE_SIZE =6;
const MOBILE_PAGE_SIZE = 5;

const ShortReads = ({ shortReads = [], isLoading, error }) => {
  const [pageSize] = useState(() =>
    window.matchMedia("(max-width: 600px)").matches
      ? MOBILE_PAGE_SIZE
      : DESKTOP_PAGE_SIZE,
  );
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const visibleShortReads = shortReads.slice(0, visibleCount);
  const hasMore = visibleCount < shortReads.length;

  return (
    <main className="short-reads-page">
      <div className="short-reads-shell">
        <header className="short-reads-intro">
          <p className="short-reads-kicker">Words for the journey</p>
          <h1>Short Reads</h1>
          <p className="short-reads-description">
            A quiet place for brief thoughts, reflections, and encouragement.
          </p>
        </header>

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
          ) : (
            visibleShortReads.map((shortRead) => (
              <article className="short-read" key={shortRead.id}>
                <span className="short-read-quote" aria-hidden="true">
                  “
                </span>

                <header className="short-read-header">
                  <p>Short reflection</p>
                  <h2>{shortRead.title}</h2>

                  {shortRead.author && (
                    <p className="short-read-author">By {shortRead.author}</p>
                  )}
                </header>

                <p className="short-read-content">{shortRead.content}</p>

                <Link
                  className="short-read-link"
                  to={`/short-reads/${shortRead.id}`}
                >
                  Read full reflection <span aria-hidden="true">→</span>
                </Link>
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
              Showing {visibleShortReads.length} of {shortReads.length}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShortReads;
