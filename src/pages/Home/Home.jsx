import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Learn Faster Through Book Summaries</h1>

      <p>
        A simple platform for organizing book insights, tracking reading
        progress, and reviewing key takeaways.
      </p>

      <div className="home-buttons">
        <button>View Library</button>
        <button>Add Summary</button>
      </div>
    </div>
  );
};

export default Home;