//This component is the same as input srn but with a little bit of change. in future update i will try to use a single component with
// dynamic changes. so that for the student login and student input srn functionlaity we can use same component.

import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import registrationServiceInstance from "../services/RegistrationFormService";
import { StudentContext } from "./ContextApi/StudentContextAPI/StudentContext";
import { Nav, Col, Row, Container, Form } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";


function StudentSignIn({}) {
  //destructuring the StudentContext api to get setStudent state from StudentContext API.
  const { setStudent } = useContext(StudentContext);
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  const [inputSrn, setInputSrn] = useState(null);
  const [slipId, setSlipId] = useState(null);
  const [id, setId] = useState(""); //Gets the student Id for updation in students' data

  //   const [srn, setSrn] = useState('');
  //it checks the input srn value and matches with db using if and else condition. if value matches
  //... then renders Prefilled form other wise blank form.

  const [error, setError] = useState(null);
  const [isSrnMatched, setIsSrnMatched] = useState(false);
  const [errorRedirect, setErrorRedirect] = useState(false);
  const [RegisterFrist, setRegisterFrist] = useState(false);

  //After storing the data in setStudent ContextAPI we are updating student context
  const { student } = useContext(StudentContext);
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  const handleSubmit = async function (e) {
    e.preventDefault();

    const newSrn = inputSrn;
    //    console.log(newSrn);

    try {
      const response = await registrationServiceInstance.getPostsBySrn(newSrn);
      

      const SrnSlipId = response.data.srn || inputSrn;

      if (
        response.data.data.srn === SrnSlipId &&
        response.data.data.isVerified != "" && response.data.data.grade === "8" && response.data.data.rollNumber != ""
      ) {
        setIsSrnMatched(true);
        setId(response.data.data._id);
        setStudent(response.data.data);
        sessionStorage.setItem("user", JSON.stringify(response.data.data)); // Store user data in localStorage

        console.log(student);
      } else {
        setErrorRedirect(true);
        setIsSrnMatched(false);
        alert('Admit cards are only available for Mission Buniyaad, and if you are a Mission Buniyaad student, you can download your admit card after 2 days. (प्रवेश पत्र केवल मिशन बुनियाद के लिए उपलब्ध हैं और यदि आप मिशन बुनियाद के छात्र हैं, तो आप अपना प्रवेश पत्र 2 दिनों बाद डाउनलोड कर सकते हैं।)')
      }
    } catch (error) {
      console.error(error);
      setError("Correct SRN needed"); // Set error state for exceptions
      setErrorRedirect(true); // It gives the message if error arrives then says register first.
      setRegisterFrist(true);
      alert('Admit cards are only available for Mission Buniyaad, and if you are a Mission Buniyaad student, you can download your admit card after 2 days. (प्रवेश पत्र केवल मिशन बुनियाद के लिए उपलब्ध हैं और यदि आप मिशन बुनियाद के छात्र हैं, तो आप अपना प्रवेश पत्र 2 दिनों बाद डाउनलोड कर सकते हैं।)')
    }
  };

  if (isSrnMatched == true) {
    return <Navigate to="/Student-dash" state={{ srn: inputSrn, id: id }} />;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Navbar />
          <div>
          <br/>
          </div>

          <Row
            style={{
              display: "flex",
              alignItems: "center", // Center vertically
              justifyContent: "center", // Center horizontally
              height: "65vh", // Full viewport height
              textAlign: "center", // Center text
            }}
          >
            <form
              id="InputSrn"
              style={{
                display: "",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: "500px",
                height: "100%",
                border: "solid",
                borderRadius: "20px",
              }}
              onSubmit={handleSubmit}
            >
              <div>
                <h3>
                  Student-Login. (विद्यार्थी लॉगिन|)
                </h3>
                <h6 style={{color:'red'}}>Download Mission Buniyaad Level 1 Admit Card. (मिशन बुनियाद लेवल 1 प्रवेश पत्र डाउनलोड करें।)</h6>
                <hr/>
              </div>
              <label>SRN Number or Slip ID (अपना एस.आर.एन नंबर दर्ज करें| Or अपना स्लिप आईडी नंबर दर्ज करें।)</label>
              <br />
              <input
                type="text"
                name="srn"
                placeholder="अपना एस.आर.एन नंबर दर्ज करें|"
                onChange={(e) => setInputSrn(e.target.value)}
              />
              <br /><br />
              {/* <label>Slip ID (अपना स्लिप आईडी नंबर दर्ज करें।)</label>
              <br/>
              <input
                type="text"
                name="slipId"
                placeholder="अपना स्लिप आई.डी दर्ज करें।"
                onChange={(e) =>{ setSlipId(e.target.value)}}
              />
              <br/><br/> */}
              <button>Submit</button>

              <br />

              {errorRedirect ? (
                <div>
                  <p>If You have not registered for Level 1 examination then click below:</p>
                  <p>
                    Click here to Register yourself:{" "}
                    <Link to={"/"}>Register For L1</Link>
                  </p>
                </div>
              ) : null}
            </form>
            {console.log(inputSrn)}
          </Row>
        </Row>
        <div>
          <br/>
        </div>
        
      </Container>

      <Footer />
    </>
  );
}

export default StudentSignIn;
