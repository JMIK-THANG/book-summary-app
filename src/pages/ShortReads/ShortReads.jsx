import { Link } from "react-router-dom";
import "./ShortReads.css";

const shortReads = [
  {
    id: 1,
    title: "Lamzin Nuam Le Awlsam",
    author: "",
    content: `Tlansuah san ahcun neh ti mi hi a um dah kel zik lo

Hmaitawn in pahtlang men ko-aw.
Leilungtlun dan le a siningdan tepawl,
Buai le harsatnakpawl ti mi cu
Thazang cahnak tha hmuahhmuah sawmkhawm-in
Pahtlang ngam le thei vivo asile
Lan le kân ding mipawl hi
A nuam in a awlsam sinsin a si men mai!`,
  },
];

const ShortReads = () => {
  return (
    <main className="short-reads-page">
      <div className="short-reads-shell">
        <Link className="short-reads-back" to="/library">
          ‹ Back to Library
        </Link>

        <header className="short-reads-intro">
          <p className="short-reads-kicker">Words for the journey</p>
          <h1>Short Reads</h1>
          <p className="short-reads-description">
            A quiet place for brief thoughts, reflections, and
            encouragement.
          </p>
        </header>

        <section className="short-reads-list" aria-label="Short reads">
          {shortReads.map((shortRead) => (
            <article className="short-read" key={shortRead.id}>
              <span className="short-read-quote" aria-hidden="true">
                “
              </span>

              <header className="short-read-header">
                <p>Short reflection</p>
                <h2>{shortRead.title}</h2>

                {shortRead.author && (
                  <p className="short-read-author">
                    By {shortRead.author}
                  </p>
                )}
              </header>

              <div className="short-read-divider" aria-hidden="true">
                <span />
              </div>

              <p className="short-read-content">{shortRead.content}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default ShortReads;
