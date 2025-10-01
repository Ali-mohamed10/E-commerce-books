import ScrollCard from "./ScrollCards";
import Card from "../ui/Card";
import { NytContext } from "../../contexts/NytContext";
import { useContext } from "react";
import { TextAnimate } from "../magicui/text-animate";
import Offer from "../../assets/imgs/Offer.png";
import BestSeller from "../../assets/imgs/BestSeller.png";

/**
 * BestSellersList Component
 * Displays the first book from each NYT bestseller list
 */
export default function BestSellersList() {
  const { data } = useContext(NytContext);

  return (
    <div className="best-sellers relative">
      <div className="container mx-auto">
        <h2>
          <TextAnimate
            animation="blurInUp"
            by="word"
            className={`text-3xl md:text-6xl font-bold mb-15 text-center`}
          >
            Best Sellers Lists
          </TextAnimate>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center rounded-2xl border-2 shadow-xl dark:shadow-button-border mb-10">
          <div className="imgs my-5 w-[40%] md:w-[19%] mx-auto bg-whites rounded-2xl bg-gradient-to-b from-whites via-main/20 to-whites flex-col justify-center items-center">
            <img src={BestSeller} alt="Best Seller" loading="lazy" />
            <img
              src={Offer}
              alt="Offer"
              loading="lazy"
              className="hidden md:block h-80 -translate-y-6 mx-auto"
            />
          </div>
          <ScrollCard className="md:ml-auto">
            {Array.isArray(data) ? (
              data.map((list, listIndex) => {
                return (
                  <div key={listIndex} className="flex-none w-64 snap-start">
                    <Card
                      title={list.books[0].title}
                      imgCover={list.books[0].book_image}
                      author={list.books[0].author}
                      price={list.books[0].price}
                      listName={list.list_name}
                      uniqueId={list.books[0].uniqueId}
                      isbn={list.books[0].primary_isbn13}
                    />
                  </div>
                );
              })
            ) : (
              <p className="w-full text-center">Loading...</p>
            )}
          </ScrollCard>
        </div>
      </div>
    </div>
  );
}
