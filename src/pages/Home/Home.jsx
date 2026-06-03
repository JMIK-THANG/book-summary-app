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
            Ni tin thil thar pakhatkhat zir aw. 
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
        <h2>Na zirnak khawlkhawmnak</h2>
        <p>
          Cabu tha pawl ih ruahnak thupi pawl hmu suak aw, ni tin zirnak nun nei nak thawn. 
        </p>
      </section>
    </main>
  );
};

export default Home;