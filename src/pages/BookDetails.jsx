import { useParams } from "react-router-dom";
import { useContext } from "react";
import { NytContext } from "../contexts/NytContext";
import CartButton from "../components/ui/CartButton";
import FavoriteButton from "../components/ui/FavoriteButton";
import Section from "../components/ui/AnimationSection";

/**
 * BookDetails Component
 * Displays detailed information about a specific book
 * Finds book by ISBN from URL parameter
 */
export default function BookDetails() {
  const { data } = useContext(NytContext);
  const { isbn } = useParams();

  // Loading state
  if (!data) {
    return (
      <div className="container mx-auto flex justify-center items-center text-4xl h-80">
        Loading...
      </div>
    );
  }

  // Find book by ISBN across all lists
  let book = null;
  let list = null;

  for (const currentList of data) {
    const foundBook = currentList.books.find((b) => b.primary_isbn13 === isbn);
    if (foundBook) {
      book = foundBook;
      list = currentList;
      break;
    }
  }

  // Not found state
  if (!book || !list) {
    return (
      <div className="container mx-auto flex justify-center items-center text-4xl h-80 font-bold">
        Book Not Found
      </div>
    );
  }

  return (
    <Section>
      <div className="container mx-auto relative p-5 flex flex-wrap gap-5 rounded-xl my-1.5 bg-gradient-to-r from-main to-[#a36c6c85] dark:to-black">
        <FavoriteButton uniqueId={book.uniqueId} />
        <div>
          <img
            src={book.book_image}
            alt={book.title}
            loading="lazy"
            className="w-50 md:w-11/12"
          />
        </div>
        <div>
          <h3 className="text-xl md:text-3xl text-white font-bold mb-7">
            {book.title}
          </h3>
          <p className="text-white/70 mb-1">
            <span className="text-white/80 font-bold">Author : </span> by{" "}
            {book.author}
          </p>
          <p className="text-white font-bold mb-2 text-2xl">
            <span className="text-white/80 font-bold">Price : </span> $
            {book.price}
          </p>
          <p className="text-sm text-white/70 mb-8">
            <span className="text-white/80 font-bold">List Name : </span>{" "}
            {list.list_name}
          </p>
          <CartButton uniqueId={book.uniqueId} />

          <p className="text-white/70 mt-8 max-w-80">
            <span className="text-white/80 font-bold block mb-2">
              Description :{" "}
            </span>{" "}
            {book.description}
          </p>
        </div>
      </div>
    </Section>
  );
}
