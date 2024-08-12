import React from "react";
import StoryList from "../components/StoryList";

const Home: React.FC = () => {
  return (
    <div className="main-container">
      <div className="top-placeholder">
        <h4>Instagram</h4>
      </div>
      <StoryList />
      <div className="placeholder-class">
        <h1>Stage OTT Assesment</h1>
      </div>
    </div>
  );
};

export default Home;
