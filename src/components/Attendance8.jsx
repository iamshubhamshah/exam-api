import React, { useState, useEffect } from 'react';
import DistrictBlockCentersService from '../services/DistrictBlockCentersService';
import Select from 'react-select';
import { Row, Col, Container, Table, Button } from 'react-bootstrap';
import DashBoardServices from '../services/DashBoardServices';
import { jsPDF } from "jspdf";

export default function Attendance8() {
    const [examinationCentersList, setExaminationCentersList] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedBlock, setSelectedBlock] = useState("");
    const [selectedCenters, setSelectedCenters] = useState("");
    const [allData, setAllData] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    const fetchExaminationCentersData = async () => {
        try {
            const response = await DistrictBlockCentersService.getDistrictBlockCenters();
            setExaminationCentersList(response.data.data);
        } catch (error) {
            console.error("Error fetching examination centers:", error);
        }
    };

    useEffect(() => {
        fetchExaminationCentersData();
    }, []);

    const unqDistricts = [...new Set(examinationCentersList.map(item => item.district))];

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption.value);
    };

    const filteredBlock = examinationCentersList.filter(
        (eachBlock) => eachBlock.district === selectedDistrict
    );

    const unqFilteredBlock = [...new Set(filteredBlock.map(item => item.blockName))];

    const handleBlockChange = (selectedOption) => {
        setSelectedBlock(selectedOption.value);
    };

    const filteredCenters = examinationCentersList.filter(
        (eachCenter) => eachCenter.blockName === selectedBlock
    );

    const handleCenterChange = (selectedOption) => {
        setSelectedCenters(selectedOption.value);
    };

    const admitCard1 = true;
    const attendancePdf = true;
    const handleFilterSubmit = async () => {
        if (selectedDistrict && selectedBlock && selectedCenters) {
            setFilterApplied(true);
        } else {
            setFilterApplied(false);
        }

        let query = `district=${selectedDistrict}&block=${selectedBlock}&L1examinationCenter=${selectedCenters}&admitCard1=${admitCard1}&grade=8&isVerified!=Rejected`.trim();

        try {
            const response = await DashBoardServices.GetAllStudentData(query);
            setAllData(response.data || []);
        } catch (error) {
            console.log('Error fetching data: ', error);
            setAllData([]);
        }
    };

    const sortAllData = allData.sort((a, b) => a.rollNumber.localeCompare(b.rollNumber));

        const admitHrLogo = "/admitHrLogo.png"
        const buniyaadLogo = "/admitBuniyaLogo.png"

    const generatePDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4'); // Landscape orientation
        const margin = 5;
        const pageHeight = 297;
        const pageWidth = 210;
        // Removed Category column and adjusted the column widths accordingly
        const columnWidths = [8, 20, 20, 20, 25, 20, 20, 20, 50]; // Adjusted column widths
        const imageHeight = 30; // Fixed image height for the row (in mm)
        const imageWidth = 35;  // Fixed image width (in mm)
        let currentY = 20;  // Start after the header
    
        // Calculate row height based on the image height
       const getRowHeight = 20;
    

        let emptyPhotText = `Attest your passport 
         size photo`
        // const addImage = (imgUrl, x, y) => {
        //     if (imgUrl) {
        //         doc.addImage(imgUrl, 'JPEG', x, y, imageWidth, imageHeight); // Add image with fixed width and height
        //     } else {
        //         // If the image URL is missing, draw a blank square
        //         doc.text(emptyPhotText, x + 2, y + imageHeight / 2); // Display text in the empty cell
        //     }
        // };

        doc.addImage(admitHrLogo, "PNG", 10, 3, 15, 15)
        doc.addImage(buniyaadLogo, "PNG", 180, 3, 15, 15)

        
        doc.setFontSize(10);
        doc.text('Mission Buniyaad Level-1 Attendance Sheet Batch 2025-27', 110, 8, {align:'center'})
        doc.setFontSize(12);
        doc.text(`District: ${selectedDistrict}, Block: ${selectedBlock}`, 110, 12, {align: "center"})
        doc.setFontSize(12);
        doc.text(`Center: ${selectedCenters}`, 110, 17, {align: "center"})

    
        const addRow = (index, student) => {
            const rowHeight = 25; // Use image height for row height
    
            // Adding borders for each column and wrapping the text
            doc.setFontSize(8);
            doc.rect(margin, currentY, columnWidths[0], rowHeight); // Border for # column
            doc.text(String(index + 1), margin + 2, currentY + 5);
            
            doc.setFontSize(8);
            const srnText = doc.splitTextToSize(student.srn, columnWidths[1] - 2); // Wrap text for Name column
            doc.rect(margin + columnWidths[0], currentY, columnWidths[1], rowHeight); // Border for SRN column
            doc.text(srnText, margin + columnWidths[0] + 2, currentY + 5);
    
            doc.setFontSize(8);
            const nameText = doc.splitTextToSize(student.name, columnWidths[2] - 2); // Wrap text for Name column
            doc.rect(margin + columnWidths[0] + columnWidths[1], currentY, columnWidths[2], rowHeight); // Border for Name column
            doc.text(nameText, margin + columnWidths[0] + columnWidths[1] + 2, currentY + 5);
    
            doc.setFontSize(8);
            const fatherText = doc.splitTextToSize(student.father, columnWidths[3] - 2); // Wrap text for Father column
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2], currentY, columnWidths[3], rowHeight); // Border for Father column
            doc.text(fatherText, margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + 2, currentY + 5);
    
            doc.setFontSize(8);
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], currentY, columnWidths[4], rowHeight); // Border for Gender column
            doc.text(student.gender, margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + 2, currentY + 5);
    
            doc.setFontSize(8);
            const schoolText = doc.splitTextToSize(student.school, columnWidths[5] - 2); // Wrap text for School column
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], currentY, columnWidths[5], rowHeight); // Border for School column
            doc.text(schoolText, margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + 2, currentY + 5);
            

            doc.setFontSize(8);
            const rollNumberText = doc.splitTextToSize(student.rollNumber, columnWidths[6] - 2); // Wrap text for School column
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], currentY, columnWidths[6], rowHeight); // Border for Image column
            doc.text(rollNumberText, margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + 2, currentY + 2);
    
            //doc.setFontSize(8);
            //const rollNumberText = doc.splitTextToSize(student.rollNumber, columnWidths[7] - 2); // Wrap text for School column
            
            doc.setFontSize(8);
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], currentY, columnWidths[7], rowHeight); // Border for RollNo column
            doc.text(" ", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + 2, currentY + 5);
    


                // Adding Paper Code column (blank)
                doc.setFontSize(8);
        doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], currentY, columnWidths[8], rowHeight); // Border for Paper Code column
        doc.text("", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + 2, currentY + 5); // Empty text for Paper Code column

        // doc.setFontSize(8);
        // // Adding Signature column (blank)
        // doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8], currentY, columnWidths[9], rowHeight); // Border for Signature column
        // doc.text("", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + 2, currentY + 5); // Empty text for Signature column

     



            currentY += rowHeight; // Increase currentY by the dynamic row height (image height)
        };
    
        const addTableHeader = () => {
            
            doc.setFont("helvetica", "bold");

     
    
            // Adding headers and borders
            doc.setFontSize(8)
            doc.rect(margin, currentY, columnWidths[0], 10); // Header border for # column
            doc.text("#", margin + 2, currentY + 7);
    
            
            doc.setFontSize(8)
            doc.rect(margin + columnWidths[0], currentY, columnWidths[1], 10); // Header border for SRN column
            doc.text("SRN", margin + columnWidths[0] + 2, currentY + 7);
    
            
            doc.setFontSize(8)
            doc.rect(margin + columnWidths[0] + columnWidths[1], currentY, columnWidths[2], 10); // Header border for Name column
            doc.text("Name", margin + columnWidths[0] + columnWidths[1] + 2, currentY + 7);
    
            
            doc.setFontSize(8)
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2], currentY, columnWidths[3], 10); // Header border for Father column
            doc.text("Father", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + 2, currentY + 7);
    
            
            doc.setFontSize(8)
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], currentY, columnWidths[4], 10); // Header border for Gender column
            doc.text("Gender", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + 2, currentY + 7);
    
            
            doc.setFontSize(8)
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], currentY, columnWidths[5], 10); // Header border for School column
            doc.text("School", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + 2, currentY + 7);
    
            
            doc.setFontSize(8)
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], currentY, columnWidths[6], 10); // Header border for Image column
            doc.text("Roll No.", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + 2, currentY + 7);
    
            doc.setFontSize(8)
            doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], currentY, columnWidths[7], 10); // Header border for RollNo column
            doc.text("Paper Code.", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + 2, currentY + 7);

            
            
         // Paper Code header
         doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], currentY, columnWidths[8], 10); // Header border for Paper Code column
         doc.text("Signature", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + 2, currentY + 7); // Paper code header
 
        //  // Signature header
        //  doc.rect(margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8], currentY, columnWidths[9], 10); // Header border for Signature column
        //  doc.text("Signature", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + 2, currentY + 7); // Signature header
 
         currentY += 10; // Move currentY down after header
     };
 
    
        addTableHeader();
        sortAllData.forEach((student, index) => {
            if (currentY + getRowHeight > pageHeight - margin) {
                doc.addPage(); // Add a new page if the content exceeds page height
                currentY = 20; // Reset Y to top of the new page
                addTableHeader(); // Add the header again
            }
            addRow(index, student);
        });
    
        doc.save("StudentDetails.pdf"); // Download PDF
    };
    
    
    
    
    

    return (
        <>
            <Container fluid>
                <div id="content-to-pdf">
                    <Row>
                        <Col>
                            <label>District</label>
                            <Select
                                placeholder="District"
                                options={unqDistricts.map(district => ({ value: district, label: district }))}
                                onChange={handleDistrictChange}
                            />
                        </Col>
                        <Col>
                            <label>Block</label>
                            <Select
                                placeholder="Block"
                                options={unqFilteredBlock.map(block => ({ value: block, label: block }))}
                                onChange={handleBlockChange}
                            />
                        </Col>
                        <Col>
                            <label>Center</label>
                            <Select
                                placeholder="Center"
                                options={filteredCenters.map(center => ({
                                    value: center.L1examinationCenters,
                                    label: center.L1examinationCenters
                                }))}
                                onChange={handleCenterChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={handleFilterSubmit}>Submit</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Button onClick={generatePDF}>Download Attendance Sheet</Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        {filterApplied ? (
                            <Row>
                                <Col>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>SRN</th>
                                                <th>Name</th>
                                                <th>Father</th>
                                                <th>Gender</th>
                                                <th>Category</th>
                                                <th>School</th>
                                                <th>RollNo.</th>
                                                
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
                                                        <td>{eachStudent.gender}</td>
                                                        <td>{eachStudent.category}</td>
                                                        <td>{eachStudent.school}</td>
                                                        {/* <td>
                                                            <img
                                                                src={eachStudent.imageUrl}
                                                                alt={eachStudent.name}
                                                                style={{ width: 100, height: 100 }}
                                                            />
                                                        </td> */}
                                                        <td>{eachStudent.rollNumber}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="14" style={{ textAlign: "center" }}>
                                                        No students found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        ) : (
                            <div>
                                <h1>Kindly filter your center and download your attendance sheet.</h1>
                            </div>
                        )}
                    </Row>
                </div>
            </Container>
        </>
    );
}
