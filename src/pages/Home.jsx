import BestSellersList from "../components/common/BestSellersList";
import OurOffer from "../components/common/OurOffer";
import Testimonials from "../components/common/Testimonials";
import ScrollBasedVelocityDemo from "../components/common/ScrollBasedVelocityDemo";
import Section from "../components/ui/AnimationSection";
import LandingPage from "../components/common/LandingPage";
export default function Home() {
  return (
    <>
      <Section>
        <LandingPage />
      </Section>
      <Section>
        <BestSellersList />
      </Section>
      <Section>
        <OurOffer />
      </Section>
      <Section>
        <Testimonials />
      </Section>
      <Section>
        <ScrollBasedVelocityDemo />
      </Section>
    </>
  );
}
