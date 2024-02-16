import React from "react";
import PropTypes from "prop-types";
import "../styles/Gif.css";

export default function Gif({ url, isVisible, changeVisibility }) {
   return (
      <div role="button" aria-label="Gif" tabIndex="0" className={isVisible ? "gif visible" : "gif"} onClick={changeVisibility} onKeyDown={changeVisibility}>
         <img src={url} alt="" />
      </div>
   );
}

Gif.propTypes = {
   url: PropTypes.string.isRequired,
   isVisible: PropTypes.bool.isRequired,
   changeVisibility: PropTypes.func.isRequired,
};
