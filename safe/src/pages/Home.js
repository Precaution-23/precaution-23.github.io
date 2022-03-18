import React, {useState} from "react";
import KeyInput from "../components/KeyInput/KeyInput";
import MainSegment from "../components/MainSegment/MainSegment";
import TopLeftSegment from "../components/TopleftSegment/TopLeftSegment";
import SerialNumber from "../components/SerialNumber/SerialNumber";

function Home() {
  const [loctStatus, setLoctStatus] = useState("Unlocked")
  const [lockProcess, setLockProcess] = useState("")
  const [codeValues, setCodeValues] = useState("")
  const [serialNumber, setSerialNumber] = useState("S/N: 4815162342")
  
  return (
    <>
      <div className="container">
        <div className="container-details ">
          <div className="segment-container">
          <TopLeftSegment topLeftSegment={loctStatus} safeCodeValues={codeValues} /> 
          <MainSegment mainSegmentText={lockProcess} />
          </div>
          <KeyInput setLoctStatus={setLoctStatus} setLockProcess={setLockProcess} setSerialNumber={setSerialNumber} setCodeValues={setCodeValues} />
          <SerialNumber serialNum={serialNumber}/>
        </div>
      </div>
    </>
  );
}

export default Home;
