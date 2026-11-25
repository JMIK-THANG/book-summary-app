import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroArtwork from "../../assets/hero-paper-ribbons.png";
import { categories } from "../../data/categories";
import "./HeroSection.css";

const categoryLinks = [
  ...categories.map(({ name, value, icon }) => ({
    name,
    icon,
    to: `/library?category=${encodeURIComponent(value)}`,
  })),
  { name: "All books", icon: BookOpen, to: "/library" },
];

function CategoryCarousel() {
  const shelfRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: true, position: 0 });

  useEffect(() => {
    const shelf = shelfRef.current;
    const updateEdges = () => {
      const distance = shelf.scrollWidth - shelf.clientWidth;
      setEdges({
        start: shelf.scrollLeft <= 1,
        end: distance - shelf.scrollLeft <= 1,
        position: distance > 0 ? Math.round(4 * shelf.scrollLeft / distance) : 0,
      });
    };
    const observer = new ResizeObserver(updateEdges);
    observer.observe(shelf);
    shelf.addEventListener("scroll", updateEdges, { passive: true });
    updateEdges();
    return () => {
      observer.disconnect();
      shelf.removeEventListener("scroll", updateEdges);
    };
  }, []);

  const move = (direction) => {
    const shelf = shelfRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    shelf.scrollBy({ left: direction * shelf.clientWidth * 0.65, behavior: reducedMotion ? "instant" : "smooth" });
  };

  return (
    <nav className="hero-categories" aria-label="Book categories">
      <button type="button" className="hero-category-arrow" aria-label="Scroll categories left" aria-controls="hero-category-shelf" disabled={edges.start} onClick={() => move(-1)}>
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <div className="hero-category-window" data-more={!edges.end}>
        <ul ref={shelfRef} id="hero-category-shelf" className="hero-category-shelf"
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }}>
          {categoryLinks.map(({ name, icon: Icon, to }) => (
            <li key={to}>
              <Link to={to} className="hero-category">
                <Icon size={19} aria-hidden="true" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className="hero-category-arrow" aria-label="Scroll categories right" aria-controls="hero-category-shelf" disabled={edges.end} onClick={() => move(1)}>
        <ChevronRight size={22} aria-hidden="true" />
      </button>
      <div className="hero-category-progress" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((dot) => (
          <span key={dot} data-current={dot === edges.position} />
        ))}
      </div>
    </nav>
  );
}

export const HeroSection = ({ counts = {}, books = [], navigation }) => {
  const subjectCount = new Set(
    books.map((book) => String(book.category ?? "").trim().toLowerCase()).filter(Boolean),
  ).size;

  return (
    <>
      <div className="home-masthead">
        <picture className="hero-artwork" aria-hidden="true">
          <img src={heroArtwork} alt="" width="1536" height="1024" fetchPriority="high" />
        </picture>
        {navigation}
        <section className="hero" aria-labelledby="home-hero-title">
        <div className="hero-content">
          <h1 id="home-hero-title">Explore Book Summaries</h1>
          <p>Discover meaningful ideas, expand your knowledge and grow — one book at a time.</p>

          <CategoryCarousel />
        </div>
        </section>
      </div>

      <section className="home-stats" aria-label="1989 library statistics">
        <p><strong>{counts.totalBooks || books.length || 0}</strong><span>book summaries</span></p>
        <p><strong>{counts.totalUsers || 0}</strong><span>registered readers</span></p>
        <p><strong>{subjectCount}</strong><span>subjects to explore</span></p>
      </section>
    </>
  );
};
