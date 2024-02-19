import React from "react";
import PropTypes from "prop-types";
import "../styles/GameScore.css";

export default function GameScore({ currentScore, highestScore }) {
   return (
      <div className="score-container">
         <span>Score: {currentScore}</span>
         <span>Best Score: {highestScore}</span>
      </div>
   );
}

GameScore.propTypes = {
   currentScore: PropTypes.number.isRequired,
   highestScore: PropTypes.number.isRequired,
};
