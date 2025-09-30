import "./App.css";
import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Categories = lazy(() => import("./pages/Categories"));
const ShopCart = lazy(() => import("./pages/ShopCart"));
const Contact = lazy(() => import("./pages/Contact"));
const FavoriteBooks = lazy(() => import("./pages/FavoriteBooks"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
import Layout from "./components/layouts/Layout";
import NytProvider from "./contexts/NytContext";
import ToastProvider from "./contexts/ToastContext";
import Loader from "./pages/Loader";
function App() {
  return (
    <>
      <NytProvider>
        <ToastProvider>
          <Routes>
            <Route path="/E-commerce-books/" element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<Loader />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/E-commerce-books/categories"
                element={
                  <Suspense fallback={<Loader />}>
                    <Categories />
                  </Suspense>
                }
              />
              <Route
                path="/E-commerce-books/about"
                element={
                  <Suspense fallback={<Loader />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="/E-commerce-books/contact"
                element={
                  <Suspense fallback={<Loader />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="/E-commerce-books/favorite-books"
                element={
                  <Suspense fallback={<Loader />}>
                    <FavoriteBooks />
                  </Suspense>
                }
              />
              <Route
                path="/E-commerce-books/shop-cart"
                element={
                  <Suspense fallback={<Loader />}>
                    <ShopCart />
                  </Suspense>
                }
              />
              <Route
                path={`/E-commerce-books/bookDetails/:listId/:bookId`}
                element={
                  <Suspense fallback={<Loader />}>
                    <BookDetails />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loader />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </ToastProvider>
      </NytProvider>
    </>
  );
}

export default App;
