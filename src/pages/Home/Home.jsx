import { HeroSection } from "../../components/Home/HeroSection";
import { BenefitSection } from "../../components/Home/BenefitSection";
import { FinalCTA } from "../../components/Home/FinalCTA";
import { LatestBooksSection } from "../../components/Home/LatestBooksSection";
import { PopularBooksSection } from "../../components/Home/PopularBooksSection";
import { useHome } from "../../hooks/useHome";
import "./Home.css";

const Home = ({ counts = {}, books = [] }) => {
  const { latestBooks, mostViewedBooks, featuredBooks } = useHome(books);
  return (
    <main className="home">
      <HeroSection
        counts={counts}
        featuredBooks={featuredBooks}
        books={books}
      />
      <LatestBooksSection latestBooks={latestBooks} />
      <PopularBooksSection mostViewedBooks={mostViewedBooks} />
      <BenefitSection />
      <FinalCTA />
    </main>
  );
};

export default Home;
