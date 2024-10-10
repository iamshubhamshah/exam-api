import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import registrationServiceInstance from "../services/RegistrationFormService";

function InputSrn({}) {
   


  const [inputSrn, setInputSrn] = useState(null);
//   const [srn, setSrn] = useState('');
  //it checks the input srn value and matches with db using if and else condition. if value matches
  //... then renders Prefilled form other wise blank form.

  const [error, setError] = useState(null);
  const [isSrnMatched, setIsSrnMatched] = useState(false);
  const [errorRedirect, setErrorRedirect] = useState(false);





  const handleSubmit = async function (e) {
    e.preventDefault();

   const newSrn = inputSrn
//    console.log(newSrn);

   
    try {
        const response = await registrationServiceInstance.putPosts(newSrn)
        console.log(response.data.data.srn)

        if(response.data.data){
            setIsSrnMatched(true)
        } else {
            setIsSrnMatched(false)

        }
        
        
    } catch (error) {
        console.error(error);
        setError("Correct SRN needed"); // Set error state for exceptions
        setErrorRedirect(true); // Trigger redirect on error

    }

   


  };

  

  if (isSrnMatched==true) {
    return <Navigate to="/Registration-form/put/MB" state={{ srn: inputSrn}} />;
  } else if (errorRedirect) {
    return <Navigate to="/Registration-form/MB" />; // Redirect to your error page
  }




  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full height of the viewport
      }}
    >
      <form
        id="InputSrn"
        style={{
          width: "500px",
          height: "500px",
          border: "1px solid #000",
          display: "flex",
          flexDirection: "column", // Stack elements vertically
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50px",
          borderWidth: "3px",
        }}
        onSubmit={handleSubmit}
      >
        <img src="" alt="logo goes here" />
        <label>ENTER YOUR SRN</label>
        <br />
        <input
          type="text"
          name="srn"
          placeholder="Enter Your SRN Here"
          onChange={(e) => setInputSrn(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>
      {console.log(inputSrn)}
    </div>
  );
}

export default InputSrn;
