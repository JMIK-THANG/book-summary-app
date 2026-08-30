import { BookOpen, Lightbulb, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-container">
          <p className="about-kicker">The story behind 1989</p>
          <h1>Big ideas, made easier to carry.</h1>
          <p className="about-lead">
            1989 is a thoughtful reading space for people who want to learn
            from books, reflect on meaningful ideas, and keep growing one page
            at a time.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-container about-story-grid">
          <div>
            <p className="about-section-label">Why we exist</p>
            <h2>Reading should feel inviting, not overwhelming.</h2>
          </div>
          <div className="about-story-copy">
            <p>
              Great books can change the way we understand ourselves and the
              world, but finding time to read and remember every lesson is not
              always easy.
            </p>
            <p>
              1989 brings the central ideas of books into clear summaries and
              pairs them with Short Reads—brief reflections designed for quiet
              moments, encouragement, and practical learning.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-container">
          <p className="about-section-label">What guides us</p>
          <div className="about-value-grid">
            <article>
              <BookOpen aria-hidden="true" />
              <h3>Clarity</h3>
              <p>We make important ideas approachable without losing their meaning.</p>
            </article>
            <article>
              <Lightbulb aria-hidden="true" />
              <h3>Curiosity</h3>
              <p>Every summary is an invitation to question, explore, and read further.</p>
            </article>
            <article>
              <Heart aria-hidden="true" />
              <h3>Growth</h3>
              <p>Small moments of learning can shape a thoughtful and purposeful life.</p>
            </article>
          </div>
        </div>
      </section>

     
    </main>
  );
};

export default About;
