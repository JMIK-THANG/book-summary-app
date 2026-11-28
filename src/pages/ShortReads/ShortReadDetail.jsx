import { Link, useParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import "./ShortReads.css";

const ShortReadDetail = ({ shortReads = [], isLoading, error }) => {
  const { id } = useParams();
  const shortRead = shortReads.find((item) => String(item.id) === id);

  return (
    <main className="short-reads-page short-read-detail-page">
      <div className="short-reads-shell short-read-detail-shell">
        <Link className="short-reads-back" to="/short-reads">
          ‹ Back to Short Reads
        </Link>

        {isLoading ? (
          <p className="short-reads-status">Loading Short Read...</p>
        ) : error ? (
          <p className="short-reads-status" role="alert">{error}</p>
        ) : !shortRead ? (
          <p className="short-reads-status">This Short Read could not be found.</p>
        ) : (
          <article className="short-read-detail">
            <header className="short-read-header">
              <p className="short-read-detail-label">
                <BookOpen size={17} aria-hidden="true" />
                Short reflection
              </p>
              <h1>{shortRead.title}</h1>
              {shortRead.author && (
                <p className="short-read-author">By {shortRead.author}</p>
              )}
            </header>

            <section className="short-read-body" aria-labelledby="short-read-body-title">
              <h2 id="short-read-body-title">
                <BookOpen aria-hidden="true" />
                <span>Reflection</span>
              </h2>
              <p className="short-read-detail-content">{shortRead.content}</p>
            </section>
          </article>
        )}
      </div>
    </main>
  );
};

export default ShortReadDetail;
