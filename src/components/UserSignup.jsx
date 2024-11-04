import React, { useState } from "react";
import UserService from "../services/UserService";

import { Navigate, useNavigate } from "react-router-dom";
import DependentDropComponent from "./DependentDropComponent";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

//importing TwilioService for verification of numbers;

import TwilioService, { sendNotification } from "../services/TwilioService";

export default function UserSignUp() {
  let otp = "123456";

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [designation, setDesignation] = useState("");
  const [mobile, setMobile] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [school, setSchool] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [password, setPassword] = useState("");
  const [SuccessMessage, setSuccessMessage] = useState("");
  //dynamically showing otp input box:
  const [VerifyOtp, setVerifyOtp]= useState(false);
  //below hook for users typed otp
  const [inputOtp, setInputOtp] = useState('')
  //below hook for sending message to user as otp
  const message = `Enter this otp:  ${otp}  in registration portal and crete your password`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Generating Otp and sending to user for verification then show create password field

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    // Validation check (add your own validation logic)
    // if (
    //   !userName ||
    //   !designation ||
    //   !mobile ||
    //   !district ||
    //   !block ||
    //   !school ||
    //   !password
    // ) {
    //   setSuccessMessage("Please fill in all fields.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("designation", designation);
    formData.append("mobile", mobile);
    formData.append("district", district);
    formData.append("block", block);
    formData.append("school", school);
    formData.append("schoolCode", schoolCode);
    formData.append("password", password);

    try {
      const response = await UserService.PostUser(formData);
      console.log(response);

      if (response.data.success) {
        setSuccessMessage("User Registered Successfully");
        alert("User Registered Successfully");
        navigate("/user-signin");

        setUserName("");
        setDesignation("");
        setMobile("");
        setDistrict("");
        setBlock("");
        setSchool("");
        setPassword("");
      } else {
        setSuccessMessage("User not registered");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setSuccessMessage("An error occurred. Please try again.");
    }

    // Clear form fields

    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);

    e.target.reset();
  };

  //below function verifies the user number sending the 6 digit otp on their phones;

  async function handleVerifyNumberClick(e) {
    e.preventDefault();
    try {
      const response = await sendNotification(mobile, message);
      alert(`Message sent: ${response.success ? "success" : "Failed"}`);
    } catch (error) {
      alert("Failed to send message");
    }
  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //Below api uses Gooadvert api to send otp.
  const [otpStatus, setOtpStatus] = useState("");

  const handleGooadvertOtp = async () => {
    setVerifyOtp(true);
    const phoneNumber = "918191839118";
    const otpUrl = `http://sms.gooadvert.com/vendorsms/pushsms.aspx?APIKey=PupWft0zck6Q9nAYjvHCAg&msisdn=${phoneNumber}&sid=IHMBGA&msg=Dear User your OTP For Verification Is 278291.This Will Expire In 5 Min. Please Do Not Share your OTP With Anyone Regards BGroop.&fl=0&gwid=2`;

    try {
      const response = await fetch(otpUrl, {
        method: "GET",
        mode: "no-cors",
      });
      if (response.ok) {
        setOtpStatus("OTP sent successfully!");
      } else {
        setOtpStatus("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpStatus("An error occurred. Please try again.");
    }
  };

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  return (
    
    <Container style={{width:"60%"}}>
      
      <Form onSubmit={handleSubmit}>
        
        <Row className="border mb-3 rounded-2">
        <img src="" alt=" goes here" />
         <h1 style={{textAlign:'center'}}>User Signup Page</h1>
        </Row>
        <Row className="border mb-3 rounded-2" >
          <Col>
            <Form.Group className="mb-3" controlId="userNameInput">
              <Form.Label>Name:</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>
            </Col>
      <Col>
            <Form.Group>
              <Form.Label>Designation:</Form.Label>

              <Form.Select onChange={(e) => setDesignation(e.target.value)} required>
                <option value="">Select Designation</option>
                <option value="Teacher">Teacer</option>
                <option value="Principal">Principal</option>
                <option value="ABRC">ABRC</option>
                <option value="Coordinator">Co-ordinator</option>
              </Form.Select>
            </Form.Group>
            </Col>
            
        
            <DependentDropComponent
            setDistrict={setDistrict}
            setBlock={setBlock}
            setSchool={setSchool}
            setSchoolCode={setSchoolCode}
          />
        
            
        <Form.Group>
              <Form.Label>Enter Your Mobile:</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter Your Mobile"
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </Form.Group>

            {VerifyOtp ? (
              <Form.Group>
              <Form.Label>Verify Otp:</Form.Label>
  
                <Form.Control
                  type="tel"
                  placeholder="Enter Your Mobile"
                  onChange={(e) => setInputOtp(e.target.value)}
                  required
                />
                {inputOtp === otp ? (null):(<small>Type in correct otp for creating password</small>)}
              </Form.Group>
              
            ):(null)}

<Col>
            
            
              <Form.Group>
              <Form.Label>Enter Your Password:</Form.Label>
             
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <small>Your otp is correct. Please create your password</small>
            </Form.Group>
  


           
            

            {SuccessMessage && <p>{SuccessMessage}</p>}
          </Col>
        </Row>
        <Row className="border mb-3 rounded-2">
          
            <Button type="submit" style={{width:"100%"}}>Submit</Button>
          
        </Row>
      </Form>
      {/* <button onClick={handleVerifyNumberClick}>Verify Mobile Number</button>
      <button onClick={handleGooadvertOtp}> Verify OTP By goadvert</button> */}
    </Container>
   
  );
}
