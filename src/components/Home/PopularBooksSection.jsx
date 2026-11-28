import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./PopularBooksSection.css"; 
export const PopularBooksSection = ({ mostViewedBooks }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpread, setIsSpread] = useState(false);
  const pendingMotion = useRef(null);
  const runningMotion = useRef([]);

  const setCardSpread = (list, spread) => {
    if (spread === isSpread) return;
    if (window.matchMedia("(min-width: 851px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      pendingMotion.current = Array.from(list.children, (card) => ({
        card,
        from: getComputedStyle(card).transform,
      }));
    }
    setIsSpread(spread);
  };

  useLayoutEffect(() => {
    if (!pendingMotion.current) return;
    runningMotion.current.forEach((animation) => animation.cancel());
    runningMotion.current = pendingMotion.current.map(({ card, from }) =>
      card.animate(
        [{ transform: from }, { transform: getComputedStyle(card).transform }],
        { duration: 700, easing: isSpread ? "cubic-bezier(.4,0,.2,1)" : "cubic-bezier(.8,0,.6,1)" },
      ),
    );
    pendingMotion.current = null;
  }, [isSpread]);

  useLayoutEffect(() => () => {
    runningMotion.current.forEach((animation) => animation.cancel());
  }, []);

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

        <div
          className="popular-list"
          data-spread={isSpread}
          onScroll={updateActiveCard}
          onPointerMove={(event) => {
            if (event.pointerType === "mouse" && event.target.closest(".popular-book-row")) {
              setCardSpread(event.currentTarget, true);
            }
          }}
          onPointerLeave={(event) => setCardSpread(event.currentTarget, false)}
        >
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
