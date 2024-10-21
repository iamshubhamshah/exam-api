//This component is the same as input srn but with a little bit of change. in future update i will try to use a single component with 
// dynamic changes. so that for the student login and student input srn functionlaity we can use same component.


import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import registrationServiceInstance from "../services/RegistrationFormService";
import {StudentContext} from './ContextApi/StudentContextAPI/StudentContext';



function StudentSignIn({}) {
   
//destructuring the StudentContext api to get setStudent state from StudentContext API.
const {setStudent} = useContext(StudentContext);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  const [inputSrn, setInputSrn] = useState(null);
  const [id, setId] = useState('') //Gets the student Id for updation in students' data


//   const [srn, setSrn] = useState('');
  //it checks the input srn value and matches with db using if and else condition. if value matches
  //... then renders Prefilled form other wise blank form.

  const [error, setError] = useState(null);
  const [isSrnMatched, setIsSrnMatched] = useState(false);
  const [errorRedirect, setErrorRedirect] = useState(false);


//After storing the data in setStudent ContextAPI we are updating student context
const {student} = useContext(StudentContext);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  const handleSubmit = async function (e) {
    e.preventDefault();

   const newSrn = inputSrn
//    console.log(newSrn);

   
    try {
        const response = await registrationServiceInstance.getPostsBySrn(newSrn)
        console.log(response.data.data.srn)
        console.log(response.data.data._id)

        if(response.data.data){
            setIsSrnMatched(true)
            setId(response.data.data._id)
            setStudent(response.data.data);
            console.log(student)

        } else {
            setIsSrnMatched(false)
           

        }
        
        
    } catch (error) {
        console.error(error);
        setError("Correct SRN needed"); // Set error state for exceptions
        setErrorRedirect(true) // It gives the message if error arrives then says register first.

    }

   


  };

  

  if (isSrnMatched==true) {
    return <Navigate to="/Student-dash" state={{ srn: inputSrn, id:id}} />;
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
        <label>Enter your SRN/RegistrationID/Aadhar to login to your account</label>
        <br />
        <input
          type="text"
          name="srn"
          placeholder="Enter Your SRN Here"
          onChange={(e) => setInputSrn(e.target.value)}
        />
        <br />
        <button>Submit</button>

        <br/>
        
        {errorRedirect  ? (
            <div>
                <p>You have not registered for MB l1 examinagtion</p>
                <p>Click here to Register yourself: <Link to={'/Registration-form/MB'}>Register For L1</Link></p>
            </div>
        ):null}
      </form>
      {console.log(inputSrn)}
    </div>
  );
}

export default StudentSignIn;
