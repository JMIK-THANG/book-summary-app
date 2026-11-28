import { useState } from "react";
import { Link } from "react-router-dom";
import "./PopularBooksSection.css"; 
export const PopularBooksSection = ({ mostViewedBooks }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveCard = (event) => {
    const list = event.currentTarget;
    const first = list.firstElementChild;
    if (!first || list.scrollWidth <= list.clientWidth) return;

    const cards = Array.from(list.children);
    if (list.scrollWidth - list.clientWidth - list.scrollLeft <= 1) {
      setActiveIndex(cards.length - 1);
      return;
    }

    const nearest = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - first.offsetLeft - list.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity });
    setActiveIndex(nearest.index);
  };

  if (!mostViewedBooks || mostViewedBooks.length === 0) {
    return null;
  }
  return (
    <section className="popular-section" aria-labelledby="most-read-title">
      <div className="section-container">
        <div className="popular-heading">
          <h2 id="most-read-title">Most Read</h2>
        </div>

        <div className="popular-list" onScroll={updateActiveCard}>
          {mostViewedBooks.map((book, index) => (
            <Link
              to={`/library/${book.id}`}
              key={book.id}
              className="popular-book-row"
              data-in-view={activeIndex === index}
            >
              <div className="popular-row-information">
                <h3>{book.title}</h3>
                {book.summary && <p className="popular-excerpt">{book.summary}</p>}
              </div>
              {book.author && (
                <p className="popular-author">By {String(book.author).replace(/^by\s+/i, "")}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
