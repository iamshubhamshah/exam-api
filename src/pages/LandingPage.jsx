//For 'Other Schools' where there are school code present in a collections of students registration, those schools will be counted in 'other schols'. According to my logic.

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import StudentSignIn from "../components/StudentSignIn";
import { Nav, Col, Row, Container } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";


export default function LandingPage() {
  const [ShowStudentSignIn, setShowStudentSignIn] = useState(false);

  const handleClickforStudentSignin = () => {
    // setShowStudentSignIn(true);
    // 
  };
  return (
    <div>
      <Navbar /> 
      <br></br>
      {/* <Nav defaultActiveKey="/userprofile" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/user-signup">Officials/Stsdlfnaff Signup</Nav.Link>
        </Nav.Item>

        
        <hr/>
      </Nav> */}
      <Container fluid>
        <Row className="justify-content-right "></Row>

        <Container >
          <Row>
            <Col className="text-center">
            
            <Link  to="/srn" style={{textDecoration:'none', fontSize:'25px'}}>
            <p><BsArrowRight className="blinking-link" />Mission Buniyaad Registration Class 8th <br/>(मिशन बुनियाद परीक्षा के लिए, कक्षा 8 के विद्यार्थी यहाँ क्लिक करें)</p> 
            </Link>
            <br />
           
            
            <Link to="/srn-100" style={{textDecoration:'none', fontSize:'25px'}}>
            <p><BsArrowRight className="blinking-link" /> Haryana Super 100 Registration Class 10th <br/> (हरियाणा सुपर 100 परीक्षा के लिए, कक्षा 10 के विद्यार्थी यहाँ क्लिक करें)</p>
            </Link>
            <br />
            
            <Link to="/user-signin" style={{textDecoration:'none', fontSize:'25px'}}>
           <p><BsArrowRight className="blinking-link" />SCHOOL/ABRC/BRP/Officials Login (स्कूल/ABRC/BRP/अन्य अधिकारी यंहा क्लिक करे)</p>
            </Link>

            <br />
           
            {/* //Below Student Login is just for testing purpose right now. I will place it at it's right place in future. */}
            </Col>
          </Row>
        </Container>
      </Container>
      <br />
      <br />
      <Footer />
      {ShowStudentSignIn ? (
        <div>
          <StudentSignIn />
        </div>
      ) : null}

    </div>
  );
}
