import React from "react";
import {Row, Col, Container} from 'react-bootstrap';
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

const customStyles = {
    color: "black"
};

export default function Footer() {
    return (
    
        <div style={{ textAlign: 'center' }}>
         
          <footer style={{
            background: "#90EE90",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px', // Adjust padding as needed
            border: 'solid',
            // marginTop:'50vh',
            height:'50vh'
          }}>
             <Container fluid>
           
            <Row >
              <h6 >पंजीकरण से संबंधित किसी भी प्रश्न और समस्या के लिए, नीचे दिए गए नंबर पर हमसे संपर्क करें।</h6>
              <h6>8191819181, 8191819181</h6>
            
            </Row>
            <hr></hr>
            <Row>
              <Col>
             <a href ='https://www.youtube.com/@missionbuniyaad_' target="_blank" rel="noopener noreferrer"> <FaYoutube /> </a>
              </Col>
             
              <Col>
             <FaInstagram/>
              </Col>
              <Col>
              <FaWhatsapp/>
              </Col>
            </Row>
            
            <hr></hr>
            <img src="./Vikalpa.png" style={{ width: '100px', height: 'auto',}} />
           
            </Container>
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
