import "./BenefitSection.css";

export const BenefitSection = () => {
  <section className="benefits-section">
    <div className="section-container">
      <div className="benefits-heading">
        <p className="section-label">WHY CABUSIM?</p>
        <h2>A simpler way to discover great books</h2>
        <p>
          Learn the central ideas before deciding what you want to read in full.
        </p>
      </div>

      <div className="benefits-grid">
        <article className="benefit">
          <span className="benefit-number">01</span>
          <h3>Clear summaries</h3>
          <p>Understand a book’s central ideas without unnecessary details.</p>
        </article>

        <article className="benefit">
          <span className="benefit-number">02</span>
          <h3>Easy discovery</h3>
          <p>Find useful books quickly by searching titles and authors.</p>
        </article>

        <article className="benefit">
          <span className="benefit-number">03</span>
          <h3>Reader discussions</h3>
          <p>Sign in, share your perspective, and learn from other readers.</p>
        </article>
      </div>
    </div>
  </section>;
};
