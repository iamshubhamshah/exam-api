//This component is linked with pages/UserRegistrationPage100 and UserRegistrationMB

import React, { useState, useEffect, useContext } from "react";
import UserService from "../services/UserService";
import UserSignUp from "./UserSignup";
import {
  Link,
  Form,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import UserParentComponent from "./UserParentComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import RegistrationFormComponent from "./RegistrationFormComponent";

import { UserContext } from "./ContextApi/UserContextAPI/UserContext";
import UserRegistrationPageMB from "../pages/UserRegistrationPageMB";
import UserRegistrationPage100 from "../pages/UserRegistrationPage100";
import UserNavBar from "./UserNavBar";

export default function UserPage() {

  try {
    
  } catch (error) {
    
  }
  const [mb, setMB] = useState(false);
  const [s100, setS100] = useState(false);
  const [is8ButtonVisible, setIs8ButtonVisible] = useState(true);
  const [is10ButtonVisible, setIs10ButtonVisible] = useState(true);

  const { user } = useContext(UserContext);

   //taking the value from userContext api.

  useEffect(() => {
    const button8State = sessionStorage.getItem("button8Visible");
    if (button8State === "false") {
      setIs8ButtonVisible(false);
      setIs10ButtonVisible(false);
      setMB(true);
    }
  }, [mb]);

  useEffect(() => {
    const button10State = sessionStorage.getItem("button10Visible");
    if (button10State === "false") {
      setIs10ButtonVisible(false);
      setIs8ButtonVisible(false);
      setS100(true);
    }
  });

  // Below function use the sessionStorageg so that on the page refresh the usestate don't change and hides the button and
  // renders desired data conditionally.

  const handleClick8 = () => {
    setMB(true);
    setIs8ButtonVisible(false);
    setIs10ButtonVisible(false);
    sessionStorage.setItem("button8Visible", "false");
  };

  //conditionally handles condition when user clicks on the class 10th button.

  const handleClick10 = () => {
    setS100(true);
    setIs10ButtonVisible(false);
    setIs8ButtonVisible(false);
    sessionStorage.setItem("button10Visible", "false");
  };

  return (
    <div
    >
    <UserNavBar />
    <Container style={{
      display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',   // Centers horizontally
      alignItems: 'center',       // Centers vertically
      height: '50vh'             // Takes full viewport height
    }}>
    
    <Row >
      <Col >
     <Link to={'/userprofile/registration-mb'}><Button style={{width:'300px'}} >Click Here for 8th Class Registratoin</Button></Link> 
      <br></br>
      <br></br>
      <Link to={'/userprofile/registration-100'}> <Button style={{width:'300px'}}>Click Here for 10th Class Registratoin</Button></Link> 
      <br></br>
      <br></br>
      <Link to={'/userprofile/dashboard-mb'}><Button style={{width:'300px'}}>DashBoard</Button></Link> 
      </Col>
      
    </Row>
    <br></br>
    <Row>
      <Col>Video Grid here for How to</Col>
     
    </Row>
    
    
    </Container>
    
    </div>
  )
}