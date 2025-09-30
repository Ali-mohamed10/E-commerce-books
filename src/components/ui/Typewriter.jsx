import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";

export default function Typewriter({ firstText }) {
  const words = [
    {
      text: "My Favorite Books",
      className: "text-main",
    },
  ];
  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
