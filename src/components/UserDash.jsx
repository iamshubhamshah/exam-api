// This Dash Will be used by to see their registerd students.

import React, { useState, useEffect, useContext} from "react";
import DashBoardServices from "../services/DashBoardServices";
import { Table, Row, Col, Container, Button } from "react-bootstrap";
import DependentDropsForFilter from './DependentDropsForFilter';
import Select from "react-select";
import { StudentContext } from "./ContextApi/StudentContextAPI/StudentContext";
import { UserContext } from "./ContextApi/UserContextAPI/UserContext";
import UserNavBar from "./UserNavBar";
import Footer from "./Footer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate, useLocation } from "react-router-dom";
import registrationServiceInstance from "../services/RegistrationFormService";


const BaseURL = process.env.REACT_APP_API_BASE_URL;
const AllData = () => {


  const navigate = useNavigate();
  const location = useLocation();



  //Defining useState hooks

  const [allData, setAllData] = useState([]);
  const [studentSlipData, setStudentSlipData] = useState({});

  //Filter hooks
  const [district, setDistrict] = useState('')
  const [block, setBlock] = useState('')
  const [school, setSchool] = useState('')
  const [isUser, setIsUser] = useState('')

  const {user} = useContext(UserContext);
  
  const [grade, setGrade] = useState('');

  //context api below

const {setStudent} = useContext(StudentContext)
const {student} = useContext(StudentContext)

//For downloading slip
const [downloadSlip, setDownloadSlip] = useState(false)

//^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Below varibale controls the level of exam and shwos the data accordingly in dashboard.
const examLevelMB = "Level1"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  console.log(district)

  

  
  const fetchAllData = async () => {

    

    let query = `isRegisteredBy=${user.mobile}&district=${district}&block=${block}&school=${school}&grade=${grade}`.trim();
    
    try {
      const response = await DashBoardServices.GetAllStudentData(query);

      // Filter the data to include only students where isQualified is true
      const filteredData = response.data.filter(student => 
        (student.grade === "8" && student.isQualifiedL1 === true) || 
        student.grade === "10"
    );
   
    setAllData(filteredData || []);
      //setAllData(response.data || []);
    } catch (error) 
       { console.log("Error fetching data:", error);
        setAllData([]) //Clear all data to set an empty array if filter don't match
       }
  };

  useEffect((e) => {
    fetchAllData();
  }, [ district, block, school, grade]);

  //Below variable filters the data dynamically according to the level of examination
   
//below varibales are being used to dynamically handieing headers of the ack slip
  let examLevel;
  let examLevelSlip;
  let examLevelBatch;
  ///^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //Below logic takes the srn as id from the DownloadAckSlip button to below logice
  const DownloadAckSlip = async (id, e) => { 

    setTimeout(()=>{
      setStudent('')
    }, 5000)
    const newSrn = id

    try {
      const response = await registrationServiceInstance.getPostsBySrn(newSrn)
      
      setStudent(response.data.data)

      setDownloadSlip(true);
      //sessionStorage.setItem('user', JSON.stringify(response.data.data)); // Store user data in localStorage

         //Hnadling below text dynamically...

if ((studentSlipData && student.grade === "8")) {
    examLevel = "Mission Buniyaad";
    examLevelSlip = "Acknowledgement Slip";
    examLevelBatch = "Batch 2025-27";
} else {
    examLevel = "Haryana Super 100";
    examLevelSlip = "Acknowledgement Slip";
    examLevelBatch = "Batch 2025-27";
}

// console.log('I m student grade below')
// console.log(student.grade)

  //________________________________
 

      

      if (student === ''){
        //alert(' i am undefined')

        //Below logic runs and click the "DownloadAckSlip" button again. Cause "SettimeOut" function sets the state of...
        // student back to blank string. I had to do it cause state update has a gap of undefined. So thats' why ...
        // auto trigger needed. Just try it out and you will know what i am saying. Either contact me I will explain
        document.querySelector('.triggerClickOnUndefined').click();
        
      } else {
        return fetchStudentSlip();
      }
   
  } catch (error) {
      console.error(error);
    

  }



  }



  //Below logic is for designing and downloading student acknowledgemnt slip...
  //What it does is that it gets run by "DownloadAckSlip" function, when condition inside that met. if not this...
  // function does not run.
  const fetchStudentSlip = async (id, e) => {


  try {

    //pdf download logic

  const pdf = new jsPDF('p', 'mm', 'a4');

  const logo = '/haryana.png';
  const instruction = '/geninstructions.png'

  // const slipDataToShow = slipData || {}; // Get slip data or use empty object if not available
  // const { srn, name, father, dob, gender, category, slipId, district, block, school } = slipDataToShow;

 // Format the current date
 const currentDate = new Date(Date.now()).toLocaleDateString("en-US");

 // Check if `student.createdAt` exists and format accordingly
 const formattedDateCreatedat = student.createdAt
   ? new Date(student.createdAt).toLocaleDateString("en-US")
   : null;

   //For only those documents which is provided by govt for prefilled.
   const formattedDateUpdatedAt = student.createdAt
   ? new Date(student.updatedAt).toLocaleDateString("en-US")
   : null;

 // Use `formattedDate` if it exists; otherwise, use the formatted current date
 let dateToShow;
 if (student.dataByGovtForPrefilled === true){
    dateToShow = formattedDateUpdatedAt
 } else {
    dateToShow = formattedDateCreatedat || currentDate;

 }


  // Add logo to the PDF
  pdf.addImage(logo, 'PNG', 10, 10, 20, 20);

  pdf.addImage(instruction, 'PNG', 10, 158, 180, 120);

  // Set font size and styles for header
  pdf.setFontSize(14);
  pdf.text(examLevel, 105, 20, { align: "center" });
  pdf.setFontSize(12);
  pdf.text(examLevelSlip, 105, 25, { align: "center" });
  pdf.setFontSize(10);
  pdf.text(examLevelBatch, 105, 30, { align: "center" });


  let verificationStatusText = ""; // Initialize as an empty string
  if (student.isVerified === "Verified") {
    verificationStatusText = 
      "Your Registration form is verified for Level 1 Examination. ";
  } else if (student.isVerified === "Pending" ) {
      if (student.verificationRemark === ""){
  
        verificationStatusText = 
        "Your Registration form is under verification. Check your status after three days.";
  
      } else {
        verificationStatusText = `Pending Reason: ${student.verificationRemark}`;
      }
    }
  

  

  pdf.setFontSize(10);
  pdf.text(`Registration Status: ${student.isVerified || "Pending"}`, 105, 35, { align: "center" });

  //Below shows rejection reason
  let verificationStatusText1 = "Your Registration form is under verification. Check your status after three days."
  pdf.setFontSize(10);
  pdf.text(verificationStatusText || verificationStatusText1, 105, 40, { align: "center" });





  // Draw underline below the header
  const headerY = 44; // Y-coordinate for the underline
  pdf.setLineWidth(1);
  pdf.line(10, headerY, 200, headerY); // Draw line from (10, headerY) to (200, headerY)

  // Add some spacing
  
  pdf.setFontSize(12);

  // Define a maximum label width
  const labelWidth = 70; // Adjust this value based on your needs
  const xStart = 10; // Starting X-coordinate
  const yPositionStart = 50; // Starting Y-coordinate
  const lineHeight = 10; // Height between lines
  
  // Draw the texts
  
  pdf.text(`1. Slip ID:`, xStart, yPositionStart);
  pdf.text(`${student.slipId}`, xStart + labelWidth, yPositionStart);
  
  pdf.text(`2. SRN:`, xStart, yPositionStart + lineHeight);
  pdf.text(`${student.srn}`, xStart + labelWidth, yPositionStart + lineHeight);

 
  pdf.text(`3. Name:`, xStart, yPositionStart + 2 * lineHeight);
  pdf.text(`${student.name}`, xStart + labelWidth, yPositionStart + 2 * lineHeight);
  
  pdf.text(`4. Father's Name:`, xStart, yPositionStart + 3 * lineHeight);
  pdf.text(`${student.father}`, xStart + labelWidth, yPositionStart + 3 * lineHeight);
  
  pdf.text(`5. D.O.B:`, xStart, yPositionStart + 4 * lineHeight);
  pdf.text(`${student.dob}`, xStart + labelWidth, yPositionStart + 4 * lineHeight);
  
  pdf.text(`6. Gender:`, xStart, yPositionStart + 5 * lineHeight);
  pdf.text(`${student.gender}`, xStart + labelWidth, yPositionStart + 5 * lineHeight);
  
  pdf.text(`7. Category:`, xStart, yPositionStart + 6 * lineHeight);
  pdf.text(`${student.category}`, xStart + labelWidth, yPositionStart + 6 * lineHeight);
  
  pdf.text(`8. District:`, xStart, yPositionStart + 7 * lineHeight);
  pdf.text(`${student.district}`, xStart + labelWidth, yPositionStart + 7 * lineHeight);
  
  pdf.text(`9. Block:`, xStart, yPositionStart + 8 * lineHeight);
  pdf.text(`${student.block}`, xStart + labelWidth, yPositionStart + 8 * lineHeight);
  
  pdf.text(`10. School:`, xStart, yPositionStart + 9 * lineHeight);
  pdf.text(`${student.school}`, xStart + labelWidth, yPositionStart + 9 * lineHeight);
  
  pdf.text(`11. Registration Date:`, xStart, yPositionStart + 10 * lineHeight);
  pdf.text(`${dateToShow}`, xStart + labelWidth, yPositionStart + 10 * lineHeight);
  
  // Draw a gray header line
  const lineY = 155; // Y-coordinate for the header line
  pdf.setDrawColor(169, 169, 169); // Set color to gray (RGB)
  pdf.setLineWidth(1); // Set line width
  pdf.line(10, lineY, 200, lineY); // Draw line from (10, lineY) to (200, lineY)
  

  // Footer instructions
  const footerY = pdf.internal.pageSize.height - 20; // Y-coordinate for the footer
  // pdf.text("Note: If you have any doubt regarding registration, then contact us: 7982108494, 7982109268.", 10, footerY);
  
  // Draw line in the footer
  pdf.line(10, footerY + 5, 200, footerY + 5); // Draw line from (10, footerY + 5) to (200, footerY + 5)

  // Save the PDF
  pdf.save(`${student.name}_${student.srn}_acknowledgement-slip.pdf`);
  
  // alert('slip downloaded')


//  console.log('i am student')
//  console.log(student)
//^^^^^^^^^^^^^^^^^^^^^


    
  } catch (error) {
    console.error(error);

    //First time setStudent state is null so fetchslip crashes the page. 
    //So we are again triggering the download button in catch block..
    //So that slip properly gets downloaded.
    document.querySelector('.triggerClickOnUndefined').click();
    // alert('Please Download Again')
  }
    
//download slip ends here^^^^^^^^^^^^^^^^^^^^^^^^^^^
  }
  
  

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



  function handleClearFilter() {
    setDistrict('')
    setBlock('')
    setSchool('')
    setGrade('')
  }

//Below vairables are for showing users registrations' count
  const count10 =  allData.filter(each10thSutdent=>each10thSutdent.grade === '10').length
  const count8 =  allData.filter(each8thSutdent=>each8thSutdent.grade === '8').length
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//Below logic for downloading admit card by users

const DownloadAdmitCard = async (id, e) => {
  setTimeout(() => {
    setStudent('')
  }, 5000)

  const newSrn = id

    

  try {
    const response = await registrationServiceInstance.getPostsBySrn(newSrn)

    setStudent(response.data.data)




    if (student === '') {

      document.querySelector('.triggerClickOnUndefinedAdmitCard').click();
    } else {
      return fetchAdmitCard ();
    }

    

  } catch (error) {
    console.error(error);
  }


}



async function fetchAdmitCard () {


  try {

    if (student.grade === "10") {
      alert("Admit cards are only available for Mission Buniyaad. (प्रवेश पत्र केवल मिशन बुनियाद के लिए उपलब्ध हैं|)")
      return;
    } else {}
  
    
  } catch (error) {
    alert('Try Again Please')
  }


  try {

     //Below var updates the admit card downloading status in the mongodb on the basis of student _id
   const admitCard2 = true
   const studentIdFromUserDash = student._id
   //_____________________________



  const pdf = new jsPDF("p", "mm", "a4");


 

  const admitHrLogo = "/admitHrLogo.png"
  const buniyaadLogo = "/admitBuniyaLogo.png"

  
  
  //all the header images
  const pratibhaKhoj = "/pratibhakhoj.png"
  const Name = "/Name.png"
  const Father = "/hindiFather.png"
  const DOB = "/DOB.png"
  const Category = "/Category.png"
  const Srn = "/SRN.png"
  const RollNumber = "/hindiRollnumber.png"
  const Aadhar = "/hindiAadhar.png"
  const Mobile = "/hindiMobile.png"
  const District = "/District.png"
  const Block = "/Block.png"
  const ParikshaKendra = "/hindiParikshakendra.png"
  const AdmitInstructions = "/admitinstructionsLevel2.png"
  const StudentSignature = "/studentsignature.png"
  const VikalpaStamp = "/vikalpaStamp.png"
  
  //pdf header image

  pdf.addImage(pratibhaKhoj, "PNG",  95, 15, 18, 6 );

  //Add logo hrLogo to the left side:
  pdf.addImage(admitHrLogo, "PNG", 10, 5, 20, 20)
  pdf.addImage(buniyaadLogo, "PNG", 180, 5, 20, 20)


   pdf.addImage(AdmitInstructions,"PNG", 5,132,198,135)
   pdf.addImage(StudentSignature, "PNG", 5, 280, 198, 5)
   pdf.addImage(VikalpaStamp, "PNG", 168, 263, 25, 23)

  pdf.setFontSize(10);
  pdf.text('E-Admit Card', 105, 10, {align:'center'})
  pdf.setFontSize(12);
  pdf.text('Directorate of School Education (DSE) Shiksha Sadan, Haryana', 105, 15, {align: "center"})


  let examtype
  if (student.grade === "8") {
      examtype = "Mission Buniyaad"
  } else { examtype = "Haryana Super 100"}

  pdf.setFontSize(14);
  pdf.text(examtype, 105, 25, {align:'center'})
  pdf.setFontSize(10);
  pdf.text('Entrance Examination Level-2(2025-27)', 105, 30, {align:'center'})


  //for examination date
        
  pdf.setFontSize(10);
  pdf.text(`Examination Date: ${student.L2examDate}`, 105, 35,{align:'center'})
  pdf.setFontSize(10);
  pdf.text(`Reporting Time: 10:30 AM, Exam Time: ${student.L2examTime}`, 105, 40, {align:"center"})
  

  // Table data
  const rows = [
    ["Name", student.name.toUpperCase() ],
    ["Father's Name", student.father.toUpperCase()],
    ["Date of Birth", student.dob.toUpperCase()],
    ["Category", student.category.toUpperCase()],
    ["SRN", student.srn ],
    ["Exam Roll Number", student.rollNumber],
    ["Aadhar Number", student.aadhar],
    ["Mobile Number", student.mobile],
    ["District/Code", student.L1districtAdmitCard.toUpperCase()],
    ["Block/Code", student.L1blockAdmitCard.toUpperCase()],
    ["Examination Center", student.L2examinationCenter.toUpperCase()]

];

  // Generate table
  autoTable(pdf, {
      
      body: rows,
      startY: 43, // Adjust starting Y position
      styles: {
          fillColor: null, // No background color for rows
          textColor: 0, // Black text color
          tableLineColor: [0,0,0],
          lineWidth: 0.5, // Set border line width
          lineColor: 0,
          halign: 'left', // Align text to the left
          valign: 'middle', // Vertically align text in the middle
      },
      headStyles: {
          fillColor: null, // No background color for header
          textColor: 0, // Black text color for header
          tableLineColor: [0,0,0],
          fontStyle: 'normal', // Normal font for header
          lineWidth: 0.5, // Set border line width for header
      },
      alternateRowStyles: {
          fillColor: null, // Remove alternating row background
      },
      //tableLineColor: [0, 0, 0], // Black border color
   //   tableLineWidth: 0.5, // Border thickness
      columnStyles: {
          0: { cellWidth: 50 }, // Column 1 width
          1: { cellWidth: 100 }, // Column 2 width
      },

      
  });

  const photoText = `If no photograph
is available, attach a 
passport-sized photo attested 
by the school..`


  if (student.image === null || student.image === "" || student.imageUrl === "" || !student.image || !student.imageUrl ) {

    

pdf.setFontSize(8);
pdf.text(photoText, 182, 55,{align:'center'})


    pdf.rect(166, 42.5, 38,38)

} else  {
  console.log('I AM BEFORE STUDENT PHOTO')

  //Some people uploaded pdf file for the student images, so below logic handles that.
  if(student.imageUrl.slice(-3) === "pdf") {
      pdf.setFontSize(8);
      pdf.text(photoText, 182, 55,{align:'center'})
      pdf.rect(166, 42.5, 38,38)
  }else{pdf.addImage(student.imageUrl, "PNG", 166, 42.5, 38, 38);}

}

  //Save pdf
  pdf.save(`${student.name}_${student.srn}_Admit-Card.pdf`)

          //below const updates the resultStatus1 that tells us that student has checked...
        // his or her result on portal.
        //Logic of this is, i am assuming if student downlods his/her admit card or...
        //level 1 qualifying certificate then we update the resultStatus1 field in ...
        //mongoDB to True.
        const resultStatus1 = true; 
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
        


  //Below api updates the admitCard1 status to true if the card is downloaded

  const formData = new FormData ();
  formData.append("admitCard2", admitCard2)
  formData.append("resultStatus1", resultStatus1)

  try {

      const response = await registrationServiceInstance.patchDownloadAdmitCardById(
        studentIdFromUserDash,
          formData
      )

      console.log('Admit card downloaded')
      
  } catch (error) {
      console.error("Error Downloading Admit Card:", error);
      
  }
    
  } catch (error) {
    alert('Try Again')
  }


  


}



  return (
    <>
    <UserNavBar/>
    <Container>
      <Row>
        <Col >
        <DependentDropsForFilter
        setDistrict={setDistrict}
        setBlock={setBlock}
        setSchool={setSchool}        
        />
        
        </Col>

      </Row>
      <Row>
        <Col>
        <label>Select Class</label>
        <Select
        placeholder="Select Class"        
        options={[{value:'8', label: '8'}, {value:'10', label:'10'}]}              
        value={grade ? { value: grade, label: grade } : null}
        onChange={(selectedOption) => setGrade(selectedOption.value)} // Set only the value (8 or 10)
      />
                             
       
        </Col>
        
        </Row>
        <br></br>
        <Row><Button onClick={handleClearFilter}>Clear Filter</Button></Row>
        <br></br>
        <Row>
          <Col>
          <p>Class 8th Count: {count8}</p>
          </Col>
          <Col>
          <p>Class 10th Count: {count10}</p>
          </Col>

        </Row>
      <Row>
        
        <Col>
          <Table responsive >
            <thead>
              <tr>
                <th>#</th>
                <th>SRN</th>
                <th>Name</th>
                <th>Father</th>
                <th>D.O.B</th>
                <th>gender</th>
                <th>Category</th>
                <th>Mobile</th>
                <th>Whatsapp</th>
                <th>District</th>
                <th>Block</th>
                <th>School</th>
                <th>Class</th>
                <th>image</th>
                {/* <th>Download L1 Slip</th> */}
                <th>Download Mission Buniyaad L2 Admit Card</th>
              </tr>
            </thead>
            <tbody>
              {allData.length > 0 ? (
                  allData.map((eachStudent, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{eachStudent.srn}</td>
                      <td>{eachStudent.name}</td>
                      <td>{eachStudent.father}</td>
                      <td>{eachStudent.dob}</td>
                      <td>{eachStudent.gender}</td>
                      <td>{eachStudent.category}</td>
                      <td>{eachStudent.mobile}</td>
                      <td>{eachStudent.whatsapp}</td>
                      <td>{eachStudent.district}</td>
                      <td>{eachStudent.block}</td>
                      <td>{eachStudent.school}</td>
                      <td>{eachStudent.grade}</td>
                      <td>
                        <img
                          src={`https://vikalpaexamination.blr1.digitaloceanspaces.com/postImages/${eachStudent.imageUrl}`} //${BaseURL}/api/postimages/${eachStudent.image}`
                          alt={eachStudent.name}
                          style={{ width: 100, height: 100 }}
                        />
                      </td>
                      {/* <td>
                        <button className="triggerClickOnUndefined" id={eachStudent.srn} onClick={(e)=>DownloadAckSlip(eachStudent.srn,e)}>Download Slip</button>
                      </td> */}
                      <td>
                      <button className="triggerClickOnUndefinedAdmitCard" id={eachStudent.srn} onClick={(e)=>DownloadAdmitCard(eachStudent.srn,e)}>Download L-2 Admit Card</button>
                      </td>
                    </tr>
                  ))
                
              ) : (
              <tr>
                <td colSpan="14" style={{ textAlign: "center" }}>No data available</td>
              </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
   
    </>
  );
};

export default AllData;
