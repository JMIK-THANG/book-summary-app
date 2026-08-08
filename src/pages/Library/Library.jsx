import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { categories } from "../../data/categories";
import "./Library.css";

const BOOKS_PER_PAGE = 10;

const normalizeText = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const normalizeCategory = (value) => normalizeText(value).replace(/\s+/g, "-");

const formatCategory = (value) =>
  String(value ?? "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const Library = ({ books = [], isLoading = false }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const selectedCategory = searchParams.get("category") || "";

  const authors = useMemo(() => {
    const availableAuthors = books
      .map((book) => book.author?.trim())
      .filter(Boolean);

    return [...new Set(availableAuthors)].sort((firstAuthor, secondAuthor) =>
      firstAuthor.localeCompare(secondAuthor),
    );
  }, [books]);

  const filteredBooks = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return books.filter((book) => {
      const title = normalizeText(book.title);
      const author = normalizeText(book.author);

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        author.includes(normalizedSearch);

      const matchesAuthor =
        !selectedAuthor || author === normalizeText(selectedAuthor);

      const matchesCategory =
        !selectedCategory ||
        normalizeCategory(book.category) ===
          normalizeCategory(selectedCategory);

      return matchesSearch && matchesAuthor && matchesCategory;
    });
  }, [books, search, selectedAuthor, selectedCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / BOOKS_PER_PAGE),
  );

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;

    return filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedAuthor, selectedCategory]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const clearCategory = () => {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.delete("category");
    setSearchParams(nextSearchParams);
  };

  const currentLibraryLocation = `${location.pathname}${location.search}`;

  if (isLoading) {
    return (
      <main className="library">
        <div className="library-header">
          <p>Loading books...</p>
        </div>
      </main>
    );
  }
  const handleCategoryChange = (event) => {
    const category = event.target.value;

    const nextSearchParams = new URLSearchParams(searchParams);

    if (category) {
      nextSearchParams.set("category", category);
    } else {
      nextSearchParams.delete("category");
    }

    setSearchParams(nextSearchParams);
  };

  return (
    <main className="library">
      <header className="library-header">
        <div className="library-title-row">
          <div>
            <h1>
              {selectedCategory ? formatCategory(selectedCategory) : "Library"}
            </h1>

            <p className="library-count">
              {filteredBooks.length}{" "}
              {filteredBooks.length === 1 ? "summary" : "summaries"}
            </p>
          </div>

          {selectedCategory && (
            <button
              type="button"
              className="clear-category-btn"
              onClick={clearCategory}
            >
              View All Books
            </button>
          )}
        </div>
        <div className="library-controls">
  {/* Full-width search */}
  <label className="control-box search-control">
    <span className="control-icon" aria-hidden="true">
      ⌕
    </span>

    <input
      type="search"
      value={search}
      onChange={(event) =>
        setSearch(event.target.value)
      }
      placeholder="Search title or author..."
      aria-label="Search by title or author"
    />
  </label>

  {/* Author dropdown */}
  <label className="control-box filter-control">
    <span className="control-icon" aria-hidden="true">
      ◇
    </span>

    <select
      value={selectedAuthor}
      onChange={(event) =>
        setSelectedAuthor(event.target.value)
      }
      aria-label="Filter by author"
    >
      <option value="">All authors</option>

      {authors.map((author) => (
        <option key={author} value={author}>
          {author}
        </option>
      ))}
    </select>
  </label>

  {/* Category dropdown */}
  <label className="control-box filter-control">
    <span className="control-icon" aria-hidden="true">
      ◫
    </span>

    <select
      value={normalizeCategory(selectedCategory)}
      onChange={handleCategoryChange}
      aria-label="Filter by category"
    >
      <option value="">All categories</option>

      {categories.map((category) => {
        const categoryTitle =
          category.title ||
          category.name ||
          category.slug ||
          category.value;

        const categoryValue = normalizeCategory(
          category.slug ||
            category.value ||
            categoryTitle,
        );

        return (
          <option
            key={categoryValue}
            value={categoryValue}
          >
            {categoryTitle}
          </option>
        );
      })}
    </select>
  </label>
</div>
      </header>

      {paginatedBooks.length > 0 ? (
        <>
          <section className="book-list">
            {paginatedBooks.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                state={{
                  from: currentLibraryLocation,
                }}
                className="book-card"
              >
                {book.image ? (
                  <img
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="book-image-placeholder">No cover</div>
                )}

                <div className="book-info">
                  <h2>{book.title}</h2>

                  <h4>{book.author || "Unknown author"}</h4>

                  <p>{book.summary || "No summary is currently available."}</p>

                  <div className="read-more">
                    <span>Read Summary</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </section>

          {totalPages > 1 && (
            <nav className="library-pagination" aria-label="Library pages">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                Previous
              </button>

              <div className="pagination-numbers">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={currentPage === page ? "active" : ""}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
              >
                Next
              </button>
            </nav>
          )}
        </>
      ) : (
        <div className="no-books">
          <h2>No books found</h2>

          <p>Try another title, author, or category.</p>

          {selectedCategory && (
            <button
              type="button"
              className="clear-category-btn"
              onClick={clearCategory}
            >
              View All Books
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default Library;
