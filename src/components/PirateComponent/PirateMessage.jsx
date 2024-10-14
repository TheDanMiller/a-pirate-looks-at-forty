import React from "react";
import pirateImage from "../../assets/piratePhoto.png";
import "./PirateMessage.css";
import axios from "axios";

const PirateMessage = () => {
  const handleClick = () => {
    // this is a test function
    console.log('Handle this');
    axios({
      method: 'get',
      url: 'https://on8s0m5zl9.execute-api.us-east-2.amazonaws.com/healthcheck',
      headers: {
        'Access-Control-Allow-Origin': '*', // This won't help unless the server responds with this header
        'Content-Type': 'application/json',
        // Add other custom headers as needed
      }})
    .then(response => console.log(response.data))
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
  }
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
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default PirateMessage;
