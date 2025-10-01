import { SparklesText } from "../components/magicui/sparkles-text";
import Section from "../components/ui/AnimationSection";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import book1 from "../assets/imgs/3D book-1.png";

export default function About() {
  const missionPoints = [
    "Up-to-date best sellers across genres",
    "Clean, performant, and accessible experience",
    "Personalization with favorites and cart",
  ];

  const values = [
    { title: "Curation", desc: "Signal over noise—fresh NYT lists, always." },
    {
      title: "Delightful Design",
      desc: "Minimal, fast, and accessible for all readers.",
    },
    {
      title: "Personalization",
      desc: "Save favorites and build your perfect list.",
    },
    {
      title: "Performance",
      desc: "Snappy interactions powered by modern tooling.",
    },
  ];

  const stats = [
    { value: "50k+", label: "Books Tracked" },
    { value: "95%", label: "User Satisfaction" },
    { value: "24/7", label: "Live Updates" },
  ];
  return (
    <Section>
      <section className="relative w-full">
        {/* Hero */}
        <div className="container mx-auto px-4 pt-16 pb-8 text-center">
          <SparklesText className="text-3xl md:text-6xl text-text">
            About NYT Books
          </SparklesText>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
            Discover, track, and fall in love with the world’s most talked-about
            books. We bring The New York Times Best Sellers lists to your
            fingertips—beautifully, simply, and fast.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/categories">
              <Button className="bg-main text-white hover:opacity-90">
                Explore Categories
              </Button>
            </Link>
            <Link to="/favorite-books">
              <Button variant="outline">View Favorites</Button>
            </Link>
          </div>
        </div>

        {/* Mission */}
        <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-text">
              Our Mission
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We believe discovering your next great read should feel
              delightful. Our app curates the latest NYT lists and augments them
              with rich details, beautiful presentation, and tools to help you
              manage favorites and your shopping list—all in one place.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {missionPoints.map((point, idx) => (
                <li key={idx}>• {point}</li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl dark:shadow-button-border ring-1 ring-border/50">
              <img
                src={book1}
                alt="Books illustration"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-xl md:text-2xl font-semibold text-text text-center">
            What We Value
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border/60 bg-backgrounds/60 p-5 shadow-sm"
              >
                <h4 className="font-semibold text-text">{item.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="rounded-md bg-backgrounds/70 p-6 text-center shadow-sm"
              >
                <p className="text-3xl font-bold text-main">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 pb-16">
          <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-border/60 bg-backgrounds/70 p-6 text-center md:flex-row md:text-left">
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-text">
                Ready to find your next great read?
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Dive into curated lists, save favorites, and build your cart.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/categories">
                <Button className="bg-main text-white hover:opacity-90">
                  Browse Now
                </Button>
              </Link>
              <Link to="/shop-cart">
                <Button variant="outline">View Cart</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}
