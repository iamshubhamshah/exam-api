import React from "react";

const customStyles = {
    color: "black"
};

export default function Footer() {
    return (
        <div style={{ textAlign: 'center' }}>
          <footer style={{
            background: "#079BF5",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px', // Adjust padding as needed
            border: 'solid',
            // marginTop:'50vh',
            height:'50vh'
          }}>
            
            <div >
              <h6 >पंजीकरण से संबंधित किसी भी प्रश्न और समस्या के लिए, नीचे दिए गए नंबर पर हमसे संपर्क करें।</h6>
              <h6>8191819181, 8191819181</h6>
            
            </div>
            
            <img src="./Vikalpa.png" style={{ width: '100px', height: 'auto' }} />
          </footer>
          
          <style>
            {`
              @media (max-width: 600px) {
                footer {
                  flex-direction: column; 
                  align-items: center; 
                }
                img {
                  margin: 5px 0;
                  width: 80px;
                  height: auto;
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
        </div>
    );
}
