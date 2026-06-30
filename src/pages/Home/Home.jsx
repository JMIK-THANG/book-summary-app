import { Link } from "react-router-dom";
import "./Home.css";
import homepage from "../../assets/homepage.jpg";
import bookVideo from "../../assets/booksummaryapp-video.mp4";
import atomicHabits from "../../assets/atomic-habits.jpg";
import howToKnowAPerson from "../../assets/how-to-know-a-person.jpg";
import psychologyMoney from "../../assets/psychology-money.jpg";
import cognitiveBehaviorTherapy from "../../assets/cognitive-behavior-therapy.jpg";
import thinkfastandslow from "../../assets/think-fast-and-slow.jpg";

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="hero-label">BOOK SUMMARY APP</p>
          <h1>Siar Mal • Zir Tam</h1>
          <p className="hero-description">Ni tin thil thar pakhatkhat zir aw.</p>
          <p className="hero-subtext">
            Explore powerful ideas, key lessons, and life-changing insights from
            the best books — all in one place.
          </p>

          <Link to="/library" className="hero-button">
            Explore Library <span>→</span>
          </Link>
        </div>

        <div className="hero-image">
          <img src={homepage} alt="Library books" className="main-hero-image" />
          <img src={atomicHabits} alt="Atomic Habits" className="floating-book book-1" />
          <img src={howToKnowAPerson} alt="How to Know a Person" className="floating-book book-2" />
          <img src={psychologyMoney} alt="The Psychology of Money" className="floating-book book-3" />
          <img src={cognitiveBehaviorTherapy} alt="Cognitive Behavioral Therapy" className="floating-book book-4" />
          <img src={thinkfastandslow} alt="Thinking Fast and Slow" className="floating-book book-5" />
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <span>📖</span>
          <h3>100+</h3>
          <p>Book Summaries</p>
        </div>

        <div className="stat-card">
          <span>💡</span>
          <h3>50+</h3>
          <p>Categories</p>
        </div>

        <div className="stat-card">
          <span>👥</span>
          <h3>1000+</h3>
          <p>Active Readers</p>
        </div>

        <div className="stat-card">
          <span>⏱️</span>
          <h3>15 min</h3>
          <p>Per Summary</p>
        </div>
      </section>

      <section className="learn-section">
        <div className="learn-content">
          <p className="section-label">WHY CABUSIM?</p>

          <h2>
            Understand key ideas <br />
            in 15 minutes
          </h2>

          <div className="small-line"></div>

          <p className="learn-description">
            We break down the best books into short, practical summaries so you
            can learn anytime, anywhere.
          </p>

          <div className="learn-list">
            <div className="learn-item">
              <span>📘</span>
              <div>
                <h3>Learn in 15 minutes</h3>
                <p>Understand key ideas without spending hours on a full book.</p>
              </div>
            </div>

            <div className="learn-item">
              <span>💡</span>
              <div>
                <h3>Feed your curiosity</h3>
                <p>Discover fresh ideas and simple lessons from great books.</p>
              </div>
            </div>

            <div className="learn-item">
              <span>🚀</span>
              <div>
                <h3>Grow every day</h3>
                <p>Build a small learning habit one summary at a time.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="learn-video">
          <video src={bookVideo} autoPlay muted loop playsInline />
        </div>
      </section>

      <section className="category-section">
        <h2>Popular Categories</h2>

        <div className="category-list">
          <div className="category-card">🌱 Self Growth</div>
          <div className="category-card">🧠 Psychology</div>
          <div className="category-card">💵 Finance</div>
          <div className="category-card">📈 Productivity</div>
          <div className="category-card">👥 Leadership</div>
          <div className="category-card">❤️ Health</div>
        </div>
      </section>

      <section className="how-section">
        <h2>How it works</h2>

        <div className="how-grid">
          <div className="how-card">
            <span>1</span>
            <h3>Explore</h3>
            <p>Browse summaries by category or search for a book.</p>
          </div>

          <div className="how-card">
            <span>2</span>
            <h3>Read</h3>
            <p>Read key ideas and lessons in a clear, simple way.</p>
          </div>

          <div className="how-card">
            <span>3</span>
            <h3>Save</h3>
            <p>Keep your favorite summaries to revisit anytime.</p>
          </div>

          <div className="how-card">
            <span>4</span>
            <h3>Apply</h3>
            <p>Use what you learn to improve your daily life.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;