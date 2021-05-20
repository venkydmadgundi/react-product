import React from "react";
import "./Spinner.css";
const Spinner = (props) => {
  return (
   <div className={"loader-wrapper"}>
     <div className={"loader"}>Loading...</div>
   </div>
);
};

export default Spinner;