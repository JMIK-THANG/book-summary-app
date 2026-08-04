import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import "./CategorySection.css";

const normalizeCategory = (category = "") => {
  return category.toLowerCase().trim().replace(/\s+/g, "-");
};

const CategorySection = ({ books = [] }) => {
  const getBookCount = (categoryValue) => {
    return books.filter(
      (book) => normalizeCategory(book.category) === categoryValue,
    ).length;
  };

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
            const bookCount = getBookCount(category.value);
            const Icon = category.icon;

            return (
              <Link
                to={`/library?category=${category.value}`}
                className="category-card"
                key={category.value}
              >
                <div className="category-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={2} />
                </div>

                <div className="category-information">
                  <h3>{category.name}</h3>

                  <p>
                    {bookCount} {bookCount === 1 ? "summary" : "summaries"}
                  </p>
                </div>

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
