import React, { useState, useEffect } from "react";

const keyBoardValues = [
  { number: 7 },
  { number: 8 },
  { number: 9 },
  { number: 4 },
  { number: 5 },
  { number: 6 },
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: `*` },
  { number: 0 },
];

function KeyInput({
  setLoctStatus,
  setLockProcess,
  setSerialNumber,
  setCodeValues,
}) {
  const [getSafeCodes, setGetSafeCodes] = useState(
    localStorage.getItem("codeValues") !== null
      ? localStorage.getItem("codeValues")
      : ``
  );

  // declaring of states
  const [timer, settimer] = useState(null);
  const [lockCode, setlockCode] = useState("");

  // triggers the function that submits the code values
  const lockSafe = () => {
    setLockProcess("Locking...")
    submitCode(lockCode)
    clearTimeout(timer);
    localStorage.setItem("lockValues", lockCode)
    setTimeout(() => {
      setLoctStatus("Locked")
      setLockProcess("")
    }, 2000)
    
  }


  const unlockSafe = () => {
    if(localStorage.getItem("lockValues") !== localStorage.getItem("unlockCodes")){
      setLockProcess("Validating...")
      setTimeout(()=> {
        setLockProcess("Error")
      }, 1500)
    }else{
      setLockProcess("Validating...")
      setTimeout(() => {
        setLockProcess("Unlocking...")
      }, 1000)
      setTimeout(()=> {
        setLoctStatus("Unlocked")
        setLockProcess("Ready")
      }, 1500)
      
    }
  }


  // function to pick values keyed in by the user
  const pickValue = (value) => {
    if (timer !== null) clearTimeout(timer);

    // assigning key in values to a new variable
    const newInput = lockCode + value.number;

    // updating the state of the code
    setlockCode(newInput);
    localStorage.setItem("codeValues", newInput);
    
    settimer(
      setTimeout(() => {
        submitCode(newInput);
        localStorage.setItem("unlockCodes", newInput)
        unlockSafe()
      }, 2000)
    );

    return;
  };

  //clears the state that holsd the codes
  const clearCode = () => {
    setlockCode("")
  }

  //submit lock code
  const submitCode = (code) => {
    console.log("#################", code)
    clearCode()
  }

  useEffect(() => {}, []);

  return (
    <div className="keyinput-placement">
      <div className="key-input">
        {keyBoardValues.map((value, index) => {
          return (
            <div key={index}>
              <button
                className="input-button"
                onClick={() => {
                  pickValue(value);
                }}
              >
                {value.number}
              </button>
            </div>
          );
        })}
        <button className="input-button" onClick={lockSafe}>
          L
        </button>
      </div>
    </div>
  );
}

export default KeyInput;
