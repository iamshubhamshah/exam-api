//For 'Other Schools' where there are school code present in a collections of students registration, those schools will be counted in 'other schols'. According to my logic.

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import StudentSignIn from '../components/StudentSignIn';
import DistrictDash from '../components/DistrictDash';
import DistrictDash10 from '../components/DistrictDash10';
import BlockSchoolDash8 from '../components/BlockSchoolDash8';
import BlockSchoolDash10 from '../components/BlockSchoolDash10';
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
            {/* <div>
                <DistrictDash/>
            </div>
            <h1>Class 10th Dash</h1>
            <div>
                <DistrictDash10/>
            </div> */}
            <h1>Class 8th Block School Dash</h1>
            <div>
                <BlockSchoolDash8/>
            </div>
            <h1>Class 10th Block School Dash</h1>
            <div>
                <BlockSchoolDash10/>
            </div>
        </div>
    )
}