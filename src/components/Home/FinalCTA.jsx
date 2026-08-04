import { Link } from "react-router-dom";
import "./FinalCTA.css";

export const FinalCTA = () => {
  return (
    /* Final CTA */
    <section className="home-cta">
      <div className="home-cta-content">
        <p className="section-label">KEEP LEARNING</p>
        <h2>Your next great idea is waiting.</h2>
        <p>Browse the library and choose your next summary.</p>

        <Link to="/library" className="primary-button">
          Explore all books
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};
