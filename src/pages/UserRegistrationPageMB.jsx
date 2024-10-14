import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserRegistrationPageMB () {
    
    return(
        <div>
            <div>Nav</div>
     
          
          <Link to="/srn">
            <Button variant="dark" style={{ width: "20rem" }}>
              Register Students Individually: Class 8th Students
            </Button>
          </Link>
          <br />
          <br />
          <Link>
          <Link to ='/BulkRegister'>  <Button variant="dark" style={{ width: "20rem" }}>
              Bulk Upload Class 8th Students
            </Button></Link>
          </Link>
         
       
      
    
            <div>Footer</div>
        </div>
    )



}