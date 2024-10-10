import React from "react";


const customStyles ={
    color: "black"
    
}

export default function Navbar() {
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
              हरियाणा प्रतिभा खोज
            </h1>
            <h2>Mission Buniyaad & Haryana Super 100 Examination</h2>
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