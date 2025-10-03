import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const NytContext = createContext({});

export default function NytProvider({ children }) {
  const [data, setData] = useState(null);
  const [booksRanks, setBooksRanks] = useState([]);

  const normalizeLists = (lists) => {
    if (!Array.isArray(lists)) return null;

    return lists.map((list) => ({
      ...list,
      books: (list.books || []).map((book) => ({
        ...book,
        uniqueId: `${list.list_name_encoded || list.list_name}-${
          book.primary_isbn13
        }`,
        listNameEncoded: list.list_name_encoded || list.list_name,
        isFavorite:
          typeof book.isFavorite === "boolean" ? book.isFavorite : false,
        isToCart: typeof book.isToCart === "boolean" ? book.isToCart : false,
        price: typeof book.price === "number" ? book.price : 20,
        quantity:
          typeof book.quantity === "number" && book.quantity > 0
            ? book.quantity
            : 1,
      })),
    }));
  };

  const fetchBooks = () => {
    axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=lG9zL03N1ibBrR55GgSg52I3CQ4011wx"
      )
      .then((response) => {
        const normalized = normalizeLists(response.data.results.lists);
        if (!normalized) return;

        const newRanks = normalized.map((list) =>
          list.books.map((book) => book.rank)
        );

        const isDifferent =
          booksRanks.length !== newRanks.length ||
          booksRanks.some(
            (listRanks, i) =>
              listRanks.length !== newRanks[i].length ||
              listRanks.some((rank, j) => rank !== newRanks[i][j])
          );

        if (isDifferent) {
          setBooksRanks(newRanks);
          // Merge normalized data with previous state/localStorage to preserve isFavorite, isToCart, quantity
          setData((prev) => {
            const base = Array.isArray(prev) ? prev : (() => {
              const storedStr = localStorage.getItem("nytData");
              try {
                return storedStr ? JSON.parse(storedStr) : null;
              } catch {
                return null;
              }
            })();

            // Build a map from previous items for quick lookup by uniqueId
            const prevMap = new Map();
            if (Array.isArray(base)) {
              base.forEach((list) => {
                (list.books || []).forEach((b) => {
                  prevMap.set(b.uniqueId, b);
                });
              });
            }

            const merged = normalized.map((list) => ({
              ...list,
              books: (list.books || []).map((book) => {
                const old = prevMap.get(book.uniqueId);
                if (!old) return book;
                return {
                  ...book,
                  isFavorite: typeof old.isFavorite === "boolean" ? old.isFavorite : book.isFavorite,
                  isToCart: typeof old.isToCart === "boolean" ? old.isToCart : book.isToCart,
                  quantity:
                    typeof old.quantity === "number" && old.quantity > 0
                      ? old.quantity
                      : book.quantity,
                };
              }),
            }));

            localStorage.setItem("nytData", JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // Load from localStorage first
    const stored = localStorage.getItem("nytData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
      } catch {
        console.error("Error parsing localStorage data");
      }
    }

    fetchBooks();
    const interval = setInterval(fetchBooks, 60000);
    return () => clearInterval(interval);
  }, [booksRanks]);

  return (
    <NytContext.Provider value={{ data, setData }}>
      {children}
    </NytContext.Provider>
  );
}
