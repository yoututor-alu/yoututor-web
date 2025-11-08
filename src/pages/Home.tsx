import LandingHero from "../components/LandingHero";
import FeatureSection from "../components/FeatureSection";
import FooterBar from "../components/FooterBar";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <div className="flex flex-col bg-[#fafafa] min-h-full">
      <div className="flex-1 flex flex-col items-center px-4 py-16 gap-24">
        <LandingHero />
        <HowItWorks />
        <FeatureSection />
      </div>
      <FooterBar />
    </div>
  );
};

export default Home;
