import React from "react";
import pirateImage from "../../assets/piratePhoto.png";
import "./PirateMessage.css";

const PirateMessage = () => {
  return (
    <div className="pirate-container">
      <div className="pirate-image">
        <img src={pirateImage} alt="Renee the pirate and Dan as Quailman" />
      </div>
      <div className="pirate-text">
        <p>
          Arrr, if ye be readin&apos; this, then ye likely know Renée. As ye be
          aware, Renée be turnin&apos; 40 at the end o&apos; November. Spare a
          few moments, if ye please, to be fillin&apos; out the form below. If
          ye be needin&apos; some inspiration, just cast yer eyes upon this wee
          pirate lass in the picture here with Quailman from 2005. But keep this
          under wraps, matey – not a soul be tellin&apos; Renée! If ye could
          help spread the word, that&apos;d be grand, especially among Franklin
          School District shipmates an&apos; them ol&apos; pre-college crew! At
          the end of this all the well wishes, pictures, and memories will be
          compiled into a scrapbook for Renée.
        </p>
      </div>

    </div>
  );
};

export default PirateMessage;
