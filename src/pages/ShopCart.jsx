import { useContext } from "react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { NytContext } from "../contexts/NytContext";
import CartButton from "../components/ui/CartButton";
import Section from "../components/ui/AnimationSection";

// WhatsApp contact number
const WHATSAPP_NUMBER = "+201154167974";

/**
 * ShopCart Component
 * Displays user's cart items with quantity controls and checkout
 */
export default function ShopCart() {
  const { data, setData } = useContext(NytContext);
  const { isSignedIn } = useUser();

  // Extract all books marked as "in cart" from all lists
  const cartBooks =
    data?.flatMap((list) =>
      list.books
        .filter((book) => book.isToCart)
        .map((book) => ({
          title: book.title,
          imgCover: book.book_image,
          author: book.author,
          price: book.price,
          listName: list.list_name,
          uniqueId: book.uniqueId,
          isbn: book.primary_isbn13,
          quantity: book.quantity ?? 1,
        }))
    ) || [];

  // Calculate total price
  const totalPrice = cartBooks.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  /**
   * Generate WhatsApp message and open chat
   */
  const handleProceedToBuy = () => {
    const cartDetails = cartBooks
      .map((book) => `📚 ${book.title} - ${book.author} - Qty: ${book.quantity} - $${book.price}`)
      .join("\n");

    const message = `🛒 Order Details:\n\n${cartDetails}\n\n💰 Total: $${totalPrice}\n\nHello! I would like to purchase these books.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  /**
   * Increase quantity for a specific book in cart
   * @param {string} uniqueId - Book's unique identifier
   */
  const increaseQuantity = (uniqueId) => {
    if (!data) return;

    setData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((list) => ({
        ...list,
        books: list.books.map((book) => {
          if (book.uniqueId !== uniqueId) return book;
          return { ...book, quantity: (book.quantity ?? 1) + 1 };
        }),
      }));
    });
  };

  /**
   * Decrease quantity for a specific book in cart (minimum 1)
   * @param {string} uniqueId - Book's unique identifier
   */
  const decreaseQuantity = (uniqueId) => {
    if (!data) return;

    setData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((list) => ({
        ...list,
        books: list.books.map((book) => {
          if (book.uniqueId !== uniqueId) return book;
          const newQuantity = Math.max(1, (book.quantity ?? 1) - 1);
          return { ...book, quantity: newQuantity };
        }),
      }));
    });
  };

  return (
    <Section>
      <div className="shop-cart container mx-auto px-5 rounded-2xl py-12 bg-backgrounds">
        <h2 className="text-2xl md:text-3xl mb-2 font-bold">Shop Cart :</h2>
        {cartBooks.length !== 0 ? (
          cartBooks.map((cart) => (
            <Section>
              <div key={cart.uniqueId}>
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
                    <CartButton uniqueId={cart.uniqueId} />
                  </div>
                  <div className="ml-auto">
                    <button
                      className={`text-white ml-2 py-0.5 px-1.5 border border-second bg-main ${
                        cart.quantity === 1 ? "opacity-30" : "cursor-pointer"
                      }`}
                      onClick={() => decreaseQuantity(cart.uniqueId)}
                    >
                      -
                    </button>
                    <span className="ml-2">{cart.quantity}</span>
                    <button
                      className="text-white ml-2 py-0.5 px-1.5 border border-second bg-main cursor-pointer"
                      onClick={() => increaseQuantity(cart.uniqueId)}
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
