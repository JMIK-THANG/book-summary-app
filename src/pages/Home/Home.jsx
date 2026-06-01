import {Link} from 'react-router-dom'; 
import "./Home.css";
import homepage from "../../assets/homepage.jpg";

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="hero-label">BOOK SUMMARY APP</p>

          <h1>Siar Mal • Zir Tam</h1>

          <p className="hero-description">
            Save your favorite book summaries, organize key ideas, and review
            important lessons anytime.
          </p>

        <Link to="/library" className="hero-button">
  Explore Library
</Link>
        </div>

        <div className="hero-image">
          <img src={homepage} alt="Library books" />
        </div>
      </section>

      <section className="home-info">
        <h2>Build your personal knowledge library</h2>
        <p>
          Keep all your book notes, summaries, and takeaways in one simple place
          so you can remember what you read.
        </p>
      </section>
    </main>
  );
};

export default Home;