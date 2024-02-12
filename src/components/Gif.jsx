import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Gifs.css";
import fetchGif from "../modules/fetchGif";

export default function Gif({ searchTerm }) {
   const [gifType, setGifType] = useState([]);

   useEffect(() => {
      fetchGif(searchTerm)
         .then((gifData) => {
            setGifType(gifData);
         })
         .catch((error) => {
            console.error("Error fetching GIF:", error);
         });
   }, [searchTerm]);

   return <div className="gif">{gifType.length > 0 && <img src={gifType[0].images.original.url} alt="" />}</div>;
}

Gif.propTypes = {
   searchTerm: PropTypes.string.isRequired,
};
