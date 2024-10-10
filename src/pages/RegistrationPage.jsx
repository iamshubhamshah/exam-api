import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function RegistrationPage () {

    return (
        <div>
            <Navbar/>
            <Link to = "/srn">Student Registration </Link>
            <br/>
            <br/>
            <Link to = "/user-signin">School/ABRC/Teacher Sign-up/Sign-in </Link>
            <Footer/>
        </div>
    )
    
}