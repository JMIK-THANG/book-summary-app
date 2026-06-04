import {Link} from 'react-router-dom'; 
import "./Home.css";
import homepage from "../../assets/homepage.jpg";
  import bookVideo from "../../assets/booksummaryapp-video.mp4";

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
  <h2>
    Understand key ideas <br/>
    in 15 minutes
  </h2>
  <div className="underline"></div>
</section>

<section className="home-features">
  <div className="feature-list">
    <div className="feature-item">
      <div className="feature-icon">📖</div>
      <h3>Learn in 15 minutes</h3>
      <p>
        Read short book summaries anywhere and understand the key ideas without
        spending hours on a full book.
      </p>
    </div>

    <div className="feature-item">
      <div className="feature-icon">💡</div>
      <h3>Feed your curiosity</h3>
      <p>
        Discover helpful ideas, fresh perspectives, and simple lessons from
        books that make learning easier every day.
      </p>
    </div>
  </div>



<div className="feature-preview">
  <video
    className="feature-video"
    src={bookVideo}
    autoPlay
    muted
    loop
    playsInline
  />
</div>
</section>
    </main>
  );
};

export default Home;