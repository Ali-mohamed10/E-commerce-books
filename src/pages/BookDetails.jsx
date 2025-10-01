import { useParams } from "react-router-dom";
import { useContext } from "react";
import { NytContext } from "../contexts/NytContext";
import CartButton from "../components/ui/CartButton";
import FavoriteButton from "../components/ui/FavoriteButton";
import Section from "../components/ui/AnimationSection";
export default function BookDetails() {
  const { data } = useContext(NytContext);
  const { listId, bookId } = useParams();

  if (!data)
    return (
      <div className="container mx-auto flex justify-center items-center text-4xl h-80">
        Loading...
      </div>
    );

  const listIndex = Number(listId) - 1;
  const bookIndex = Number(bookId) - 1;
  const list = data?.[listIndex];
  const book = list?.books?.[bookIndex];

  if (!list || !book)
    return (
      <div className="container mx-auto flex justify-center items-center text-4xl h-80 font-bold">
        Not found
      </div>
    );

  return (
    <Section>
      <div className="container mx-auto relative p-5 flex flex-wrap gap-5 rounded-xl my-1.5 bg-gradient-to-r from-main to-[#a36c6c85] dark:to-black">
        <FavoriteButton listIndex={listIndex} bookIndex={bookIndex} />
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
          <CartButton listIndex={listIndex} bookIndex={bookIndex} />

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
