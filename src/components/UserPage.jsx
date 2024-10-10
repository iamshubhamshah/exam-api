import React, {useState, useEffect, useContext} from 'react';
import UserService from '../services/UserService';
import UserSignUp from './UserSignup';
import {Link, Form, Navigate, useNavigate, useLocation} from 'react-router-dom';
import UserParentComponent from './UserParentComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import RegistrationFormComponent from './RegistrationFormComponent';

import {UserContext} from './ContextApi/UserContextAPI/UserContext';



export default function UserPage () {

    const {user} = useContext(UserContext);
  
    const name = user.userName;
    


    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card style={{ width: '50rem', height:'45rem' }} className="text-center">
            <Card.Body>
                <Card.Title>Hello</Card.Title>
                <Card.Text>
                    <p>{name}</p>
                    
                </Card.Text>
                <hr></hr>
                <Link to='/srn'><Button variant="dark" style={{width:'20rem'}} >Register Mission Buniyaad: Class 8th Students</Button></Link> 
           <br/><br/>
            <Link><Button variant="dark" style={{width:'20rem'}} >Register Super 100: Class 10th Students</Button></Link>
            <br/><br/>
            
            
            </Card.Body>
        </Card>
        
    </div>
);

    
};