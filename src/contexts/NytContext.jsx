import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const NytContext = createContext({});

export default function NytProvider({ children }) {
  const [data, setData] = useState(null);
  // Helper to normalize book data and ensure defaults
  const normalizeLists = (lists) => {
    if (!Array.isArray(lists)) return [];
    return lists.map((list) => ({
      ...list,
      books: (list.books || []).map((book) => ({
        ...book,
        uniqueId: `${list.list_name_encoded || list.list_name}-${book.primary_isbn13}`,
        listNameEncoded: list.list_name_encoded || list.list_name,
        isFavorite: book.isFavorite ?? false,
        isToCart: book.isToCart ?? false,
        price: book.price ?? 20,
        quantity: book.quantity > 0 ? book.quantity : 1,
      })),
    }));
  };

  useEffect(() => {
    let isMounted = true;

    const loadFromStorage = () => {
      try {
        const stored = localStorage.getItem("nytData");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    };

    // Set initial data from localStorage if available
    setData((prev) => prev ?? loadFromStorage());

    const fetchAndMergeData = async () => {
      try {
        // Fetch new data from NYT API
        const response = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`
        );

        if (!isMounted || !response.data?.results?.lists) return;

        const normalized = normalizeLists(response.data.results.lists);

        // Merge with existing data to preserve user state (favorites, cart)
        setData((prevData) => {
          const base = prevData ?? loadFromStorage();
          const prevMap = new Map();

          if (Array.isArray(base)) {
            base.forEach((list) => {
              (list.books || []).forEach((b) => prevMap.set(b.uniqueId, b));
            });
          }

          const merged = normalized.map((list) => ({
            ...list,
            books: (list.books || []).map((book) => {
              const old = prevMap.get(book.uniqueId);
              return old ? { ...book, ...old } : book;
            }),
          }));

          // Avoid unnecessary re-renders and localStorage writes if data is identical
          if (JSON.stringify(base) === JSON.stringify(merged)) {
            return base;
          }

          localStorage.setItem("nytData", JSON.stringify(merged));
          return merged;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAndMergeData();
    const interval = setInterval(fetchAndMergeData, 5 * 60 * 1000); // Poll every 5 minutes

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <NytContext.Provider value={{ data, setData }}>
      {children}
    </NytContext.Provider>
  );
}
