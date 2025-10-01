import { useContext } from "react";
import { NytContext } from "../contexts/NytContext";
import CartButton from "../components/ui/CartButton";
import Section from "../components/ui/AnimationSection";
import { useUser, SignInButton } from "@clerk/clerk-react";

export default function ShopCart() {
  const { data, setData } = useContext(NytContext);
  const { isSignedIn, user } = useUser();
  const cartBooks =
    data?.flatMap((list, listIndex) =>
      list.books
        .map((book, bookIndex) => ({ book, bookIndex }))
        .filter(({ book }) => book.isToCart)
        .map(({ book, bookIndex }) => ({
          title: book.title,
          imgCover: book.book_image,
          author: book.author,
          price: book.price,
          listName: list.list_name,
          listIndex,
          bookIndex,
          quantity: book.quantity ?? 1,
        }))
    ) || [];

  const totalPrice = cartBooks.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const handleProceedToBuy = () => {
    // إذا كان مسجل دخول، افتح رابط الواتساب مع تفاصيل الطلب
    const cartDetails = cartBooks
      .map(
        (book) =>
          `📚 ${book.title} - ${book.author} - Qty: ${book.quantity} - $${book.price}`
      )
      .join("\n");

    const message = `🛒 Order Details:\n\n${cartDetails}\n\n💰 Total: $${totalPrice}\n\nHello! I would like to purchase these books.`;
    const whatsappUrl = `https://wa.me/+201154167974?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const increaseQuantity = (listIndex, bookIndex) => {
    if (!data) return;
    setData((prevData) => {
      if (!prevData) return prevData;
      return prevData.map((list, li) => {
        if (li !== listIndex) return list;
        return {
          ...list,
          books: list.books.map((book, bi) => {
            if (bi !== bookIndex) return book;
            const current = book.quantity ?? 1;
            return { ...book, quantity: current + 1 };
          }),
        };
      });
    });
  };

  const decreaseQuantity = (listIndex, bookIndex) => {
    if (!data) return;
    setData((prevData) => {
      if (!prevData) return prevData;
      return prevData.map((list, li) => {
        if (li !== listIndex) return list;
        return {
          ...list,
          books: list.books.map((book, bi) => {
            if (bi !== bookIndex) return book;
            const current = book.quantity ?? 1;
            const next = Math.max(1, current - 1);
            return { ...book, quantity: next };
          }),
        };
      });
    });
  };

  return (
    <Section>
      <div className="shop-cart container mx-auto px-5 rounded-2xl py-12 bg-backgrounds">
        <h2 className="text-2xl md:text-3xl mb-2 font-bold">Shop Cart :</h2>
        {cartBooks.length !== 0 ? (
          cartBooks.map((cart) => (
            <Section>
              <div key={`${cart.listIndex}-${cart.bookIndex}`}>
                <div className="flex flex-wrap gap-5 mt-5 items-center">
                  <div>
                    <img
                      src={cart.imgCover}
                      alt={cart.title}
                      loading="lazy"
                      className="h-32 w-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl mb-1">{cart.title}</h3>
                    <span className="block text-second text-base md:text-2xl mb-8">
                      price : ${cart.price}
                    </span>
                    <CartButton
                      listIndex={cart.listIndex}
                      bookIndex={cart.bookIndex}
                    />
                  </div>
                  <div className="ml-auto">
                    <button
                      className={`text-white ml-2 py-0.5 px-1.5 border border-second bg-main ${
                        cart.quantity === 1 ? "opacity-30" : "cursor-pointer"
                      }`}
                      onClick={() =>
                        decreaseQuantity(cart.listIndex, cart.bookIndex)
                      }
                    >
                      -
                    </button>
                    <span className="ml-2">{cart.quantity}</span>
                    <button
                      className="text-white ml-2 py-0.5 px-1.5 border border-second bg-main cursor-pointer"
                      onClick={() =>
                        increaseQuantity(cart.listIndex, cart.bookIndex)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <hr className="mt-5" />
              </div>
            </Section>
          ))
        ) : (
          <>
            <p className="text-gray-600 text-center text-xl md:text-2xl mt-5">
              Your cart is empty
            </p>
          </>
        )}
        {cartBooks.length > 0 ? (
          <div className="flex flex-wrap justify-between gap-5 mt-5">
            <span className="text-green-600 dark:text-green-500 md:text-xl">
              Total Cart Price : ${totalPrice}
            </span>
            {isSignedIn ? (
              <button
                onClick={handleProceedToBuy}
                className="bg-green-700 px-4 py-1 rounded-xl font-bold cursor-pointer text-white hover:bg-green-800 transition-colors duration-200"
              >
                Proceed To Buy
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-green-700 px-4 py-1 rounded-xl font-bold cursor-pointer text-white hover:bg-green-800 transition-colors duration-200">
                  Sign In To Buy
                </button>
              </SignInButton>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </Section>
  );
}
