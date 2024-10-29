//This component will hold the dynamic acknowledgment slip of the student.
//And also student will have their own acknowledgment id using which they can access in their student account.
//I am using jspdf and html2canvas library to convert the following modal into pdf directly.


import React, {useState, useEffect, useContext} from 'react';
import { Card, Button, CardFooter } from 'react-bootstrap';
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
    examLevel = "Mission Buniyaad Batch 2025-27";
} else {
    examLevel = "Super 100 Batch 2025-27";
}

//Below logic is for downloading Acknowledgement sllip using html2canvas and jsPDF library.
function DownloadPDF() {
    const pdf = new jsPDF('p', 'mm', 'a4');

    const logo = '/HRlogo.png';

    const slipDataToShow = slipData || {}; // Get slip data or use empty object if not available
    const { srn, name, father, dob, gender, category, isVerified, slipId } = slipDataToShow;

    // Add logo to the PDF
    pdf.addImage(logo, 'PNG', 10, 10, 20, 20);

    // Set font size and styles for header
    pdf.setFontSize(18);
    pdf.text("Acknowledgement Slip", 105, 20, { align: "center" });

    

    pdf.setFontSize(12);
    pdf.text(examLevel, 105, 30, { align: "center" });

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
    pdf.text(`Registration Status: ${isVerified || student.isVerified}`, 20, 120);
    

   
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
    <>
{/*        
  <button onClick={OpenModal}>Open Modal</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet tempora reprehenderit vel animi deleniti voluptatem assumenda a mollitia nihil porro, aliquam quis quaerat facere libero enim accusantium unde esse itaque?</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet tempora reprehenderit vel animi deleniti voluptatem assumenda a mollitia nihil porro, aliquam quis quaerat facere libero enim accusantium unde esse itaque?</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet tempora reprehenderit vel animi deleniti voluptatem assumenda a mollitia nihil porro, aliquam quis quaerat facere libero enim accusantium unde esse itaque?</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet tempora reprehenderit vel animi deleniti voluptatem assumenda a mollitia nihil porro, aliquam quis quaerat facere libero enim accusantium unde esse itaque?</p>
  */}

  {modal  ? (
    <>
     <div className='modalAck'> 
    
        <div className='modal-contentAck' style={{
    display: 'flex',
    justifyContent: 'center',  // Centers the div horizontally
    alignItems: 'center',      // Centers the div vertically
    minHeight: '100%',        // Ensures the div takes the full height of the viewport
    padding: '20px',            // Adds some padding around the div
    flexDirection:'column'
}}>
    
    <Card id = 'acknowledgementSlip' style={{
        width: '100%',           // Make the card width responsive
        maxWidth: '1000px',      // Limit the max width to 1000px
        border: 'solid',
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
                    <h1 style={{ margin: '0' }}>Acknowledgement Slip</h1>
                    <h4 style={{ margin: '5px 0' }}>{examLevel}</h4>
                </div>
                <Button variant='close' onClick={CloseModal} style={{marginLeft: '20px'}}/>
            </header>
            <hr />
        </Card.Title>
        <Card.Body>

            {showAck ? (
                <div>
                <div style={{
                    display: 'flex',        // Parent container as flex
                    flexDirection: 'column', // Stack sections in a column
                    gap: '10px',            // Adds space between the sections
                }}>
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Slip ID:</p>
                        <p>{slipData.slipId}</p>
                    </section>
                    
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>SRN:</p>
                        <p>{slipData.srn}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Name:</p>
                        <p>{slipData.name}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Father Name:</p>
                        <p>{slipData.father}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>D.O.B:</p>
                        <p>{slipData.dob}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Gen:</p>
                        <p>{slipData.gender}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Category:</p>
                        <p>{slipData.category}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Class:</p>
                        <p>{slipData.grade}</p>
                    </section>
            
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Registration Status:</p>
                        <p>Pending</p>
                    </section>
                </div>
            </div>

            ):(
                <div>
                <div style={{
                    display: 'flex',        // Parent container as flex
                    flexDirection: 'column', // Stack sections in a column
                    gap: '10px',            // Adds space between the sections
                }}>
                    <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'50px'}}>
                        <p>Slip ID:</p>
                        <p>{student.slipId}</p>
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
                        <p>{student.isVerified}</p>
                    </section>
                </div>
            </div>
            )}

            
        </Card.Body>
        <Card.Footer>
            <footer>
                Basic instructions will be here
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
    </>
  
);


}

