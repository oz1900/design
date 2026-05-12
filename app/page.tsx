import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import TrustedBy from "@/components/TrustedBy";
import WhyGreenberg from "@/components/WhyGreenberg";
import Schedule from "@/components/Schedule";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <TrustedBy />
        <WhyGreenberg />
        <Schedule />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
