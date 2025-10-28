import { useContext, useMemo } from "react";
import { NytContext } from "../contexts/NytContext";
import Card from "../components/ui/Card";
import ScrollCards from "../components/common/ScrollCards";
import Section from "../components/ui/AnimationSection";

/**
 * FavoriteBooks Component
 * Displays all books marked as favorites by the user
 */
export default function FavoriteBooks() {
  const { data } = useContext(NytContext);

  // Extract all favorite books from all lists
  const favoriteBooks = useMemo(
    () =>
      data?.flatMap((list) =>
        list.books
          .filter((book) => book.isFavorite)
          .map((book) => ({
            title: book.title,
            imgCover: book.book_image,
            author: book.author,
            price: book.price,
            listName: list.list_name,
            uniqueId: book.uniqueId,
            isbn: book.primary_isbn13,
          }))
      ) || [],
    [data]
  );

  return (
    <Section>
      <div className="best-sellers container mx-auto min-h-screen py-16">
        <h2 className="flex justify-center text-3xl md:text-4xl font-bold mb-10 text-center">
          My Favorite Books
        </h2>
        <ScrollCards>
          {favoriteBooks.length !== 0 ? (
            favoriteBooks.map((fav) => (
              <div key={fav.uniqueId} className="flex-none w-64 snap-start">
                <Card
                  title={fav.title}
                  imgCover={fav.imgCover}
                  author={fav.author}
                  price={fav.price}
                  listName={fav.listName}
                  uniqueId={fav.uniqueId}
                  isbn={fav.isbn}
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
