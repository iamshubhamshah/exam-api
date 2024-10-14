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
import { Card, Button } from "react-bootstrap";
import RegistrationFormComponent from "./RegistrationFormComponent";

import { UserContext } from "./ContextApi/UserContextAPI/UserContext";
import UserRegistrationPageMB from "../pages/UserRegistrationPageMB";
import UserRegistrationPage100 from "../pages/UserRegistrationPage100";


export default function UserPage() {
  const [mb, setMB] = useState(false);
  const [s100, setS100] = useState(false);
  const [is8ButtonVisible, setIs8ButtonVisible] = useState(true);
  const [is10ButtonVisible, setIs10ButtonVisible] = useState(true);

  const { user } = useContext(UserContext);

  const name = user.userName; //taking the value from userContext api. 

  useEffect (()=>{
    const button8State = sessionStorage.getItem('button8Visible')
    if(button8State === 'false'){
        setIs8ButtonVisible(false)
        setIs10ButtonVisible(false)
        setMB(true)
        
    }
  },[mb])

  useEffect (()=>{
    const button10State = sessionStorage.getItem('button10Visible')
    if(button10State === 'false'){
        setIs10ButtonVisible(false);
        setIs8ButtonVisible(false);
        setS100(true)
    }
  })


  // Below function use the sessionStorageg so that on the page refresh the usestate don't change and hides the button and 
  // renders desired data conditionally.

  const handleClick8 = () => {
    setMB(true);
    setIs8ButtonVisible(false);
    setIs10ButtonVisible(false);
    sessionStorage.setItem('button8Visible', 'false');
  };


  //conditionally handles condition when user clicks on the class 10th button.

  const handleClick10 = () => {
    setS100(true);
    setIs10ButtonVisible(false);
    setIs8ButtonVisible(false);
    sessionStorage.setItem('button10Visible', 'false')
  };




  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "50rem", height: "45rem" }} className="text-center">
        <Card.Body>
          <Card.Title>Hello</Card.Title>
          <Card.Text>
            <p>{name}</p>
          </Card.Text>
          <hr></hr>
          <div>
          {is10ButtonVisible ? (
    <div>
 <br />
          <br />
          <Button onClick={handleClick10}>
            Register Missino Buinyaad: Class 10th Students
          </Button>
    </div>
):null}

<br/>
          </div>

         

          {is8ButtonVisible ? (
            <div>
              <Button onClick={handleClick8}>
                Register Missino Buinyaad: Class 8th Students
              </Button>
            </div>
          ) : null}

          {mb ? <div><UserRegistrationPageMB/></div> : null}

          {s100 ? (
            <div>
                <UserRegistrationPage100/>
            </div>
          ):null}

        </Card.Body>
      </Card>
    </div>
  );
}
