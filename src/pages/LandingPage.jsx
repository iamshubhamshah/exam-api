import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import StudentSignIn from '../components/StudentSignIn';

export default function LandingPage () {

    const [ShowStudentSignIn, setShowStudentSignIn] = useState(false)

    const handleClickforStudentSignin = ()=>{
        setShowStudentSignIn(true)
    }
    return(
        <div>
            <Navbar/>
            
            <Link to="/Registration-page">Register For Mission Buniyaad & Super 100 Examinations </Link>
            <br/>
            <br/>
            {/* //Below Student Login is just for testing purpose right now. I will place it at it's right place in future. */}
            <Button onClick={handleClickforStudentSignin}>Click here to Student Login</Button>
            
            <Footer/>
            {ShowStudentSignIn ? (
                <div><StudentSignIn/></div>
            ):null}
        </div>
    )
}