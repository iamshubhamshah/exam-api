import React, {useContext, useState, userContext} from 'react';
import StudentNavbar from './StudentNavbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import AcknowledgementSlip from './AcknowledgementSlip';
import { StudentContext } from './ContextApi/StudentContextAPI/StudentContext';
import { Container } from 'react-bootstrap';


const StudentPage = ()=>{

//Using StudentContext API. Only works if the user logs in. other wise doesn't work.
const {setStudent} =  useContext(StudentContext);

const {student} = useContext(StudentContext);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    return (
        <>
        <StudentNavbar/>
        <div className='StudentPage'>
            <div style={{width:'50%', border:'3px solid', margin:'auto', padding:'10px'}} >
                <h3>Your Basic Details:</h3>
                <div>
                <div style={{
                    display: 'flex',        // Parent container as flex
                    flexDirection: 'column', // Stack sections in a column
                    gap: '10px',            // Adds space between the sections
                }}>
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Slip ID:</p>
                        <p>{student.name}</p>
                    </section>
                    
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>SRN:</p>
                        <p>{student.srn}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Name:</p>
                        <p>{student.name}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Father Name:</p>
                        <p>{student.father}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>D.O.B:</p>
                        <p>{student.dob}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Gen:</p>
                        <p>{student.gender}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Category:</p>
                        <p>{student.category}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Class:</p>
                        <p>{student.grade}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Registration Status:</p>
                        <p> </p>
                    </section>
                </div>
            </div>
            </div>
            <div className='Student-basic-details'>
                <Link to = {'/Acknowledgement'}>Click to download L1 Ack slip</Link>
            </div>
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
        <Footer/>
        </>
    );
}


export default StudentPage;