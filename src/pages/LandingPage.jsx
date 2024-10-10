import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function LandingPage () {
    return(
        <div>
            <Navbar/>
            
            <Link to="/Registration-page">Register For Mission Buniyaad & Super 100 Examinations </Link>
            
            <Footer/>
        </div>
    )
}