import img from "../../assets/imgs/senior-woman.webp";
import ButtonToCategories from "../ui/ButtonToCategories";
export default function LandingPage() {
  return (
    <section className="landing-page min-h-screen bg-backgrounds px-4">
      <div className="info relative px-2.5 py-9 sm:py-5 flex flex-wrap items-center justify-center gap-3 sm:gap-10">
        <h2 className="relative text-5xl sm:text-5xl lg:text-9xl font-bold text-main italic whitespace-nowrap">
          NYT <span className="sm:hidden text-white"> Books</span>
        </h2>
        <div className="image translate-y-5">
          <img
            src={img}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            alt="senior-woman"
            width={1280}
            height={720}
            sizes="(min-width: 1024px) 900px, (min-width: 640px) 600px, 100vw"
            className="sm:flex w-[100%] h-50 sm:w-[100%] sm:h-90 rounded-2xl shadow-2xl dark:shadow-button-border"
          />
        </div>
        <h2 className="hidden sm:flex text-5xl sm:text-5xl lg:text-9xl font-bold italic">
          Books
        </h2>
        <p className="hidden sm:flex text-2xl lg:text-3xl italic translate-x-0 sm:translate-x-60 translate-y-25 sm:translate-y-15 lg:translate-y-25 absolute pr-4">
          Shop Now - <span className="text-main px-2">$20 </span> Only
        </p>
      </div>
      <div className="details flex flex-wrap gap-6 px-2.5 py-5 justify-center items-center mt-0 sm:mt-5">
        <p className="italic w-100 text-sm text-gray-500 text-center sm:text-start">
          Discover a world of captivating stories and knowledge with our curated
          selection of New York Times bestselling books. From thrilling novels
          to insightful non-fiction, find your next great read today!
        </p>
        <div className="buttons flex flex-wrap gap-4 justify-center">
          <ButtonToCategories
            classes="cursor-pointer rounded-md py-2 px-6 bg-black dark:bg-white border-2 border-black text-white dark:text-black font-bold transition-all duration-300 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transform hover:scale-105"
            label="Shop Now - $20 Only"
          />
          <ButtonToCategories
            classes="cursor-pointer rounded-md py-2 px-6 border-2 border-black dark:border-white transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transform hover:scale-105"
            label="Browse Collection"
          />
        </div>
        <p className="hidden sm:flex italic text-center sm:text-start text-gray-500">
          © 2025 NYT. All rights reserved. Designed with ♥ by NYT Books
        </p>
      </div>
    </section>
  );
}
