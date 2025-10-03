import { memo } from "react";
import logo from "../../assets/imgs/icons8-book-96.png";
import Gradient from "../ui/Gradient";
import firstCover from "../../assets/imgs/3D book-1.png";
import secondCover from "../../assets/imgs/3D book-2.png";
import { TextAnimate } from "../magicui/text-animate";
import { SparklesText } from "../magicui/sparkles-text";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page container m-auto h-screen relative">
      <Gradient className="h-4/5 flex justify-center mt-2 rounded-xl overflow-hidden">
        <img
          src={firstCover}
          alt="first cover"
          loading="lazy"
          className="book1 absolute top-1/2 -left-4/5 -translate-y-1/2 animate-fade-in-up delay-200 will-change-transform"
        />
        <img
          src={secondCover}
          alt="second cover"
          loading="lazy"
          className="book2 absolute top-1/2 -translate-y-1/2 -right-4/5 animate-fade-in-up delay-400 will-change-transform"
        />
        <div className="flex flex-col md:flex-row h-full md:h-auto">
          <div className="info rounded-xl md:rounded-none w-full text-text relative md:w-1/2 p-8 bg-backgrounds flex flex-col justify-center border-2 border-button-border md:-skew-y-10 md:translate-y-15">
            <SparklesText className="flex justify-center">
              <TextAnimate
                animation="blurInUp"
                by="word"
                className={`text-2xl font-bold text-center mt-8`}
              >
                Welcome to NYT Books
              </TextAnimate>
            </SparklesText>
            <TextAnimate
              animation="blurInUp"
              by="word"
              className="text-center text-md mt-4"
            >
              Discover the latest bestsellers and timeless classics
            </TextAnimate>
            <Link to="/categories">
              <div className="flex justify-center mt-6">
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  className="bg-button-border hover:bg-main text-text hover:text-white dark:text-white cursor-pointer px-4 py-2 rounded-md transition duration-300 font-bold text-sm border-2 border-button-border"
                >
                  Shop Now
                </TextAnimate>
              </div>
            </Link>
          </div>
          <div className="img-box rounded-xl md:rounded-none w-full h-full md:h-auto text-white relative md:w-1/2 p-8 bg-backgrounds flex justify-center items-center border-2 border-button-border md:skew-y-10 md:translate-y-15">
            <img
              src={logo}
              alt="Books"
              loading="lazy"
              className="mx-auto w-1/3 md:w-1/2 animate-fade-in-up"
            />
          </div>
        </div>
      </Gradient>
    </div>
  );
}

export default memo(LandingPage);
