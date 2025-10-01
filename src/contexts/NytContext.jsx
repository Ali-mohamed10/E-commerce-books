import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const NytContext = createContext({});

export default function NytProvider({ children }) {
  const [data, setData] = useState(null);
  const [firstBooks, setFirstBooks] = useState([]);

  const normalizeLists = (lists) => {
    if (!Array.isArray(lists)) return null;
    return lists.map((list) => ({
      ...list,
      books: (list.books || []).map((book) => ({
        ...book,
        // Add composite unique ID for books that appear in multiple lists
        uniqueId: `${list.list_name_encoded || list.list_name}-${book.primary_isbn13}`,
        listNameEncoded: list.list_name_encoded || list.list_name,
        // Ensure global defaults accessible across components
        isFavorite: Boolean(book.isFavorite),
        isToCart: Boolean(book.isToCart),
        price: 20,
        quantity:
          typeof book.quantity === "number" && book.quantity > 0
            ? book.quantity
            : 1,
      })),
    }));
  };

  // Initialize from localStorage if available
  const fetchFirstBooks = () => {
    try {
      const stored = localStorage.getItem("nytData");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) {
          const normalized = normalizeLists(parsed);
          if (normalized) setData(normalized);
          return; // Skip initial fetch if we have stored data
        }
      }
    } catch (e) {
      // If parsing fails, continue to fetch
      console.error("Failed to parse stored data:", e);
    }

    let isMounted = true;
    axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=lG9zL03N1ibBrR55GgSg52I3CQ4011wx"
      )
      .then((response) => {
        if (isMounted) {
          const normalized = normalizeLists(response.data.results.lists);
          setData(normalized);
          const firstBooksArray = normalized.map((list) => list.books[0]);
          setFirstBooks((prevBooks) => {
            const isDifferent =
              prevBooks.length !== firstBooksArray.length ||
              prevBooks.some(
                (book, i) =>
                  book.primary_isbn13 !== firstBooksArray[i].primary_isbn13
              );

            return isDifferent ? firstBooksArray : prevBooks;
          });
        }
      })
      .catch((error) => {
        if (isMounted) setData(null);
        console.error("Error fetching data:", error);
      });
    return () => {
      isMounted = false;
    };
  };
  // استدعاء أول مرة + تكرار كل 60 ثانية
  useEffect(() => {
    fetchFirstBooks();
    const interval = setInterval(fetchFirstBooks, 60000); // كل دقيقة

    return () => clearInterval(interval);
  }, [firstBooks]);

  // Persist to localStorage on changes
  useEffect(() => {
    try {
      if (data !== null) {
        localStorage.setItem("nytData", JSON.stringify(data));
      }
    } catch (e) {
      console.error("Failed to persist data:", e);
    }
  }, [data]);

  return (
    <NytContext.Provider value={{ data, setData }}>
      {children}
    </NytContext.Provider>
  );
}
