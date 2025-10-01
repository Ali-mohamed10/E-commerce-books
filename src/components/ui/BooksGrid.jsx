import React from "react";
import Card from "./Card";
import EmptyState from "./EmptyState";

export default function BooksGrid({ books, onClearFilters }) {
  if (!books || books.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {books.map((book) => (
        <div key={book.uniqueId} className="flex justify-center">
          <Card
            title={book.title}
            imgCover={book.book_image}
            author={book.author}
            price={book.price}
            listName={book.listName}
            uniqueId={book.uniqueId}
            isbn={book.isbn}
          />
        </div>
      ))}
    </div>
  );
}
