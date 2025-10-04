import { useContext, useState, useMemo, useEffect } from "react";
import { NytContext } from "../contexts/NytContext";
import BookFilter from "../components/ui/BookFilter";
import BooksGrid from "../components/ui/BooksGrid";
import Pagination from "../components/ui/Pagination";
import Section from "../components/ui/AnimationSection";

// Pagination configuration
const BOOKS_PER_PAGE = 12;

/**
 * Categories Component
 * Displays all books with filtering, search, and pagination
 */
export default function Categories() {
  const { data } = useContext(NytContext);

  // Filter and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [listNameFilter, setListNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Collect all books from all lists
  const allBooks = useMemo(() => {
    if (!data) return [];

    const books = [];
    data.forEach((list) => {
      list.books.forEach((book) => {
        books.push({
          ...book,
          listName: list.list_name,
          uniqueId: book.uniqueId,
          isbn: book.primary_isbn13,
        });
      });
    });
    return books;
  }, [data]);

  // Reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, authorFilter, listNameFilter]);

  // Create unique authors list
  const uniqueAuthors = useMemo(() => {
    const authors = new Set();
    allBooks.forEach((book) => {
      if (book.author) {
        authors.add(book.author);
      }
    });
    return Array.from(authors).sort();
  }, [allBooks]);

  // Create unique list names list
  const uniqueListNames = useMemo(() => {
    const listNames = new Set();
    data?.forEach((list) => {
      if (list.list_name) {
        listNames.add(list.list_name);
      }
    });
    return Array.from(listNames).sort();
  }, [data]);

  // Apply filters to books
  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const matchesSearch =
        !searchTerm ||
        book.title?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAuthor = !authorFilter || book.author === authorFilter;

      const matchesListName =
        !listNameFilter || book.listName === listNameFilter;

      return matchesSearch && matchesAuthor && matchesListName;
    });
  }, [allBooks, searchTerm, authorFilter, listNameFilter]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);

  // Get books for current page
  const currentBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  // Reset page when filters change

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Section>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Books
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover a diverse collection of bestselling books
          </p>
        </div>

        {/* Filter Section */}
        <BookFilter
          uniqueAuthors={uniqueAuthors}
          uniqueListNames={uniqueListNames}
          filteredBooksCount={filteredBooks.length}
          totalBooksCount={allBooks.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
          listNameFilter={listNameFilter}
          setListNameFilter={setListNameFilter}
          setCurrentPage={setCurrentPage}
        />

        {/* Books Grid */}
        <BooksGrid books={currentBooks} />
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Section>
  );
}
