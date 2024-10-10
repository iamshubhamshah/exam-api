import React, { useState, useContext } from "react";
import UserService from "../services/UserService";
import { Link, Navigate } from "react-router-dom";

import {UserContext} from "./ContextApi/UserContextAPI/UserContext";
import { Card } from "react-bootstrap";

import Navbar from "./Navbar";
import Footer from "./Footer";




export default function UserSignIn() {

    const {setUser} = useContext(UserContext);
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);
  const [isUserMatched, setIsUserMatched] = useState(false);
  const [errorRedirect, setErrorRedirect] = useState(false);


 

  



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
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage

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
    return <Navigate to="/user-page" />;  
  }

  return (
    
    <div style={{ display: "flex",
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
        height: "100vh", // Full viewport height
        textAlign: "center", // Center text
        backgroundColor: "#f5f5f5"}}>
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
          <button>Login</button>

          {errorRedirect && (
            <div>
              <p>Your Id and Password is Wrong.</p>
              <br />
              <p> SignUp first: <Link to="/user-signup">Go to signup Page</Link></p>
              
            </div>
          )}
        </form>
      </div>
  
      </Card.Body>
      </Card> 
    </div>
 
        
  );
}
