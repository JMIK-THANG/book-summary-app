import { HeroSection } from "../../components/Home/HeroSection";
import { FinalCTA } from "../../components/Home/FinalCTA";
import { LatestBooksSection } from "../../components/Home/LatestBooksSection";
import { PopularBooksSection } from "../../components/Home/PopularBooksSection";
import { useHome } from "../../hooks/useHome";
import "./Home.css";

const Home = ({ counts = {}, books = [], navigation }) => {
  const { latestBooks, mostViewedBooks } = useHome(books);
  return (
    <main className="home">
      <HeroSection
        counts={counts}
        navigation={navigation}
        books={books}
      />
      <LatestBooksSection latestBooks={latestBooks} />
      <PopularBooksSection mostViewedBooks={mostViewedBooks} />
      <FinalCTA />
    </main>
  );
};

export default Home;
