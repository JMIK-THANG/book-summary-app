import { Link } from "react-router-dom";
import "./FinalCTA.css";

export const FinalCTA = () => {
  return (
    /* Final CTA */
    <section className="home-cta">
      <div className="home-cta-content">
        <p className="section-label">YOUR READING LIST STARTS HERE</p>
        <h2>One good idea can change the way you see everything.</h2>
        <p>Find the summary that speaks to where you are now.</p>

        <Link to="/library" className="primary-button">
          Explore all books
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};
