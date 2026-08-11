import { useMemo } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import "./CategorySection.css";

const normalizeCategory = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const CategorySection = ({ books = [] }) => {
  const categoryCounts = useMemo(() => {
    const counts = new Map();

    books.forEach((book) => {
      const categoryKey = normalizeCategory(book.category);

      if (!categoryKey) return;

      counts.set(categoryKey, (counts.get(categoryKey) || 0) + 1);
    });

    return counts;
  }, [books]);

  return (
    <section className="category-section">
      <div className="section-container">
        <div className="category-heading">
          <div>
            <p className="section-label">BROWSE BY CATEGORY</p>

            <h2>Find ideas that interest you</h2>

            <p>
              Explore summaries organized by the topics you want to understand.
            </p>
          </div>

          <Link to="/library" className="text-link">
            Browse all books
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => {
            const categoryKey = category.key;
            const categoryValue = category.value;
            const CategoryIcon = category.icon;

            const bookCount =
              categoryCounts.get(normalizeCategory(categoryValue)) || 0;

            return (
              <Link
                key={categoryValue}
                to={`/library?category=${encodeURIComponent(categoryValue)}`}
                className="category-card"
                aria-label={`Browse ${categoryKey}: ${bookCount} ${
                  bookCount === 1 ? "summary" : "summaries"
                }`}
              >
                <div className="category-icon">
                  {CategoryIcon && (
                    <CategoryIcon
                      size={26}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <h3>{categoryKey}</h3>

                <p>
                  {bookCount} {bookCount === 1 ? "summary" : "summaries"}
                </p>

                <span className="category-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
