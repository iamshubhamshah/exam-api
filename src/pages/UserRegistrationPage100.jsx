import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserRegistrationPage100 () {
    return(
        <div>
            <div>Nav</div>
     
          
          <Link to="/srn-100">
            <Button variant="dark" style={{ width: "20rem" }}>
              Register Students Individually: Class 10th Students
            </Button>
          </Link>
          <br />
          <br />
          <Link>
          <Link to ='/BulkRegister'>  <Button variant="dark" style={{ width: "20rem" }}>
              Bulk Upload Class 10th Students
            </Button></Link>
          </Link>
         
       
      
    
            <div>Footer</div>
        </div>
    );
    
}