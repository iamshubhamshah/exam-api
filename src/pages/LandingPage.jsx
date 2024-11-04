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
      <Nav defaultActiveKey="/userprofile" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/user-signup">Officials/Staff Signup</Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link onClick={handleClickforStudentSignin}>
            Student Login
          </Nav.Link>
        </Nav.Item>
        <hr/>
      </Nav>
      <Container fluid>
        <Row className="justify-content-right "></Row>

        <Container >
          <Row>
            <Col className="text-center">
            <BsArrowRight className="blinking-link" />
            <Link  to="/srn" style={{textDecoration:'none', fontSize:'25px'}}>Mission Buniyaad Registration Class 8th</Link>
            <br />
            <br />
            <BsArrowRight className="blinking-link" />
            <Link to="/srn-100" style={{textDecoration:'none', fontSize:'25px'}}>Super 100 Registration Class 10th</Link>
            <br />
            <br />
            <BsArrowRight className="blinking-link" />
            <Link to="/user-signin" style={{textDecoration:'none', fontSize:'25px'}}>SCHOOL/ABRC/TEACHER Login</Link>

            <br />
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
