import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../Services/redux/reduxHooks";
import { getMasterSafeCode } from "../../Services/redux";

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
  lockProcess,
}) {
  const dispatch = useAppDispatch();

  // declaring of states
  const [timer, settimer] = useState(null);
  const [lockCode, setlockCode] = useState("");

  // function to lock safe
  const lockSafe = () => {
    // checks if the length of code is not equal 6
    if (lockCode.length !== 6) {
      setLockProcess("Code should be equal to 6 digits");
      clearTimeout(timer);
      setTimeout(()=> {
        setLockProcess("");
        window.location.reload()
      }, 1500)
      return;
    }else{
      setLockProcess("Locking...");
      clearCode();
      clearTimeout(timer);
      localStorage.setItem("lockValues", lockCode);
      setTimeout(() => {
        setLoctStatus("Locked");
        setLockProcess("");
      }, 1000);
    }
  }


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

        // removes specified values from local storage
        localStorage.removeItem("codeValues");
        localStorage.removeItem("lockValues");
        localStorage.removeItem("unlockCodes");
      }, 1500);
    }
  };

  // function to set safebox to service mode
  const serviceMode = () => {
    // compares the keyed in vales with that of the service code values in the system
    if (
      localStorage.getItem("serviceCode") === localStorage.getItem("codeValues")
    ) {
      setLockProcess("Validating...");
      setTimeout(() => {
        setLockProcess("Service");
      }, 1500);

      // removes specified values from local storage
      localStorage.removeItem("codeValues");
      localStorage.removeItem("unlockCodes");
    }
  };

  // function to pick values keyed in by the user
  const pickValue = (value) => {
    clearTimeout(timer);

    // assigning keyed in values to a new variable
    const newInput = lockCode + value.number;

    // updating the state of the code
    setlockCode(newInput);
    localStorage.setItem("codeValues", newInput);

    if (lockProcess === "Service") {
      setTimeout(() => {
        getMasterCode();
        localStorage.removeItem("codeValues");
      }, 10000);
    } else {
      // setting the state of the timer
      settimer(
        setTimeout(() => {
          clearCode();
          localStorage.setItem("unlockCodes", newInput);
          if (localStorage.getItem("codeValues") === "000000") {
            serviceMode();
          } else {
            unlockSafe();
          }
        }, 1200)
      );
    }

    return;
  };

  //clears the state that holds the codes
  const clearCode = () => {
    setlockCode("");
  };

  // hit endpoint to get master code
  const getMasterCode = async() => {
    await dispatch(getMasterSafeCode(localStorage.getItem("codeValues")))
      .then((response) => {
        if (response.payload.sn === localStorage.getItem("serialNumber")) {
          localStorage.setItem("serialNumber", response.payload.sn);
          setTimeout(() => {
            setLockProcess("Ready");
            setLoctStatus("Unlocked");
          }, 2000)
          console.log("serial number matches");
        } else {
          console.log("serial number doesnt match");
        }
      })
      .catch((error) => {
        console.log("response", error);
      });
  };


  useEffect(() => {
    // setting the service code and serial number for hotel staffs to change safe status
    // to service mode when guests forget their password
    localStorage.setItem("serviceCode", "000000");
    localStorage.setItem("serialNumber", "S/N: 4815162342");
  }, [lockCode]);

  return (
    <div className="keyInputs">
      <div className="keyInputs_buttons">
        {keyBoardValues.map((value, index) => {
          return (
            <div key={index}>
              <button
              data-testid="buttonValues"
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
        <button className="keyInputs_button" data-testid="lockButton" onClick={lockSafe} >
          L
        </button>
      </div>
    </div>
  );
}

export default KeyInput;
