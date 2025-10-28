import { lazy, Suspense, useEffect, useState } from "react";
import Section from "../components/ui/AnimationSection";
import LandingPage from "../components/common/LandingPage";

const BestSellersList = lazy(() =>
  import("../components/common/BestSellersList")
);
const OurOffer = lazy(() => import("../components/common/OurOffer"));
const ScrollBasedVelocityDemo = lazy(() =>
  import("../components/common/ScrollBasedVelocityDemo")
);

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);
  return (
    <>
      <Section>
        <LandingPage />
      </Section>
      <Suspense fallback={<div className="py-10 text-center">Loading…</div>}>
        <Section>
          <BestSellersList />
        </Section>
        <Section>
          <OurOffer />
        </Section>
        {isDesktop && (
          <Section>
            <ScrollBasedVelocityDemo />
          </Section>
        )}
      </Suspense>
    </>
  );
}
