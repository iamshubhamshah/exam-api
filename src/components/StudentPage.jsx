import React, { useContext, useState, userContext, useRef } from "react";
import StudentNavbar from "./StudentNavbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import AcknowledgementSlip from "./AcknowledgementSlip";
import { StudentContext } from "./ContextApi/StudentContextAPI/StudentContext";
import { Col, Row, Container } from "react-bootstrap";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//Importing admit card
import AdmitCard from "./AdmitCard";

const StudentPage = () => {
  //Using StudentContext API. Only works if the user logs in. other wise doesn't work.
  const { setStudent } = useContext(StudentContext);

  const { student } = useContext(StudentContext);
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //Below const controls the student page layout according to their level
  //It switches the level like, when admit card needs to be downloaded then do this, and if result needs to...
  //... needs to be downloaded then do this

  const switchLevel = "Level1";

  //below values can be used student page content according to the level of exam

  // "Level2", "Level3"

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //Below function downloads the certificate for those students who have qualified for l2 examination
  async function downloadCertificate() {
    const pdf = new jsPDF("landscape", "mm", [297, 210]);

    //certificate png below in public folder of frontend folder
    const certificate = "/L1QualificationCertificateblank.png";

    pdf.addImage(certificate, "PNG", 0, 0, 297, 210);

    const text1 = "This is to certify that";
    const studentName = student.name.toUpperCase();
    const fatherName = student.father.toUpperCase();
    const district = student.district.toUpperCase();
    const block = student.block.toUpperCase();
    const schoolName = student.school;
    const stateRank = student.L1StateRank;
    const districtRank = student.L1DistrictRank;

    //text of certificate
    pdf.setFontSize(14);
    pdf.text(`This is to certify that "${studentName}"`, 41, 105, {
      align: "left",
    });
    pdf.line(86, 106, 145, 106);

    pdf.setFontSize(14);
    pdf.text(`, Son/Daughter of Shri "${fatherName}"`, 146, 105, {
      align: "left",
    });
    pdf.line(196, 106, 255, 106);

    pdf.setFontSize(14);
    pdf.text(`from ${district}`, 42, 116, {
      align: "left",
    });

    pdf.line(52, 117, 105, 117);

    pdf.setFontSize(14)
    pdf.text(`${block}`, 110, 116, {align:'left'})
    pdf.line(107, 117, 169, 117);

    pdf.setFontSize(14);
    pdf.text(
      `studying at "${schoolName}"`,
      41,
      127,
      { align: "left" }
    );
    pdf.line(66, 128, 220, 128);
    pdf.setFontSize(14);
    pdf.text(', has qualified the', 220, 127, {align:'left'})
    

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(
      `Mission Buinyaad Entrance Examination  Level-1 for the batch of 2025-27.`,
      40,
      138,
      { align: "left" }
    );

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(`State Rank:   ${stateRank}`, 40, 149, { align: "left" });
    pdf.line(69, 150, 95, 150);

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(`District Rank:   ${districtRank}`, 40, 160, { align: "left" });
    pdf.line(74, 161, 95, 161); //82

    //Save pdf
    pdf.save(`${student.name}_${student.srn}_L1Qualifying.pdf`);
  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //Below peice of code shows the static certificate with dynamic text.

  const cardRef = useRef();
  const [imageSrc, setImageSrc] = useState(null);

  const handleGenerateImage = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      setImageSrc(imgData);
    });
  };

  //^^^^^^^^^^^^^^^^^^^^^

  return (
    <div>
         <StudentNavbar />
      <Container fluid>
       
        <br />
        {switchLevel === "Level1" ? (
          <div>
            <Row
              className="StudentPage"
              style={{
                width: "100%",
                border: "3px solid",
                margin: "auto",
                padding: "10px",
              }}
            >
              <Col>
                <h3>Your Basic Details:</h3>
                <hr />
                <div>
                  <div
                    style={{
                      display: "flex", // Parent container as flex
                      flexDirection: "column", // Stack sections in a column
                      gap: "10px", // Adds space between the sections
                    }}
                  >
                    {/* <section className='ackfont' style={{display:'grid', gridTemplateColumns: '150px 1fr', gap:'25px'}}>
                        <p>Slip ID:</p>
                        <p>{student.name}</p>
                    </section> */}

                    <section
                      className="ackfont"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "150px 1fr",
                        gap: "50px",
                      }}
                    >
                      <p>SRN:</p>
                      <p>{student.srn}</p>
                    </section>
                    <section
                      className="ackfont"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "150px 1fr",
                        gap: "50px",
                      }}
                    >
                      <p>Roll Number:</p>
                      <p>{student.rollNumber}</p>
                    </section>

                    <section
                      className="ackfont"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "150px 1fr",
                        gap: "50px",
                      }}
                    >
                      <p>Name:</p>
                      <p>{student.name}</p>
                    </section>

                    <section
                      className="ackfont"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "150px 1fr",
                        gap: "50px",
                      }}
                    >
                      <p>Father Name:</p>
                      <p>{student.father}</p>
                    </section>

                    <section
                      className="ackfont"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "150px 1fr",
                        gap: "50px",
                      }}
                    >
                      <p>D.O.B:</p>
                      <p>{student.dob}</p>
                    </section>

                    <section
                      className="ackfont"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "150px 1fr",
                        gap: "50px",
                      }}
                    >
                      <p>Gen:</p>
                      <p>{student.gender}</p>
                    </section>

                    <section
                      className="ackfont"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "150px 1fr",
                        gap: "50px",
                      }}
                    >
                      <p>Category:</p>
                      <p>{student.category}</p>
                    </section>

                    <section
                      className="ackfont"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "150px 1fr",
                        gap: "50px",
                      }}
                    >
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
              <hr />
              <div>
                <AdmitCard />
              </div>
            </Row>
          </div>
        ) : (
          <div>
            {switchLevel === "Level2" ? (
              <Row >
                {/* below snippet checks if the student is qualified or not, in exam. if yes then show download certificate, other wise notqalified text */}

                {student.isQualifiedL1 === true ? (
                  <div>
                    <Container style={{ width: "60%" }}>
                      <Row className="border mb-3 rounded-2">
                        <h3 style={{ textAlign: "center", color: "red" }}>
                          You have qualified Mission Buinyaad Entrance
                          Examination Level-1
                        </h3>
                        <hr />
                        <h4 style={{ textAlign: "center" }}>
                          Congratulations <u>{student.name.toUpperCase()}</u>, son/daughter of{" "}
                          <u>{student.father.toUpperCase()}</u> from district{" "}
                          {student.L1districtAdmitCard} and block{" "}
                          {student.L1blockAdmitCard} for qualifying Mission
                          Buinyaad Entrance Examination Level-1 .
                          <br />
                        </h4>
                      </Row>
                    </Container>
                    
                    <br/>
                    <br/>
                    <br/>

                    {/* Below button has a css in index.css  */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "8vh",
                      }}
                    >

                      <button
                        class="blinking-text"
                        onClick={downloadCertificate}
                        style={{fontSize:'18px'}}
                      >
                        Click here to downloady your <span style={{fontSize: "30px"}}>Qualifying Certificate</span>. <br/>(अपना
                        प्रमाणपत्र डाउनलोड करने के लिए यहां क्लिक करें।)
                      </button>
                      <div> <AdmitCard /></div>
                     
                    </div>
                   
              <div>
                
              </div>
                  </div>
                ) : (
                  <div>
                    <Container style={{ width: "60%" }}>
                      <Row className="border mb-3 rounded-2">
                        <h3 style={{ textAlign: "center", color: "red" }}>
                          You have not qualified Mission Buinyaad Level-1
                          Entrance Examination
                        </h3>
                        <hr />
                        <h4 style={{ textAlign: "center" }}>
                        Dear Student, You put in commendable effort in the Mission Buniyad Level 1 Entrance Exam. You did not qualify because your rank is higher than the 21,138 selected students. Keep striving for success!<br/><br/>
                          (प्रिय छात्र, आपने मिशन बुनियाद लेवल 1 प्रवेश परीक्षा में सराहनीय प्रयास किया। हालाँकि आप उत्तीर्ण नहीं हुए क्योंकि आपकी रैंक 21,138 चयनित छात्रों से अधिक है। सफलता के लिए प्रयास करते रहें!|)
                          <br />
                        </h4>
                      </Row>
                      
                    </Container>
                  </div>
                )}
              </Row>
            ) : null}
          </div>
        )}

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
      </Container>
      <br/>
      <Footer />
    </div>
  );
};

export default StudentPage;
