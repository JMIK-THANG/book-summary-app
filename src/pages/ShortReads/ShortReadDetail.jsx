import { Link, useParams } from "react-router-dom";
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
          <article className="short-read-detail" aria-labelledby="short-read-title">
            <header className="short-read-header">
              <h1 id="short-read-title">{shortRead.title}</h1>
              {shortRead.author && (
                <p className="short-read-author">By {shortRead.author}</p>
              )}
            </header>

            <div className="short-read-body">
              <p className="short-read-detail-content">{shortRead.content}</p>
            </div>
          </article>
        )}
      </div>
    </main>
  );
};

export default ShortReadDetail;
