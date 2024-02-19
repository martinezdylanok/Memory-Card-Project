import React, { useState, useEffect } from "react";
import GameScore from "./GameScore";
import Gif from "./Gif";
import "../styles/GameBoard.css";
import generateArray from "../modules/generateArray";
import fetchGif from "../modules/fetchGif";
import shuffleArray from "../modules/shuffleArray";

export default function GameBoard() {
   const storedScore = JSON.parse(localStorage.getItem("score"));
   const [gifType, setGifType] = useState([]);
   const [activeGifs, setActiveGifs] = useState([]);
   const [matchedGifs, setMatchedGifs] = useState([]);
   const [highestScore, setHighestScore] = useState(storedScore);
   const [gameScore, setGameScore] = useState(0);

   useEffect(() => {
      const wordsArray = generateArray();

      Promise.all(wordsArray.map((word) => fetchGif(word)))
         .then((allGifsData) => {
            const gifsData = allGifsData.flat();
            const interleavedGifsData = [];
            gifsData.forEach((gif) => {
               interleavedGifsData.push(gif);
               interleavedGifsData.push({ ...gif, id: `${gif.id}_copy` });
            });
            const shuffledArray = shuffleArray(interleavedGifsData);
            setGifType(shuffledArray);
         })
         .catch((error) => {
            console.error(error);
         });
   }, []);

   useEffect(() => {
      if (gameScore === 8) {
         localStorage.setItem("score", JSON.stringify(highestScore + 8));
      }
   }, [gameScore]);

   useEffect(() => {
      setHighestScore(storedScore);
   }, [highestScore]);

   useEffect(() => {
      if (activeGifs.length === 2) {
         const [firstGif, secondGif] = activeGifs;
         const pairOfGifsMatchId = firstGif.split("_")[0] === secondGif.split("_")[0];
         if (pairOfGifsMatchId) {
            setMatchedGifs((prevMatchedGifs) => [...prevMatchedGifs, firstGif, secondGif]);
            setGameScore((previousGameScore) => previousGameScore + 1);
         }
      }
   }, [activeGifs]);

   const handleGifClick = (newGif) => {
      if (!activeGifs.includes(newGif)) {
         if (!matchedGifs.includes(newGif)) {
            if (activeGifs.length < 2) {
               setActiveGifs([...activeGifs, newGif]);
            } else {
               setActiveGifs([]);
            }
         }
      }
   };

   const restartGame = () => {
      window.location.reload();
   };

   return (
      <div className="game-board">
         <GameScore currentScore={gameScore} highestScore={highestScore} />
         <ul className="gif-container">
            {gifType.map((gif) => (
               <li key={gif.id}>
                  <Gif url={gif.images.original.url} isVisible={activeGifs.includes(gif.id) || matchedGifs.includes(gif.id)} changeVisibility={() => handleGifClick(gif.id)} />
               </li>
            ))}
         </ul>
         {gameScore === 8 && (
            <button type="button" className="restart-button" onClick={restartGame}>
               Play Again
            </button>
         )}
      </div>
   );
}
