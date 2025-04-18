// //This is IdCard JXS

// import React, { useState, useEffect } from 'react';
// import DistrictBlockCentersService from '../../../src/services/DistrictBlockCentersService';
// import Select from 'react-select';
// import { Row, Col, Container, Table, Button, Spinner } from 'react-bootstrap';
// import DashBoardServices from '../../../src/services/DashBoardServices';
// import { jsPDF } from "jspdf";



// export default function IdCardS100() {
//     const [examinationCentersList, setExaminationCentersList] = useState([]);
//     const [selectedDistrict, setSelectedDistrict] = useState("");
//     const [selectedBlock, setSelectedBlock] = useState("");
//     const [selectedCenters, setSelectedCenters] = useState("");
//     const [allData, setAllData] = useState([]);
//     const [filterApplied, setFilterApplied] = useState(false);

//     //shows the loader kinda thing in attendance sheet
//     const [attendanceSheetLoading, setAttendanceSheetLoading] = useState(false)

//     const fetchExaminationCentersData = async () => {
//         try {
//             const response = await DistrictBlockCentersService.getDistrictBlockCenters();
//             setExaminationCentersList(response.data.data);
//         } catch (error) {
//             console.error("Error fetching examination centers:", error);
//         }
//     };

//     useEffect(() => {
//         fetchExaminationCentersData();
//     }, []);

//     const unqDistricts = [...new Set(examinationCentersList.map(item => item.district))];

//     const handleDistrictChange = (selectedOption) => {
//         setSelectedDistrict(selectedOption.value);
//     };

//     const filteredBlock = examinationCentersList.filter(
//         (eachBlock) => eachBlock.district === selectedDistrict
//     );

//     const unqFilteredBlock = [...new Set(filteredBlock.map(item => item.blockName))];

//     const handleBlockChange = (selectedOption) => {
//         setSelectedBlock(selectedOption.value);
//     };

//     //activate below snippet for level 1 only

//     const filteredCenters = examinationCentersList.filter(
//         (eachCenter) =>
//             eachCenter.blockName === selectedBlock &&
//             eachCenter.examinationLevel === "1" &&
//             eachCenter.examType === "S100"
//     );

// //Activate below snippet for level 2

//     // const filteredCenters = examinationCentersList.filter(
//     //     (eachCenter) =>
//     //         eachCenter.district === selectedDistrict &&
//     //         eachCenter.examinationLevel === "2" &&
//     //         eachCenter.examType === "MB"
//     // );



//     const handleCenterChange = (selectedOption) => {
//         setSelectedCenters(selectedOption.value);
//     };

//     const admitCard1 = true;
//     const attendancePdf = true;

//     //Activate below for level 1

//     const handleFilterSubmit = async () => {
//         if (selectedDistrict && selectedBlock && selectedCenters) {
//             setFilterApplied(true);
//         } else {
//             setFilterApplied(false);
//         }


//       // Activate below for level 2  

//     //   const handleFilterSubmit = async () => {
//     //     if (selectedDistrict && selectedCenters) {
//     //         setFilterApplied(true);
//     //     } else {
//     //         setFilterApplied(false);
//     //     }

//         //activate below query for level 1

       

//         let query = `district=${selectedDistrict}&block=${selectedBlock}&L1examinationCenter=${selectedCenters}&admitCard1=${admitCard1}&grade=10&isQualifiedL1=true`.trim();

//         //activate below query for level 2

//         // let query = `district=${selectedDistrict}&L2examinationCenter=${selectedCenters}&grade=8`.trim();

//         try {
//             const response = await DashBoardServices.GetAllStudentData(query);
//             setAllData(response.data || []);
//         } catch (error) {
//             console.log('Error fetching data: ', error);
//             setAllData([]);
//         }
//     };

//     const sortAllData = allData.sort((a, b) => a.rollNumber.localeCompare(b.rollNumber));

//         const admitHrLogo = "/admitHrLogo.png"
//         const buniyaadLogo = "/admitBuniyaLogo.png"
//         const viklapaLogo = "/vikalpalogo.png"


//         const generatePDF = async () => {
//             if (allData.length === 0) {
//                 alert("No data to generate ID cards.");
//                 return;
//             }
        
