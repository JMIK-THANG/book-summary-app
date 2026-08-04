import { useMemo } from "react";

export const useHome = (books = []) => {
  const latestBooks = useMemo(() => {
    return books.slice(0, 4);
  }, [books]);

  const mostViewedBooks = useMemo(() => {
    return [...books]
      .sort((a, b) => Number(b.views ?? 0) - Number(a.views ?? 0))
      .slice(0, 3);
  }, [books]);

  const featuredBooks = useMemo(() => {
    const featuredBookIds = [40, 37, 35];
    console.log();

    const selectedBooks = featuredBookIds
      .map((id) => books.find((book) => Number(book.id) === id))
      .filter(Boolean);

    return selectedBooks.length === 3 ? selectedBooks : books.slice(0, 3);
  }, [books]);

  return {
    latestBooks,
    mostViewedBooks,
    featuredBooks,
  };
};
