import React, { useState, useEffect } from "react";
import GameScore from "./GameScore";
import Gif from "./Gif";
import "../styles/GameBoard.css";
import generateArray from "../modules/generateArray";
import fetchGif from "../modules/fetchGif";
import shuffleArray from "../modules/shuffleArray";

export default function GameBoard() {
   const [gifType, setGifType] = useState([]);
   const [activeGifs, setActiveGifs] = useState([]);

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

   const handleGifClick = (gifId) => {
      if (!activeGifs.includes(gifId)) {
         if (activeGifs.length < 2) {
            setActiveGifs([...activeGifs, gifId]);
         } else {
            setActiveGifs([]);
         }
      }
   };

   return (
      <div className="game-board">
         <GameScore />
         <ul className="gif-container">
            {gifType.map((gif) => (
               <li key={gif.id}>
                  <Gif url={gif.images.original.url} isVisible={activeGifs.includes(gif.id)} changeVisibility={() => handleGifClick(gif.id)} />
               </li>
            ))}
         </ul>
      </div>
   );
}
