import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import UserNavBar from "../components/UserNavBar";

export default function UserRegistrationPage100 () {
    
    return(
        


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
      <Link to="/srn-100"><Button style={{width:'300px'}} >Register Students Individually: Class 10th</Button></Link>
      <br></br>
      <br></br>
      <Link to ='/userprofile/bulkregister-100'> <Button style={{width:'300px'}}>Bulk Upload Class 10th Students</Button></Link>
      <br></br>
      <br></br>
      <Button style={{width:'300px'}}>DashBoard</Button>
      </Col>
      
    </Row>
    
    
    
    </Container>
    </div>
    
    )



}