import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { NytContext } from "../../contexts/NytContext";
import { ToastContext } from "../../contexts/ToastContext";

/**
 * FavoriteButton Component
 * Toggles favorite status for a specific book
 * @param {string} uniqueId - Composite unique identifier (list-name + ISBN)
 */
export default function FavoriteButton({ uniqueId }) {
  const { data, setData } = useContext(NytContext);
  const toast = useContext(ToastContext);

  /**
   * Toggle favorite status for the book with matching uniqueId
   */
  const handleFavorite = () => {
    if (!data) return;

    setData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((list) => ({
        ...list,
        books: list.books.map((book) => 
          book.uniqueId === uniqueId 
            ? { ...book, isFavorite: !book.isFavorite }
            : book
        ),
      }));
    });
  };

  // Find the book by uniqueId across all lists
  const book = data?.flatMap((list) => list.books).find((b) => b.uniqueId === uniqueId);
  const isFavorite = book?.isFavorite;
  return (
    <button
      onClick={() => {
        handleFavorite();
        toast.showToast(
          `${isFavorite ? "Removed From Favorites" : "Added To Favorite"}`
        );
        toast.background(`${isFavorite ? "red" : ""}`);
      }}
      className={`${
        isFavorite ? "text-main" : "text-white"
      } absolute top-2 right-2 cursor-pointer p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-300`}
    >
      <FavoriteIcon />
    </button>
  );
}
