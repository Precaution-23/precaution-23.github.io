import React, {useState} from "react";
import KeyInput from "../components/KeyInput/KeyInput";
import MainSegment from "../components/MainSegment/MainSegment";
import TopLeftSegment from "../components/TopleftSegment/TopLeftSegment";
import SerialNumber from "../components/SerialNumber/SerialNumber";

function Home() {
  const [loctStatus, setLoctStatus] = useState("Unlocked")
  const [lockProcess, setLockProcess] = useState("")
  const [codeValues, setCodeValues] = useState("")
  const [serialNumber, setSerialNumber] = useState(localStorage.getItem("serialNumber"))


  // console.log("lockProcess", lockProcess)

  
  
  return (
    <>
      <div className="container">
        <div className="container_inner-details ">
          <div className="container_segment-details">
          <TopLeftSegment topLeftSegment={loctStatus} safeCodeValues={codeValues} /> 
          <MainSegment mainSegmentText={lockProcess} />
          </div>
          <KeyInput setLoctStatus={setLoctStatus} setLockProcess={setLockProcess} setSerialNumber={setSerialNumber} setCodeValues={setCodeValues} lockProcess={lockProcess} />
          <SerialNumber serialNum={serialNumber}/>
        </div>
      </div>
    </>
  );
}

export default Home;
