import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import UserNavBar from "../components/UserNavBar";

export default function UserRegistrationPageMB () {
    
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
      <Link to="/srn"><Button style={{width:'300px'}} >Register Students Individually: Class 8th</Button></Link>
      <br></br>
      <br></br>
      <Link to ='/userprofile/bulkregister-mb'> <Button style={{width:'300px'}}>Bulk Upload Class 8th Students</Button></Link>
      <br></br>
      <br></br>
      <Button style={{width:'300px'}}>DashBoard</Button>
      </Col>
      
    </Row>
    
    
    
    </Container>
    </div>
    
    )



}