import { Link } from "react-router-dom";
import "./Home.css";

import homepage from "../../assets/homepage.jpg";
import bookVideo from "../../assets/booksummaryapp-video.mp4";

const Home = ({counts}) => {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="section-label">BOOK SUMMARY APP</p>

          <h1>Siar Mal • Zir Tam</h1>

          <p className="hero-description">
            Ni tin thil thar pakhatkhat zir aw.
          </p>

          <p className="hero-subtext">
            Discover powerful ideas and practical lessons from great books
            through clear, easy-to-read summaries.
          </p>

          <Link to="/library" className="primary-button">
            Explore Library <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="hero-image">
          <img src={homepage} alt="A collection of books" />
        </div>
      </section>
      <section className="journey-section">
  <div className="journey-header">
    <p className="section-label">YOUR READING JOURNEY</p>
    <h2>Discover ideas in three simple steps</h2>
    <p className="section-description">
      Explore concise book summaries, learn the key ideas, and join the
      conversation.
    </p>
  </div>

  <div className="stats-strip">
    <div className="stat-item">
      <span className="stat-icon" aria-hidden="true">
        📚
      </span>

      <div>
        <strong>{counts.totalBooks ?? 0}+</strong>
        <span>Book Summaries</span>
      </div>
    </div>

    <div className="stat-divider" aria-hidden="true"></div>

    <div className="stat-item">
      <span className="stat-icon" aria-hidden="true">
        👥
      </span>

      <div>
        <strong>{counts.totalUsers ?? 0}+</strong>
        <span>Active Readers</span>
      </div>
    </div>
  </div>

  <div className="journey-grid">
    <article className="journey-card">
      <span className="step-number">01</span>

      <div className="journey-icon" aria-hidden="true">
        🔍
      </div>

      <h3>Explore</h3>
      <p>
        Browse our growing library and discover a book that interests you.
      </p>
    </article>

    <article className="journey-card featured-card">
      <span className="step-number">02</span>

      <div className="journey-icon" aria-hidden="true">
        📖
      </div>

      <h3>Read</h3>
      <p>
        Understand the most important ideas through a clear and concise
        summary.
      </p>
    </article>

    <article className="journey-card">
      <span className="step-number">03</span>

      <div className="journey-icon" aria-hidden="true">
        💬
      </div>

      <h3>Discuss</h3>
      <p>
        Sign in, share your perspective, and learn from other readers.
      </p>
    </article>
  </div>
</section>

      <section className="learn-section">
        <div className="learn-content">
          <p className="section-label">WHY CABUSIM?</p>

          <h2>Understand important ideas in less time</h2>

          <p className="learn-description">
            CabuSim turns books into clear summaries so you can discover useful
            ideas without reading an entire book first.
          </p>

          <div className="learn-list">
            <article className="learn-item">
              <span aria-hidden="true">📖</span>

              <div>
                <h3>Read clear summaries</h3>
                <p>Understand the central ideas and lessons from each book.</p>
              </div>
            </article>

            <article className="learn-item">
              <span aria-hidden="true">🔍</span>

              <div>
                <h3>Find books easily</h3>
                <p>Search the library by book title or author.</p>
              </div>
            </article>

            <article className="learn-item">
              <span aria-hidden="true">💬</span>

              <div>
                <h3>Share your thoughts</h3>
                <p>Log in and join the discussion through comments.</p>
              </div>
            </article>
          </div>
        </div>

        <div className="learn-video">
          <video
            src={bookVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Demonstration of the CabuSim application"
          />
        </div>
      </section>

     

      <section className="home-cta">
        <div>
          <p className="section-label">START LEARNING</p>
          <h2>Find your next great idea</h2>
          <p>Explore the growing collection of book summaries.</p>
        </div>

        <Link to="/library" className="primary-button">
          View All Books <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
};

export default Home;