import Hero from "@/components/home/Hero";
import Difference from "@/components/home/Difference";
import Solutions from "@/components/home/Solutions";
import RiskJourney from "@/components/home/RiskJourney";
import PolicyCheck from "@/components/home/PolicyCheck";
import Claims from "@/components/home/Claims";
import Stories from "@/components/home/Stories";
import Industries from "@/components/home/Industries";
import LearningCentre from "@/components/home/LearningCentre";
import ConsultationCta from "@/components/home/ConsultationCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Difference />
      <Solutions />
      <RiskJourney />
      <PolicyCheck />
      <Claims />
      <Stories />
      <Industries />
      <LearningCentre />
      <ConsultationCta />
    </>
  );
}
