import React from "react";
import KeyInput from "../components/KeyInput/KeyInput";
import MainSegment from "../components/MainSegment/MainSegment";
import TopLeftSegment from "../components/TopleftSegment/TopLeftSegment";

function Home() {
  return (
    <>
      <div className="container">
        <div className="container-details ">
          <div className="segment-container">
          <TopLeftSegment /> 
          <MainSegment />
          </div>
          <KeyInput />
        </div>
      </div>
    </>
  );
}

export default Home;
