import React, { useState, useContext, useEffect } from "react";
import UserService from "../services/UserService";
import { Link, Navigate, useLocation} from "react-router-dom";

import {UserContext} from "./ContextApi/UserContextAPI/UserContext";
import { Button, Card, Container, Col, Nav, Row } from "react-bootstrap";

import Navbar from "./Navbar";
import Footer from "./Footer";




export default function UserSignIn() {

  const location = useLocation();

  



    const {setUser} = useContext(UserContext);
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);
  const [isUserMatched, setIsUserMatched] = useState(false);
  const [errorRedirect, setErrorRedirect] = useState(false);




  useEffect(() => {
    // Check if we're landing on the /user-signin page
    if (location.pathname === "/user-signin") {
      setUser('')

      console.log("UserContext api set to 0 so that user can't use forward navigation for loggin in");

      // Perform the action you want when returning to /user-signin
      // For example, you could reset a state, call an API, or redirect
    }
  }, [location.pathname]); // Triggers whenever the path changes

 
  

  



  const handleSubmit = async function (e) {
    e.preventDefault();

    try {
      const response = await UserService.GetUser(mobile);
      // console.log(response.data.data.mobile)
      // console.log(response.data.data.password)
      const dbMobile = response.data.data.mobile;
      const dbPassword = response.data.data.password;

      if (dbMobile === mobile && dbPassword === password) {
        setIsUserMatched(true);
        const userData = response.data.data;
        setUser(userData); // Update context state
        sessionStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage

        alert("You are logged in");
        // onMobileSubmit(mobile)
        // onPasswordSubmit(password)
       
      } else {
        setIsUserMatched(false);
        if (dbMobile === mobile){
            setErrorRedirect(true)
        }
      }
    } catch (error) {
      console.error(error);

      setErrorRedirect(true);
    }
  };

//   state={{mobile:mobile}}

  if (isUserMatched === true) {
    return <Navigate to="/userprofile" />;  
  }

  return (
    <Container fluid>
       <Row>
      <Navbar/>
     
      <Nav defaultActiveKey="/userprofile" as="ul">
      
      <Nav.Item as="li">
        <Nav.Link href="/examination">Go To Main Page</Nav.Link>
      </Nav.Item>
     
    </Nav>
    
      
      
    
    <div style={{ display: "flex",
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
        height: "65vh", // Full viewport height
        textAlign: "center" // Center text
        }}>
              <Card style={{width:'50rem', height:'30rem', alignContent:"center", borderRadius:"30px",
                borderColor: 'grey',
                border: 'solid'
              }}>
                
              <Card.Body>
                
        
      <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center', 
            width: '100%', 
            height: '100%', 
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <img src="" alt="Logo goes here" />
          </div>
          <div>
            <p>Login to your account</p>
          </div>
          <label>Enter Your Mobile Number: </label>
          <br />
          <input
            type="text"
            name="mobile"
            placeholder="Enter Your Mobile"
            onChange={(e) => setMobile(e.target.value)}
          />
          <br />
          <label>Enter Your Password: </label>
          <br />
          <input
            type="text"
            name="password"
            placeholder="Enter Your Mobile"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button onClick={handleSubmit}>Login</Button>

          

          {errorRedirect && (
            <div>
              <p>Your Id and Password is Wrong.</p>
              <br />
              <p> SignUp first: <Link to="/user-signup">Go to signup Page</Link></p>
              
            </div>
          )}
        </form>
        
        <br/>
        <Link to={'/user-signup'}><Button>Create your account</Button></Link>
      </div>
  
      </Card.Body>
      </Card> 
    </div>
    </Row>
    <br></br>
    <br></br>
    <Footer/>
    </Container>
 
        
  );
}
