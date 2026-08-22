import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { categories } from "../../data/categories";
import "./CategorySection.css";

const normalizeCategory = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const formatCategory = (value) =>
  String(value ?? "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const CategorySection = ({ books = [] }) => {
  // Calculate the number of books in each category
  const categoryCounts = new Map();

  books.forEach((book) => {
    const categoryKey = normalizeCategory(book.category);
    if (!categoryKey) return;

    const currentCount = categoryCounts.get(categoryKey) || 0;

    categoryCounts.set(categoryKey, currentCount + 1);
  });

  // Combine database counts with local category icons
  const categoryItems = Array.from(categoryCounts.entries()).map(
    ([categoryKey, bookCount]) => {
      const categoryMetadata = categories.find((category) => {
        const categoryValue =
          category.value || category.slug || category.name || category.key;

        return normalizeCategory(categoryValue) === categoryKey;
      });

      return {
        key: categoryKey,

        name:
          categoryMetadata?.key ||
          categoryMetadata?.name ||
          categoryMetadata?.title ||
          formatCategory(categoryKey),

        value: categoryMetadata?.value || categoryMetadata?.slug || categoryKey,

        icon: categoryMetadata?.icon || BookOpen,

        bookCount,
      };
    },
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
          {categoryItems.map((category) => {
            const CategoryIcon = category.icon;

            return (
              <Link
                key={category.key}
                to={`/library?category=${encodeURIComponent(category.value)}`}
                className="category-card"
                aria-label={`Browse ${category.name}: ${category.bookCount} ${
                  category.bookCount === 1 ? "summary" : "summaries"
                }`}
              >
                <div className="category-icon">
                  <CategoryIcon
                    size={26}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <h3>{category.name}</h3>

                <p>
                  {category.bookCount}{" "}
                  {category.bookCount === 1 ? "summary" : "summaries"}
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
