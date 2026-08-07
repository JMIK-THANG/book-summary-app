import { useMemo } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import "./CategorySection.css";

const normalizeCategory = (category) =>
  String(category ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

const CategorySection = ({ books = [] }) => {
  const categoryCounts = useMemo(() => {
    const counts = new Map();

    books.forEach((book) => {
      const categoryValue = normalizeCategory(book.category);

      if (!categoryValue) return;

      counts.set(
        categoryValue,
        (counts.get(categoryValue) || 0) + 1
      );
    });

    return counts;
  }, [books]);
console.log("Number of books:", books.length);

console.table(
  books.map((book) => ({
    title: book.title,
    category: book.category,
    normalizedCategory: normalizeCategory(book.category),
  }))
);

console.table(
  categories.map((category) => ({
    name: category.name,
    value: category.value,
    normalizedValue: normalizeCategory(category.value),
  }))
);

console.log(
  "Category counts:",
  Object.fromEntries(categoryCounts)
);
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
            const normalizedValue = normalizeCategory(category.value);

            const bookCount =
              categoryCounts.get(normalizedValue) || 0;

            const Icon = category.icon;

            return (
              <Link
                key={normalizedValue}
                to={`/library?category=${normalizedValue}`}
                className="category-card"
              >
                <div
                  className="category-icon"
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={2} />
                </div>

                <div className="category-information">
                  <h3>{category.name}</h3>

                  <p>
                    {bookCount}{" "}
                    {bookCount === 1
                      ? "summary"
                      : "summaries"}
                  </p>
                </div>

                <span
                  className="category-arrow"
                  aria-hidden="true"
                >
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