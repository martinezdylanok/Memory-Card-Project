import React from "react";
import GameScore from "./GameScore";
import Gif from "./Gif";
import "../styles/GameBoard.css";
import concatenateArray from "../modules/concatenateArray";
import shuffleArray from "../modules/shuffleArray";

export default function GameBoard() {
   const randomGifsArray = ["elephant", "red", "computer", "boat", "mouse", "phone", "jacket", "singer"];
   const randomGifsCopy = randomGifsArray;
   const concatenatedArray = concatenateArray(randomGifsArray, randomGifsCopy);
   const shuffledArray = shuffleArray(concatenatedArray);

   return (
      <div className="game-board">
         <GameScore />
         <div className="gif-container">
            {shuffledArray.map((gif, index) => (
               <Gif key={`${gif}-${index}`} searchTerm={gif} />
            ))}
         </div>
      </div>
   );
}
