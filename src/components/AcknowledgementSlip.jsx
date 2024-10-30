//This component will hold the dynamic acknowledgment slip of the student.
//And also student will have their own acknowledgment id using which they can access in their student account.
//I am using jspdf and html2canvas library to convert the following modal into pdf directly.


import React, {useState, useEffect, useContext} from 'react';
import { Card, Button, CardFooter, Container, Col, Row } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


import {Navigate, useNavigate, useLocation} from 'react-router-dom';
import { StudentContext } from './ContextApi/StudentContextAPI/StudentContext';



export default function AcknowledgementSlip ({showAck, slipData}) {

const navigate = useNavigate();
const location = useLocation();

let PutDirectTo;

if (location.pathname === '/srn-100'){
    PutDirectTo = "/Registration-form/put/S100"
} else {
    PutDirectTo = "/Registration-form/put/MB"
}

    
const [modal, setModal] = useState (true);
const [EditForm, setEditForm] = useState(false);
//Below hook handles the slip data if user comes here from the student account
const {student} = useContext(StudentContext);



// useEffect(()=>{
//     setModal(showAck)
// },[showAck])

// function OpenModal () {
//     setModal(true);
// }

function CloseModal () {
    setModal(false )
    navigate('/srn');

}



function UpdateForm () {
   setEditForm(true);
   
}

if(EditForm){
    return <Navigate to={PutDirectTo}/>;
}

//Hnadling below text dynamically...
let examLevel;
if ((student && student.grade === "8") || (slipData && slipData.grade === "8") || slipData) {
    examLevel = "Mission Buniyaad Acknowledgement Slip_Batch 2025-27";
} else {
    examLevel = "Super 100 Acknowledgement Slip_Batch 2025-27";
}

//Below logic is for downloading Acknowledgement sllip using html2canvas and jsPDF library.
function DownloadPDF() {
    const pdf = new jsPDF('p', 'mm', 'a4');

    const logo = '/HRlogo.png';

    const slipDataToShow = slipData || {}; // Get slip data or use empty object if not available
    const { srn, name, father, dob, gender, category, isVerified, slipId, district, block, school } = slipDataToShow;

    // Add logo to the PDF
    pdf.addImage(logo, 'PNG', 10, 10, 20, 20);

    // Set font size and styles for header
    pdf.setFontSize(14);
    pdf.text(examLevel, 105, 20, { align: "center" });

    

    pdf.setFontSize(12);
    pdf.text(`Registration Status: ${slipData.isVerified || student.isVerified}`, 105, 30, { align: "center" });

    // Draw underline below the header
    const headerY = 35; // Y-coordinate for the underline
    pdf.setLineWidth(1);
    pdf.line(10, headerY, 200, headerY); // Draw line from (10, headerY) to (200, headerY)

    // Add some spacing
    
    pdf.setFontSize(12);
    pdf.text(`Slip ID: ${slipId || student.slipId}`, 20, 50);
    pdf.text(`SRN: ${srn || student.srn}`, 20, 60);
    pdf.text(`Name: ${name || student.name}`, 20, 70);
    pdf.text(`Father's Name: ${father || student.father}`, 20, 80);
    pdf.text(`D.O.B: ${dob || student.dob}`, 20, 90);
    pdf.text(`Gender: ${gender || student.gender}`, 20, 100);
    pdf.text(`Category: ${category || student.category}`, 20, 110);
    // pdf.text(`Class: ${slipData.grade || student.grade}`, 20, 120);
    pdf.text(`District: ${district || student.district}`, 20, 120);
    pdf.text(`District: ${block || student.block}`, 20, 130);
    pdf.text(`District: ${school || student.school}`, 20, 140);
    pdf.text(`Registration Status: ${isVerified || student.isVerified}`, 20, 150);
    

   
    // Footer instructions
    const footerY = pdf.internal.pageSize.height - 20; // Y-coordinate for the footer
    pdf.text("Instructions: Please keep this slip safe and present it on the day of the exam.", 10, footerY);
    
    // Draw line in the footer
    pdf.line(10, footerY + 5, 200, footerY + 5); // Draw line from (10, footerY + 5) to (200, footerY + 5)

    // Save the PDF
    pdf.save(`${name || student.name}_${srn || student.srn}_acknowledgement-slip.pdf`);
    navigate('/srn'); // Navigate after downloading
}


    

return (
    <Container>


  {modal  ? (
    <>
     <div className='modalAck'> 
    
        <div className='modal-contentAck' style={{
    display: 'grid',
    justifyContent: 'center',  // Centers the div horizontally
    alignItems: 'center',      // Centers the div vertically
    minHeight: '100%',        // Ensures the div takes the full height of the viewport
    padding: '20px',            // Adds some padding around the div
    flexDirection:'column'
}}>
    
    <Card id = 'acknowledgementSlip' style={{
        width: '100%',           // Make the card width responsive
        maxWidth: '1000px',      // Limit the max width to 1000px
        border: '',
        display:'flex',
    
    }}>
        <Card.Title>
            <header className = 'acknowledgment-header'  style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px'
            }}>
                <img src='/HRlogo.png' style={{ width: '50px', marginRight: '20px' }} />

                {/* Container for the text */}
                <div style={{
                    flexGrow: 1,
                    textAlign: 'center',
                    marginRight: '20px'
                }}>
                    <h4>{examLevel}</h4>
                    <h5>{`Registration Status: ${slipData.isVerified || student.isVerified}`}</h5>
                    <h6 style={{fontSize:'12px'}}>Your Form Is Under Verification. Once Your form is verified, your Registration status will be updated</h6>
                </div>
                <Button variant='close' onClick={CloseModal} style={{marginLeft: '20px'}}/>
            </header>
            <hr />
        </Card.Title>
        <Card.Body>
  {showAck ? (
    <div>
      <Container>
        <Row xs={1} md={2} style={{ gap: '10px' }}>
          <Col>
            <Row>
              <Col>Slip ID:</Col>
              <Col>{slipData.slipId}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>SRN:</Col>
              <Col>{slipData.srn}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Name:</Col>
              <Col>{slipData.name}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Father Name:</Col>
              <Col>{slipData.father}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>D.O.B:</Col>
              <Col>{slipData.dob}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Gen:</Col>
              <Col>{slipData.gender}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Category:</Col>
              <Col>{slipData.category}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Class:</Col>
              <Col>{slipData.grade}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>District:</Col>
              <Col>{slipData.district}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Block:</Col>
              <Col>{slipData.block}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>School:</Col>
              <Col>{slipData.school}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <div>
      <Container>
        <Row xs={1} md={2} style={{ gap: '10px' }}>
          <Col>
            <Row>
              <Col>Slip ID:</Col>
              <Col>{student.slipId}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>SRN:</Col>
              <Col>{student.srn}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Name:</Col>
              <Col>{student.name}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Father Name:</Col>
              <Col>{student.father}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>D.O.B:</Col>
              <Col>{student.dob}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Gen:</Col>
              <Col>{student.gender}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Category:</Col>
              <Col>{student.category}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Class:</Col>
              <Col>{student.grade}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>District:</Col>
              <Col>{student.district}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Block:</Col>
              <Col>{student.block}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>School:</Col>
              <Col>{student.school}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )}
</Card.Body>

        <Card.Footer>
            <footer>
                Note: If you have filled any details incorrectly in the form, click on edit details button below and Edit your details.
            </footer>
        </Card.Footer>
        
        
    </Card>
    
    <div style={{display:'flex'}}>
    <Button onClick={DownloadPDF}>Download</Button>
    </div>

    <div style={{display:'flex'}}>
    <Button onClick={UpdateForm}>Edit Details</Button>
    </div>
    
    
    
</div>

    

</div>


   </>
   
  ):<p>No data</p>}
  
  
    </Container>
  
);


}

