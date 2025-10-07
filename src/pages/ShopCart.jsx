import { useContext, useMemo, useCallback } from "react";
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
  const cartBooks = useMemo(
    () =>
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
      ) || [],
    [data]
  );

  // Calculate total price
  const totalPrice = useMemo(
    () =>
      cartBooks.reduce(
        (sum, item) =>
          sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
        0
      ),
    [cartBooks]
  );

  /**
   * Generate WhatsApp message and open chat
   */
  const whatsappText = useMemo(() => {
    const lines = cartBooks
      .map(
        (b) => `📚 ${b.title} - ${b.author} - Qty: ${b.quantity} - $${b.price}`
      )
      .join("\n");
    return `🛒 Order Details:\n\n${lines}\n\n💰 Total: $${totalPrice.toFixed(
      2
    )}\n\nHello! I would like to purchase these books.`;
  }, [cartBooks, totalPrice]);

  const whatsappUrl = useMemo(
    () =>
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`,
    [whatsappText]
  );

  const handleProceedToBuy = useCallback(() => {
    window.open(whatsappUrl, "_blank");
  }, [whatsappUrl]);

  /**
   * Increase quantity for a specific book in cart
   * @param {string} uniqueId - Book's unique identifier
   */
  const updateQuantity = useCallback(
    (uniqueId, delta) => {
      if (!data) return;
      setData((prev) => {
        if (!prev) return prev;
        const updated = prev.map((list) => ({
          ...list,
          books: list.books.map((book) => {
            if (book.uniqueId !== uniqueId) return book;
            const next = Math.max(1, (book.quantity ?? 1) + delta);
            return { ...book, quantity: next };
          }),
        }));
        localStorage.setItem("nytData", JSON.stringify(updated));
        return updated;
      });
    },
    [data, setData]
  );

  const increaseQuantity = useCallback((id) => updateQuantity(id, +1), [
    updateQuantity,
  ]);
  const decreaseQuantity = useCallback((id) => updateQuantity(id, -1), [
    updateQuantity,
  ]);

  return (
    <Section>
      <div className="shop-cart container mx-auto px-5 rounded-2xl py-12 bg-backgrounds">
        <h2 className="text-2xl md:text-3xl mb-2 font-bold">Shop Cart :</h2>
        {cartBooks.length !== 0 ? (
          cartBooks.map((cart) => (
            <Section key={cart.uniqueId}>
              <div>
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