//             setAttendanceSheetLoading(true);
        
//             const doc = new jsPDF("p", "mm", "a4");
        
//             const cardWidth = 100; // mm
//             const cardHeight = 65; // mm
//             const marginX = 4.2;
//             const marginY = 5; // Reduced to fit 4 rows
        
//             const leftLogo = await toDataURL(admitHrLogo);
//             const rightLogo = await toDataURL(viklapaLogo);
        
//             for (let i = 0; i < allData.length; i++) {
//                 const student = allData[i];
//                 const row = Math.floor((i % 8) / 2); // Now 8 cards per page
//                 const col = i % 2;
        
//                 const posX = marginX + col * (cardWidth + 2); // slight horizontal spacing
//                 const posY = marginY + row * (cardHeight + 4); // tighter vertical spacing
        
//                 // Outer straight border
//                 doc.setDrawColor(0);
//                 doc.setLineWidth(0.5);
//                 doc.rect(posX, posY, cardWidth, cardHeight);
        
//                 // Inner rounded border
//                 const padding = 2;
//                 doc.roundedRect(posX + padding, posY + padding, cardWidth - 2 * padding, cardHeight - 2 * padding, 3, 3);
        
//                 // Logos
//                 doc.addImage(leftLogo, "PNG", posX + 3.5, posY + 2.5, 13, 13);
//                 doc.addImage(rightLogo, "PNG", posX + cardWidth - 16.5, posY + 2.5, 13, 13);
        
//                 // Header text
//                 doc.setFontSize(11);
//                 doc.setFont("helvetica", "bold");
//                 doc.text("HARYANA SUPER 100", posX + cardWidth / 2, posY + 6, { align: "center" });
        
//                 doc.setFontSize(7);
//                 doc.setFont("helvetica", "normal");
//                 doc.text("Village Barna, Dhand Road, Kurukshetra", posX + cardWidth / 2, posY + 9.5, { align: "center" });
//                 doc.text(`Phone No: 7206758099`, posX + cardWidth / 2, posY + 12.5, { align: "center" });
//                 doc.text("Level 2 Batch (2025-27)", posX + cardWidth / 2, posY + 16, { align: "center" });
        
//                 // Separator line
//                 const lineYPosition = posY + 18;
//                 doc.line(posX + 3, lineYPosition, posX + cardWidth - 3, lineYPosition);
        
//                 // Image area
//                 const imageX = posX + 4;
//                 const imageY = posY + 20.5;
//                 const imageWidth = 30;
//                 const imageHeight = 40;
        
//                 if (student.imageUrl) {
//                     try {
//                         const image = await toDataURL(student.imageUrl);
//                         doc.addImage(image, "JPEG", imageX, imageY, imageWidth, imageHeight);
//                     } catch (err) {
//                         console.warn("Image load error for", student.name);
//                         drawPlaceholderBox();
//                     }
//                 } else {
//                     drawPlaceholderBox();
//                 }
        
//                 function drawPlaceholderBox() {
//                     doc.setDrawColor(0);
//                     doc.rect(imageX, imageY, imageWidth, imageHeight);
//                     doc.setFontSize(6.5);
//                     doc.setFont("helvetica", "italic");
//                     doc.text("Fix Photo", imageX + imageWidth / 2, imageY + imageHeight / 2 - 2, { align: "center" });
//                     doc.text("Here", imageX + imageWidth / 2, imageY + imageHeight / 2 + 2, { align: "center" });
//                 }
        
//                 // Student info
//                 const textStartX = posX + 39.5;
//                 let currentY = posY + 24;
//                 const lineSpacing = 5.2;
//                 const underlineLength = 28;
        
//                 doc.setFontSize(7.5);
        
//                 const renderField = (label, value = "", underline = true) => {
//                     doc.setFont("helvetica", "bold");
//                     doc.text(label, textStartX, currentY);
//                     doc.setFont("helvetica", "normal");
//                     doc.text(value, textStartX + 18, currentY);
//                     if (underline) {
//                         doc.line(textStartX + 18, currentY + 0.8, textStartX + 18 + underlineLength, currentY + 0.8);
//                     }
//                     currentY += lineSpacing;
//                 };
        
