import React, { useState } from "react";
import UserService from "../services/UserService";
import { Card } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import DependentDropComponent from './DependentDropComponent';

export default function UserSignUp() {

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [designation, setDesignation] = useState("");
  const [mobile, setMobile] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check (add your own validation logic)
    if (
      !userName ||
      !designation ||
      !mobile ||
      !district ||
      !block ||
      !school ||
      !password
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("designation", designation);
    formData.append("mobile", mobile);
    formData.append("district", district);
    formData.append("block", block);
    formData.append("school", school);
    formData.append("password", password);

    try {
      const response = await UserService.PostUser(formData);
      console.log(response);

      if (response.data.success) {
        setMessage("User Registered Successfully");
        alert("User Registered Successfully");
        navigate('/user-signin');



        setUserName("");
        setDesignation("");
        setMobile("");
        setDistrict("");
        setBlock("");
        setSchool("");
        setPassword("");
      } else {
        setMessage("User not registered");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred. Please try again.");
    }

    // Clear form fields

    setTimeout(() => {
      setMessage("");
    }, 2000);

    e.target.reset();
  };

  return (
    <div className="userDiv"
      
    >
        
      <Card
      style={{border:'solid', height:'100vh' }}
      
      >
        <Card.Body style={{}}>
        <img src="" alt=" goes here"/>
          <form
        
            onSubmit={handleSubmit}
          >
            <label>Enter Your Name:</label>
            <br />
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <label>Enter Your Designation:</label>
            <br />

            <select   onChange={(e)=>setDesignation(e.target.value)} >
            <option value="">Select Designation</option>
              <option value="Teacher">Teacer</option>
              <option value="Principal">Principal</option>
              <option value="ABRC">ABRC</option>
              <option value="Coordinator">Co-ordinator</option>

            </select>
            
{/*             
            <input
              type="text"
              placeholder="Enter Your Designation"
              onChange={(e) => setDesignation(e.target.value)}
            /> */}
            <br />

            <label>Enter Your Mobile:</label>
            <br />
            <input
              type="tel"
              placeholder="Enter Your Mobile"
              onChange={(e) => setMobile(e.target.value)}
            />
            <br />


            <DependentDropComponent
                    setDistrict={setDistrict}
                    setBlock={setBlock}
                    setSchool={setSchool}
                    />
                





            {/* <label>Enter Your District:</label>
            <br />
            <input
              type="text"
              placeholder="Enter Your District"
              onChange={(e) => setDistrict(e.target.value)}
            />
            <br />

            <label>Enter Your Block:</label>
            <br />
            <input
              type="text"
              placeholder="Enter Your Block"
              onChange={(e) => setBlock(e.target.value)}
            />
            <br />

            <label>Enter Your School:</label>
            <br />
            <input
              type="text"
              placeholder="Enter Your School"
              onChange={(e) => setSchool(e.target.value)}
            />
            <br /> */}

            <label>Enter Your Password:</label>
            <br />
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
            {message && <p>{message}</p>}
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
