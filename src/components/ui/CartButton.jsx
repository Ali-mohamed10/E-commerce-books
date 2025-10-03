import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useContext } from "react";
import { NytContext } from "../../contexts/NytContext";
import { ToastContext } from "../../contexts/ToastContext";

/**
 * CartButton Component
 * Toggles cart status for a specific book
 * @param {string} uniqueId - Composite unique identifier (list-name + ISBN)
 */
export default function CartButton({ uniqueId }) {
  const { data, setData } = useContext(NytContext);
  const toast = useContext(ToastContext);

  // --- 🔹 Toggle Cart ---
  const toggleCart = (uniqueId) => {
    setData((prevData) => {
      if (!prevData) return prevData;
      const updated = prevData.map((list) => ({
        ...list,
        books: list.books.map((book) =>
          book.uniqueId === uniqueId
            ? { ...book, isToCart: !book.isToCart }
            : book
        ),
      }));
      localStorage.setItem("nytData", JSON.stringify(updated)); // persist
      return updated;
    });
  };

  // Find the book by uniqueId across all lists
  const book = data
    ?.flatMap((list) => list.books)
    .find((b) => b.uniqueId === uniqueId);
  const isToCart = book?.isToCart;
  return (
    <button
      className="flex items-center gap-2 justify-center text-sm md:text-base font-bold border-1 border-white bg-main/70 hover:bg-main hover:shadow-white shadow-xl mt-4 w-fit text-white py-1 px-4 rounded-xl transition duration-300 cursor-pointer"
      onClick={() => {
        toggleCart(uniqueId);
        toast.showToast(`${isToCart ? "Removed From Cart" : "Added To Cart"}`);
        toast.background(`${isToCart ? "red" : ""}`);
      }}
    >
      <span>
        {isToCart ? <DeleteForeverIcon /> : <ShoppingCartOutlinedIcon />}
      </span>
      {isToCart ? "Remove From Cart" : "Add to Cart"}
    </button>
  );
}
