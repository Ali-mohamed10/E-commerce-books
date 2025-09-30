import { useContext } from "react";
import { NytContext } from "../contexts/NytContext";
import Card from "../components/ui/Card";
import { SparklesText } from "../components/magicui/sparkles-text";
import ScrollCards from "../components/common/ScrollCards";
import Section from "../components/ui/AnimationSection";
export default function FavoriteBooks() {
  const { data } = useContext(NytContext);
  const favoriteBooks =
    data?.flatMap((list, listIndex) =>
      list.books
        .map((book, bookIndex) => ({ book, bookIndex }))
        .filter(({ book }) => book.isFavorite)
        .map(({ book, bookIndex }) => ({
          title: book.title,
          imgCover: book.book_image,
          author: book.author,
          price: book.price,
          listName: list.list_name,
          listIndex,
          bookIndex,
        }))
    ) || [];

  return (
    <Section>
      <div className="best-sellers container mx-auto min-h-screen py-16">
        <SparklesText className="flex justify-center text-3xl md:text-4xl font-bold mb-10 text-center">
          My Favorite Books
        </SparklesText>
        <ScrollCards>
          {favoriteBooks.length !== 0 ? (
            favoriteBooks.map((fav) => (
              <div
                key={`${fav.listIndex}-${fav.bookIndex}`}
                className="flex-none w-64 snap-start"
              >
                <Card
                  title={fav.title}
                  imgCover={fav.imgCover}
                  author={fav.author}
                  price={fav.price}
                  listName={fav.listName}
                  listIndex={fav.listIndex}
                  bookIndex={fav.bookIndex}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              You have no favorite books yet.
            </p>
          )}
        </ScrollCards>
      </div>
    </Section>
  );
}
