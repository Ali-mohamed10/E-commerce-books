import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext } from "react";
import { NytContext } from "../../contexts/NytContext";
import { ToastContext } from "../../contexts/ToastContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function CartButton({ listIndex, bookIndex }) {
  const { data, setData } = useContext(NytContext);
  const toast = useContext(ToastContext);

  const handleAddToCart = () => {
    if (!data) return;
    setData((prevData) => {
      if (!prevData) return prevData;
      return prevData.map((list, li) => {
        if (li !== listIndex) return list;
        return {
          ...list,
          books: list.books.map((book, bi) => {
            if (bi !== bookIndex) return book;
            return { ...book, isToCart: !book.isToCart };
          }),
        };
      });
    });
  };
  const isToCart = data?.[listIndex]?.books?.[bookIndex]?.isToCart;
  return (
    <button
      className="flex items-center gap-2 justify-center text-sm md:text-base font-bold border-1 border-white bg-main/70 hover:bg-main hover:shadow-white shadow-xl mt-4 w-fit text-white py-1 px-4 rounded-xl transition duration-300 cursor-pointer"
      onClick={() => {
        handleAddToCart();
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