//                 renderField("Name:", student.name);
//                 renderField("Father Name:", student.father);
//                 renderField("District:", student.district || "");
//                 renderField("Roll Number:", student.rollNumber);
//                 renderField("Batch:");
//                 renderField("Room No.:");
//                 renderField("Bed No.:");
//                 renderField("Contact:", student.mobile);
        
//                 // Add new page after every 8 cards
//                 if ((i + 1) % 8 === 0 && i !== allData.length - 1) {
//                     doc.addPage();
//                 }
//             }
        
//             doc.save("Student_ID_Cards.pdf");
//             setAttendanceSheetLoading(false);
//             alert("ID Cards downloaded!");
//         };
        

//         // Helper function to convert image URL to base64
//         const toDataURL = url =>
//     fetch(url)
//         .then(response => response.blob())
//         .then(blob => new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onloadend = () => resolve(reader.result);
//             reader.onerror = reject;
//             reader.readAsDataURL(blob);
//         }));
        
        
        
    
    
    

//     return (
//         <>
//             <Container fluid>
//                 <div id="content-to-pdf">
//                     <Row>
//                         <Col>
//                             <label>District</label>
//                             <Select
//                                 placeholder="District"
//                                 options={unqDistricts.map(district => ({ value: district, label: district }))}
//                                 onChange={handleDistrictChange}
//                             />
//                         </Col>


//                         {/* activate below dropdown at the time of level1 */}


//                         <Col>
//                             <label>Block</label>
//                             <Select
//                                 placeholder="Block"
//                                 options={unqFilteredBlock.map(block => ({ value: block, label: block }))}
//                                 onChange={handleBlockChange}
//                             />
//                         </Col>



//                         <Col>
//                             <label>Center</label>
//                             <Select
//                                 placeholder="Center"
//                                 options={filteredCenters.map(center => ({
//                                     value: center.examinationCenters,
//                                     label: center.examinationCenters
//                                 }))}
//                                 onChange={handleCenterChange}
//                             />
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col>
//                             <Button onClick={handleFilterSubmit}>Submit</Button>
//                         </Col>
//                     </Row>
//                     <br/>
//                     <Row>
//                         <Col>
//                         {attendanceSheetLoading ? (<h1 style={{color:'red'}}>Please Wait! Your File is Downloading...</h1> ):(<Button onClick={generatePDF}>Download Attendance Sheet</Button>)}
                           
//                         </Col>
//                     </Row>
//                     <hr />
//                     <Row>
//                         {filterApplied ? (
//                             <Row>
//                                 <Col>
//                                     <Table responsive>
//                                         <thead>
//                                             <tr>
//                                                 <th>#</th>
//                                                 <th>SRN</th>
//                                                 <th>Name</th>
//                                                 <th>Father</th>
//                                                 <th>Gender</th>
//                                                 <th>Category</th>
//                                                 <th>School</th>
//                                                 <th>RollNo.</th>
                                                
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {allData.length > 0 ? (
//                                                 allData.map((eachStudent, index) => (
//                                                     <tr key={index}>
//                                                         <td>{index + 1}</td>
//                                                         <td>{eachStudent.srn}</td>
//                                                         <td>{eachStudent.name}</td>
//                                                         <td>{eachStudent.father}</td>
//                                                         <td>{eachStudent.gender}</td>
//                                                         <td>{eachStudent.category}</td>
//                                                         <td>{eachStudent.school}</td>
//                                                         {/* <td>
//                                                             <img
//                                                                 src={eachStudent.imageUrl}
//                                                                 alt={eachStudent.name}
//                                                                 style={{ width: 100, height: 100 }}
//                                                             />
//                                                         </td> */}
//                                                         <td>{eachStudent.rollNumber}</td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="14" style={{ textAlign: "center" }}>
//                                                         No students found.
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </Table>
//                                 </Col>
//                             </Row>
//                         ) : (
//                             <div>
//                                 <h1>Kindly filter your center and download your attendance sheet.</h1>
//                             </div>
//                         )}
//                     </Row>
//                 </div>
//             </Container>
//         </>
//     );
// }




