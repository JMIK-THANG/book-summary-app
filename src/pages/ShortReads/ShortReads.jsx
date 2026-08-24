import { Link } from "react-router-dom";
import "./ShortReads.css";

const ShortReads = ({ shortReads = [], isLoading, error }) => {
  return (
    <main className="short-reads-page">
      <div className="short-reads-shell">
        <Link className="short-reads-back" to="/library">
          ‹ Back to Library
        </Link>

        <header className="short-reads-intro">
          <p className="short-reads-kicker">Words for the journey</p>
          <h1>Short Reads</h1>
          <p className="short-reads-description">
            A quiet place for brief thoughts, reflections, and
            encouragement.
          </p>
        </header>

        <section className="short-reads-list" aria-label="Short reads">
          {isLoading ? (
            <p className="short-reads-status">Loading Short Reads...</p>
          ) : error ? (
            <p className="short-reads-status" role="alert">{error}</p>
          ) : shortReads.length === 0 ? (
            <p className="short-reads-status">No Short Reads have been published yet.</p>
          ) : shortReads.map((shortRead) => (
            <article className="short-read" key={shortRead.id}>
              <span className="short-read-quote" aria-hidden="true">
                “
              </span>

              <header className="short-read-header">
                <p>Short reflection</p>
                <h2>{shortRead.title}</h2>

                {shortRead.author && (
                  <p className="short-read-author">
                    By {shortRead.author}
                  </p>
                )}
              </header>

              <div className="short-read-divider" aria-hidden="true">
                <span />
              </div>

              <p className="short-read-content">{shortRead.content}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default ShortReads;
