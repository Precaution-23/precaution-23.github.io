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

  // setting the service code for hotel staffs to change safe status
  // to service mode when guests forget their password 

  

  // declaring of states
  const [timer, settimer] = useState(null);
  const [lockCode, setlockCode] = useState("");

  //getting of service code from local storage
  const [codeService, setCodeService] = useState(localStorage.getItem("serviceCode") ? localStorage.getItem("serviceCode") : `` )

  // function to lock safe
  const lockSafe = () => {

    // checks if the length of code is not equal 6
    if (lockCode.length !== 6) {
      setLockProcess("Code should be equal to 6");
      clearTimeout(timer);
      return;
    }

    // checks if the length of code is equal to 6
    if(lockCode.length === 6){
      setLockProcess("Locking...");
      clearCode()
      clearTimeout(timer);
      localStorage.setItem("lockValues", lockCode);
      setTimeout(() => {
        setLoctStatus("Locked");
        setLockProcess("");
      }, 1000)
      
    }

  };

  // function to unlock safe
  const unlockSafe = () => {
    if (
      localStorage.getItem("lockValues") !== localStorage.getItem("unlockCodes")
    ) {
      setLockProcess("Validating...");
      setTimeout(() => {
        setLockProcess("Error");
      }, 1500);
    } else {
      setLockProcess("Validating...");
      setTimeout(() => {
        setLockProcess("Unlocking...");
      }, 1000);
      setTimeout(() => {
        setLoctStatus("Unlocked");
        setLockProcess("Ready");
        localStorage.removeItem("codeValues")
        localStorage.removeItem("lockValues")
        localStorage.removeItem("unlockCodes")
      }, 1500);
    }
  };

  // function to set safebox to service mode
  const serviceMode = () => {
    
    // compares the keyed in vales with that of the service code values in the system
    if(localStorage.getItem("serviceCode") === localStorage.getItem("codeValues")){
      setLockProcess("Validating...");
      setTimeout(() => {
        setLockProcess("Service");
      }, 1500);
    }
  }

  // function to pick values keyed in by the user
  const pickValue = (value) => {
    clearTimeout(timer);

    // assigning keyed in values to a new variable
    const newInput = lockCode + value.number;

    // updating the state of the code
    setlockCode(newInput);
    localStorage.setItem("codeValues", newInput);

    // setting the state of the timer
    settimer(
      setTimeout(() => {
        clearCode()
        localStorage.setItem("unlockCodes", newInput);
        unlockSafe();
        serviceMode()
      }, 1200)
    );

    return;
  };

  //clears the state that holds the codes
  const clearCode = () => {
    setlockCode("");
  };

  // console.log("codeService", codeService)



  useEffect(() => {
    localStorage.setItem("serviceCode", "000000")
  }, []);

  return (
    <div className="keyInputs">
      <div className="keyInputs_buttons">
        {keyBoardValues.map((value, index) => {
          return (
            <div key={index}>
              <button
                className="keyInputs_button"
                onClick={() => {
                  pickValue(value);
                }}
              >
                {value.number}
              </button>
            </div>
          );
        })}
        <button className="keyInputs_button" onClick={lockSafe}>
          L
        </button>
      </div>
    </div>
  );
}

export default KeyInput;
