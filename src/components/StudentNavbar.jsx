import React, {useState, useContext} from "react";
import { StudentContext } from "./ContextApi/StudentContextAPI/StudentContext";

const customStyles ={
    color: "black"
    
}

export default function StudentNavbar() {

    //Destructruing the contexgt api to show student data dynamically on the navbar. 
    //setStudent stae was updated in the StudentSignin already. So if user logins into his her account then the instance automatcially... 
    //...updates here
    const {setStudent} = useContext(StudentContext);
    
    const {student} = useContext(StudentContext);

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    return (
        <div style={{ textAlign: 'center' }}>
          <nav style={{
            background: "#079BF5",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '00px', // Add some padding for better spacing
            border:'solid'
            
          }}>
            <img src="./HRLogo.png" style={{ width: '100px', height: 'auto' }} />
            <div>
            <h1 style={customStyles}>
             Welcome: {student.name}
            </h1>
            {student.grade === "8" ?(
                <h2>Mission Buinyaad L-1 Student Account</h2>
                ):(<h2>Haryana Super 100 L-1 Student Account</h2>)}
          <h2>Batch 2025-27</h2>
          </div>
            <img src="./Buniyaad.png" style={{ width: '100px', height: 'auto' }} />
          </nav>
          
      
          <style>
          <style>
                {`
                  @media (max-width: 600px) {
                    nav {
                      flex-direction: column; 
                      align-items: center; 
                    }
                    img {
                      margin: 5px 0;
                      width: 80px;
                      height: auto
                    }
                    h1 {
                      font-size: 24px; /* Adjust as needed */
                    }
                    h2 {
                      font-size: 20px; /* Adjust as needed */
                    }
                    h3 {
                      font-size: 18px; /* Adjust as needed */
                    }
                  }
                `}
            </style>
          </style>
        </div>
      );
    }