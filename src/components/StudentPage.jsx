import React, {useContext, useState, userContext} from 'react';
import StudentNavbar from './StudentNavbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import AcknowledgementSlip from './AcknowledgementSlip';
import { StudentContext } from './ContextApi/StudentContextAPI/StudentContext';
import {Col, Row, Container} from 'react-bootstrap'

//Importing admit card
import AdmitCard from './AdmitCard';


const StudentPage = ()=>{

//Using StudentContext API. Only works if the user logs in. other wise doesn't work.
const {setStudent} =  useContext(StudentContext);

const {student} = useContext(StudentContext);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    return (
        <>
        <Container fluid>
        <StudentNavbar/>
        <br/>
        <Row className='StudentPage' style={{width:'100%', border:'3px solid', margin:'auto', padding:'10px'}}>
            <Col  >
                <h3>Your Basic Details:</h3>
                <hr/>
                <div>
                <div style={{
                    display: 'flex',        // Parent container as flex
                    flexDirection: 'column', // Stack sections in a column
                    gap: '10px',            // Adds space between the sections
                }}>
                    {/* <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'25px'}}>
                        <p>Slip ID:</p>
                        <p>{student.name}</p>
                    </section> */}
                    
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>SRN:</p>
                        <p>{student.srn}</p>
                    </section>
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Roll Number:</p>
                        <p>{student.rollNumber}</p>
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
            
                    {/* <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Registration Status:</p>
                        <p> </p>
                    </section> */}
                </div>
            </div>
            </Col>
            {/* <div className='Student-basic-details'>
                <Link to = {'/Acknowledgement'}>Click to download L1 Ack slip</Link>
            </div> */}
            <hr/>
            <div>
            <AdmitCard/>
        </div>
            
        </Row>
       
        <Footer/>
        </Container>
        </>
    );
}


export default StudentPage;