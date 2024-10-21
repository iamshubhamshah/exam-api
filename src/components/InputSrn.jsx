import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import registrationServiceInstance from "../services/RegistrationFormService";
import AcknowledgementSlip from "./AcknowledgementSlip";
import { StudentContext } from "./ContextApi/StudentContextAPI/StudentContext";
import { UserContext } from "./ContextApi/UserContextAPI/UserContext";



function InputSrn({}) {

  const location = useLocation();


 let direcTo;
 let PutDirectTo;

 
if (location.pathname==='/srn-100'){
  direcTo = "/Registration-form/S100"
  PutDirectTo = "/Registration-form/put/S100"
} else {

    direcTo = "/Registration-form/MB"
  PutDirectTo = "/Registration-form/put/MB"

}
   
  const {setStudent} = useContext(StudentContext);
  const {student} = useContext(StudentContext);

  const [inputSrn, setInputSrn] = useState(null);
  const [id, setId] = useState('')
//   const [srn, setSrn] = useState('');
  //it checks the input srn value and matches with db using if and else condition. if value matches
  //... then renders Prefilled form other wise blank form.

  const [error, setError] = useState(null);
  const [isSrnMatched, setIsSrnMatched] = useState(false);
  const [errorRedirect, setErrorRedirect] = useState(false);

  const [ShowAck, setShowAck] = useState(false);

  const [slipData, setSlipData]= useState({});

 



  const handleSubmit = async function (e) {
    e.preventDefault();

   const newSrn = inputSrn
//    console.log(newSrn);

   
    try {
        const response = await registrationServiceInstance.getPostsBySrn(newSrn)
        console.log(response.data.data.srn)
        console.log(response.data.data._id)
        console.log(response.data.data.isVerified)
        setStudent(response.data.data)
        sessionStorage.setItem('user', JSON.stringify(response.data.data)); // Store user data in localStorage
        setSlipData(response.data.data); 

        if(response.data.data.isVerified != "" && response.data.data.isRegisteredBy === ""){
            
            setIsSrnMatched(true)
            setId(response.data.data._id)
        } else {
            setShowAck(true)
            setIsSrnMatched(false)

        }
        
        
    } catch (error) {
        console.error(error);
        setError("Correct SRN needed"); // Set error state for exceptions
        setErrorRedirect(true); // Trigger redirect on error

    }

   


  };


  if (isSrnMatched==true){
    return <Navigate to={PutDirectTo} state={{ srn: inputSrn, id:id}} />;
  } else if (ShowAck)  {
    return <AcknowledgementSlip slipData={slipData}/>;
  } else if (errorRedirect) {
    return <Navigate to={direcTo}/>; // Redirect to your error page
  }
    
  
  

  // if (isSrnMatched==true) {
  //   return <Navigate to="/Registration-form/put/MB" state={{ srn: inputSrn, id:id}} />;
  // } else if (errorRedirect) {
  //   return <Navigate to="/Registration-form/MB"/>; // Redirect to your error page
  // }




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
