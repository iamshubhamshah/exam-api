import React, { useState, useEffect, useContext } from "react";
import RegistrationFormService from "../services/RegistrationFormService";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import DependentDropComponent from "./DependentDropComponent";
import { UserContext } from "./ContextApi/UserContextAPI/UserContext";
import AcknowledgementSlip from "./AcknowledgementSlip";
import "../index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StudentContext } from "./ContextApi/StudentContextAPI/StudentContext";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//React boottrap css-------------------
import "bootstrap/dist/css/bootstrap.min.css";

import {Container, Row, Col, Form, Card, Button, CardFooter } from "react-bootstrap";
//_____________________________

//-----------------------------------

export default function RegistrationFormComponent() {
  const { user } = useContext(UserContext);
  const {setStudent} = useContext(StudentContext); // it updates, on the basis of SlipData

  const navigate = useNavigate();
  const location = useLocation();

  //this below code dynamically updates the isRegisteredBy schema in the db on the basis of url.

  let isRegisteredBy;
  let grade;

  //Acknowledgment slip id generation

  //
  if (location.pathname === "/Registration-form/MB") {
    // isRegisteredBy = "Self"
    grade = "8";
    console.log("I am /Registration-form/MB ");
  } else if (location.pathname === "/Registration-form/S100") {
    console.log("i am s100 registration form");
    grade = "10";
  }

//Dynamically sets the header in the form
let FormHeader;
if (location.pathname === '/Registration-form/MB'){
  FormHeader = 'Mission Buinyaad Registration 2025-27'
} else if (location.pathname === '/Registration-form/S100'){
    FormHeader = 'Super 100 Registration 2025-27'
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //---------------------------------------------------------------------------------------------------
  const [userObj, setUserObj] = useState(null);
  const [srn, setSrn] = useState("");
  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [school, setSchool] = useState("");
  // const [grade, setGrade] = useState('');
  const [image, setImage] = useState(""); // For file uploads
  // const [isRegisteredBy] = useState('Self')
  const [message, setMessage] = useState("");
  const [manualSchool, setshowManualSchool] = useState(false);
  //School code from manual entry
  const [schoolCode, setSchoolCode] = useState("");

  //For managing AcknowledgementSlip
  const [showAck, setShowAck] = useState(false);
  //For managing the data of student on slip
  const [slipData, setSlipData] = useState({});

  const [errors, setErrors] = useState("");

  if (user) {
    isRegisteredBy = user.mobile;
  } else {
    isRegisteredBy = "Self";
  }

  //Acknowledgement id generation logic below.

  //Logic goes: slicing three digits of name and slicing last 5 digits of srn and then combining it to create SlipID

  let slicedName = name.slice(0, 3);
  let slicedSrn = srn.slice(5);

  let slipId = (slicedName + slicedSrn).toUpperCase();

  console.log(slipId);
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  useEffect(() => {
    setUserObj(user);
  }, [user]);

  //Below logics puts the validation on the form.
  const [errSrn, setErrSrn] = useState(true);
  const [errName, setErrName] = useState(true);
  const [errFather, setErrFather] = useState(true);
  const [errMother, setErrMother] = useState(true);
  const [errDob, setErrDob] = useState(true);
  const [errGender, setErrGender] = useState(true);
  const [errCategory, setErrCategory] = useState(true);
  const [errAadhar, setErrAadhar] = useState(true);
  const [errMobile, setErrMobile] = useState(true);
  const [errWhatsapp, setErrWhatsapp] = useState(true);
  const [errAddress, setErrAddress] = useState(true);
  const [errDistrict, setErrDistrict] = useState(true);
  const [errBlock, setErrBlock] = useState(true);
  const [errSchool, setErrSchool] = useState(true);

  //if all the validation passes then below state hook lets the send data;
  const [formValidated, setFormValidated] = useState(false);

  function formValidation() {
    if (srn.length === 10 && /[^\d]/.test(srn) == false) {
      setErrSrn(false);
    } else {
      setErrSrn(true);
      toast.error("Srn must contain only 10 digits");
    }

    if (/\d/.test(name) == false && name.length != 0) {
      setErrName(false);
    } else {
      setErrName(true);
      toast.error("Student Name must not contain any Number");
    }
    if (/\d/.test(father) == false && father.length != 0) {
      setErrFather(false);
    } else {
      setErrFather(true);
      toast.error("Father name must not contain any Number");
    }
    if (/\d/.test(mother) == false && mother.length != 0) {
      setErrMother(false);
    } else {
      setErrMother(true);
      toast.error("Mother name must not contain any Number");
    }

    //Below check is for dob.
    if (dob !== "") {
      setErrDob(false);
    } else {
      setErrDob(true);
      toast.error("Selct your D.O.B");
    }

    if (gender !== "") {
      setErrGender(false);
    } else {
      setErrGender(true);
      toast.error("Select Gender");
    }

    if (category !== "") {
      setErrCategory(false);
    } else {
      setErrCategory(true);
      toast.error("Select Category");
    }

    //checks if the srn has exact 12 digits and does not contain any apphabet.

    if (aadhar.length === 12 && /[^\d]/.test(aadhar) == false) {
      setErrAadhar(false);
    } else {
      setErrAadhar(true);
      toast.error(
        "Aadhar number should have 12 digits only and must not contain any alphabet"
      );
    }

    //below check for mobile validation
    if (mobile.length === 10 && /[^\d]/.test(mobile) == false) {
      setErrMobile(false);
    } else {
      setErrMobile(true);
      toast.error(
        "Mobile number should contain 10 digits only and must not contain any alphabet"
      );
    }

    //below check for whatsapp validation

    if (whatsapp.length === 10 && /[^\d]/.test(whatsapp) == false) {
      setErrWhatsapp(false);
    } else {
      setErrWhatsapp(true);
      toast.error(
        "Whatsapp number should contain 10 digits only and must not contain any alphabet"
      );
    }

    //below check for address validation
    if (address.length !== 0) {
      setErrAddress(false);
    } else {
      setErrAddress(true);
      toast.error("Please fill your address");
    }

    //below check for district validation
    if (district.length !== 0) {
      setErrDistrict(false);
    } else {
      setErrDistrict(true);
      toast.error("Please select your district");
    }

    //below check for block validation
    if (block.length !== 0) {
      setErrBlock(false);
    } else {
      setErrBlock(true);
      toast.error("Please select your block");
    }

    //below check for school validation
    if (school.length !== 0) {
      setErrSchool(false);
    } else {
      setErrSchool(true);
      toast.error("Please select your school");
    }
  }

  function formValidate() {
    if (
      errSrn === false &&
      errName === false &&
      errFather === false &&
      errMother === false &&
      errDob === false &&
      errGender === false &&
      errCategory === false &&
      errAadhar === false &&
      errMobile === false &&
      errWhatsapp === false &&
      errAddress === false &&
      errDistrict === false &&
      errBlock === false &&
      errSchool === false
    ) {
      // All error states are
      setFormValidated(true);
      console.log("All error states are clear.");
    } else {
      setFormValidated(false);
      console.log("All states are not cleared.");
    }
  }

  useEffect(() => {
    formValidate();
   
  
  }, [
    errSrn,
    name,
    errFather,
    errMother,
    errDob,
    errGender,
    errCategory,
    errAadhar,
    errMobile,
    errWhatsapp,
    errAddress,
    errDistrict,
    errBlock,
    errSchool,
  ]);

  console.log("Blow  if formValidated")
  console.log(formValidated)
  //Belwo useEffect only runs when formvalidated is true
  useEffect(() => {
    // Only call handleSubmit if formValidated is true
    if (formValidated) {
        handleSubmit();
    }
}, [formValidated]);

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  const handleSubmit = async (e) => {
   if(e) e.preventDefault();

    // Call the formValidation function
    formValidation();

    // Check if the form is validated
    if (!formValidated) {
    //   toast.error("Please fix the errors before submitting the form.");
      return; // Stop execution if validation fails
    } else {
      toast.success("registration done");
    }

    try {
      const formData = new FormData();
      formData.append("srn", srn);
      formData.append("name", name);
      formData.append("father", father);
      formData.append("mother", mother);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("category", category);
      formData.append("aadhar", aadhar);
      formData.append("mobile", mobile);
      formData.append("whatsapp", whatsapp);
      formData.append("address", address);
      formData.append("district", district);
      formData.append("block", block);
      formData.append("school", school);
      formData.append("grade", grade);
      formData.append("image", image);
      formData.append("isRegisteredBy", isRegisteredBy);
      formData.append("schoolCode", schoolCode);
      formData.append("slipId", slipId);

      console.log(slipId);

      //Below piece of code converts the formData into JSON Object to show it in a Slip
      const SlipData = {};
      formData.forEach((value, key) => {
        SlipData[key] = value;
      });

      console.log(SlipData);
      setSlipData(SlipData);
      setStudent(SlipData);
      console.log(slipData); //It will not directly log the data but, yes it will store the data in slipData hook(It is something related to useEffect hook)
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

      const response = await RegistrationFormService.RegistrationCreate(
        formData
      );

      console.log(response.data.data);
      console.log(slipData);

      if (response.data.success === true) {
        setMessage("Post created successfully");
        toast.success("Registration done succesfully");
        if(location.pathname==='/Registration-form/S100'){
            navigate('/acknowledgementslip-100')
            console.log('true is s100')
        }else if (location.pathname ==='/Registration-form/MB'){
            navigate('/acknowledgementslip-mb')
            console.log('true is mbs')
        }
        // setShowAck(true);

        // navigate('/srn')  //after successfull updation of data it routes back to the inputsrn page
      } else {
        setMessage("Post not created");
      }
      setImage("");

      setTimeout(function () {
        setMessage("");
      }, 2000);

      e.target.reset();
    } catch (error) {
      console.log("Some error occured");

      // alert('fill the form properly')
    }
  };

  // It has a CSS in Index.css
  return (
    <Container>
      <h1>{FormHeader}</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="border mb-3 rounded-2">
          <Col xs={12} >
            <Form.Group className="mb-3" controlId="srnInput">
              <Form.Label>Enter Your SRN:</Form.Label>
              <Form.Control
                type="text"
                name="srn"
                placeholder="Enter Your SRN"
                onChange={(e) => setSrn(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="border mb-3 rounded-2">
          <Col xs={12} md={6} className="border-end p-3">
          <h2>Personal Details:</h2>
            <Form.Group className="mb-3" controlId="nameInput">
              <Form.Label>Enter Your Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fatherInput">
              <Form.Label>Enter Your Father's Name:</Form.Label>
              <Form.Control
                type="text"
                name="father"
                placeholder="Enter Your Father Name"
                onChange={(e) => setFather(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="motherInput">
              <Form.Label>Enter Your Mother's Name:</Form.Label>
              <Form.Control
                type="text"
                name="mother"
                placeholder="Enter Your Mother Name"
                onChange={(e) => setMother(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dobInput">
              <Form.Label>Enter Your D.O.B:</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="genderSelect">
              <Form.Label>Enter Your Gender:</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="categorySelect">
              <Form.Label>Enter Your Category:</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Your Category</option>
                <option value="BCA">BCA</option>
                <option value="BCB">BCB</option>
                <option value="GEN">GEN</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="aadharInput">
              <Form.Label>Enter Your 12 digits Aadhar Number:</Form.Label>
              <Form.Control
                type="text"
                name="aadhar"
                placeholder="Enter Your Aadhar Number"
                onChange={(e) => setAadhar(e.target.value)}
              />
            </Form.Group>
          </Col>

          {/* Second Column inside the Second Row */}
          <Col className="border-end p-3">
          <h2>Contact Details:</h2>
            <Form.Group className="mb-3" controlId="mobileInput">
              <Form.Label>Enter Your 10 digits Mobile Number:</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                placeholder="Enter Your Mobile Number"
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="whatsappInput">
              <Form.Label>Enter Your 10 digits Whatsapp Number:</Form.Label>
              <Form.Control
                type="text"
                name="whatsapp"
                placeholder="Enter Your Whatsapp Number"
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="addressInput">
              <Form.Label>Enter Your Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Your Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

             {/* Nested Row inside a second column of the second Row    */}

            
                <h2>Academic Details:</h2>
                <DependentDropComponent
                  setDistrict={setDistrict}
                  setBlock={setBlock}
                  setSchool={setSchool}
                  setshowManualSchool={setshowManualSchool}
                  setSchoolCode={setSchoolCode}
                />
               
                
                
                <Form.Group className="mb-3" controlId="gradeSelect">
                  <Form.Label>Enter Your Grade:</Form.Label>
                  <Form.Select value={grade}>
                    <option value="8">8</option>
                    <option value="10">10</option>
                  </Form.Select>
                </Form.Group>
              
               {/* ^^^^^Nested Row inside a second column of the second Row ^^^^*/}
            
          </Col>
           {/*^^^ Second Column inside the Second Row^^^*/}
        </Row>

        <Row className="border mb-3 rounded-2">
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="photoInput">
              <Form.Label>Upload your photo:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Button type="submit">Register</Button>
          </Col>
        </Row>
      </Form>

      <p>{message}</p>
      {manualSchool ? <div>Data found</div> : <p>Not found data</p>}

      {/* {showAck ? (
        <AcknowledgementSlip showAck={showAck} slipData={slipData} />
      ) : null} */}
    </Container>
  );
}
