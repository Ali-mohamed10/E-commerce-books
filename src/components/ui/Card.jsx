import { BorderBeam } from "../magicui/border-beam";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import FavoriteButton from "./FavoriteButton";
import Section from "./AnimationSection";

export default function Card({
  title,
  imgCover,
  author,
  price,
  listName,
  uniqueId,
  isbn,
}) {
  return (
    <Section>
      <div className="card relative w-50 md:w-60 bg-backgrounds shadow-2xl dark:shadow-md rounded-lg overflow-hidden h-full flex flex-col dark:shadow-button-border mx-auto">
        <Link to={`/bookDetails/${isbn}`}>
          <img
            src={imgCover}
            alt={title}
            loading="lazy"
            className="w-full h-60 md:h-70 object-cover"
          />
        </Link>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-md md:text-lg font-bold mb-2 line-clamp-1">{title}</h3>
          <p className="text-gray-600 mb-1 line-clamp-1">by {author}</p>
          <p className="text-main font-bold mb-2 text-2xl">${price}</p>
          <p className="text-sm text-gray-500 line-clamp-1">{listName}</p>
          <div className="mt-auto mx-auto">
            <CartButton uniqueId={uniqueId} />
          </div>
          <FavoriteButton uniqueId={uniqueId} />
        </div>
        <BorderBeam
          duration={6}
          size={400}
          className="from-transparent via-main to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          borderWidth={2}
          className="from-transparent via-blue-500 to-transparent"
        />
      </div>
    </Section>
  );
}
