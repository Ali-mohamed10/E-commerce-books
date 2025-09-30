import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { NytContext } from "../../contexts/NytContext";
import { ToastContext } from "../../contexts/ToastContext";

export default function FavoriteButton({ listIndex, bookIndex }) {
  const { data, setData } = useContext(NytContext);
  const toast = useContext(ToastContext);

  const handleFavorite = () => {
    if (!data) return;
    setData((prevData) => {
      if (!prevData) return prevData;
      return prevData.map((list, li) => {
        if (li !== listIndex) return list;
        return {
          ...list,
          books: list.books.map((book, bi) => {
            if (bi !== bookIndex) return book;
            return { ...book, isFavorite: !book.isFavorite };
          }),
        };
      });
    });
  };
  const isFavorite = data?.[listIndex]?.books?.[bookIndex]?.isFavorite;
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
