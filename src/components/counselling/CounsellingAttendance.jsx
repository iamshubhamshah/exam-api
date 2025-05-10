// /FRONTEND/src/counselling/CounsellingAttendance.jsx

import React, { useState, useEffect, useRef } from "react";
import DistrictBlockCentersService from "../../services/DistrictBlockCentersService";
import Select from "react-select";
import { Row, Col, Container, Table, Button, Card } from "react-bootstrap";
import DashBoardServices from "../../services/DashBoardServices";
import { jsPDF } from "jspdf";
import registrationServiceInstance from "../../services/RegistrationFormService";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import Navbar from "../Navbar";
import NavbarCounselling from "../NavbarCounselling";

export const CounsellingAttendance = () => {

    //hooks

    const [srn, setSrn] = useState("")
    const [attendanceMarkedStatus, setAttendanceMarkedStatus] = useState("")
    const [token, setToken] = useState("")
    const [tokenWaiting, setTokenWating] = useState("")
    const [studentData, setStudentData] = useState([])


    const [examinationCentersList, setExaminationCentersList] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedBlock, setSelectedBlock] = useState("");
    const [selectedCenters, setSelectedCenters] = useState("");
    const [allData, setAllData] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    const [changedTokenType, setChangedTokenType] = useState("");

    const prevSelectedLength = useRef(0);
    const prevWaitingLength = useRef(0);


    //dropdowns:

    // Fetch centers data
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

    const unqDistricts = [
        ...new Set(examinationCentersList.map((item) => item.district)),
    ];

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption.value);
        setStudentData([]); // Reset student data when district changes
    };

    console.log("i am district selected", selectedDistrict);
    //_______________________________________________________________________

//Function to get those students data who are marked present for couselling.

const CounselingStudentsData = async () => {

    let counsellingAttendance = true;
    let isPresentInL3Examination = true;

    let query;

    if (!selectedDistrict){
        console.log("Select District")
        return;
    } else {
        query = `district=${selectedDistrict}&isPresentInL3Examination=${isPresentInL3Examination}&grade=8&counsellingAttendance=${counsellingAttendance}`.trim();
    console.log('i got')
    }

    try {
        const response = await DashBoardServices.GetAllStudentData(query);
        console.log(response.data)

        setStudentData(response.data)

        setSrn("")

    } catch (error) {
        console.error("Fetch Failed:", error);
        if (error.response && error.response.status === 404) {
            setToken(1)
        } 
    }
}

// Run CounselingStudentsData whenever the district changes
useEffect(() => {
    if (selectedDistrict) {
        CounselingStudentsData();
    }

    CounselingStudentsData();
}, [selectedDistrict, attendanceMarkedStatus]);

  // Function to handle attendance update (marking attendance)
  const handleAttendanceUpdate = async (e) => {
    e.preventDefault()
    
    if(!selectedDistrict){
        alert ('Select District')
        return;
    }

    const formData = {
        counsellingToken: 'S'+ token,
        counsellingToken1: 'W'+tokenWaiting

    }

    
    console.log(formData)
      try {
       
        const response = await registrationServiceInstance.patchCounsellingBySrn(srn, selectedDistrict, formData);
        console.log(response.status)

        if (response.status === 200) {
            setAttendanceMarkedStatus("Attendance Marked ✅")

            setTimeout (()=> {
                setAttendanceMarkedStatus("")
            }, 3000)
        }

        
       
      } catch (error) {
        console.error("Patch failed:", error);
        if (error.response && error.response.status === 500) {
            alert("Either this student doesn't belong to selected district or Attendance Already Marked");
        } else  {
            alert("Student Not Found");
        }
        
    }

    
}

//Filtering the selected and waiting students data
const selectedStudents = studentData.filter(student => student.finalShortListOrWaitListStudents === "Selected");
const waitingStudents = studentData.filter(student => student.finalShortListOrWaitListStudents === "Waiting");

useEffect(() => {
    setToken(selectedStudents.length + 1)
    setTokenWating(waitingStudents.length + 1)

    if (selectedStudents.length !== prevSelectedLength.current) {
        setChangedTokenType("selected");
    } else if (waitingStudents.length !== prevWaitingLength.current) {
        setChangedTokenType("waiting");
    }

    prevSelectedLength.current = selectedStudents.length;
    prevWaitingLength.current = waitingStudents.length;
}, [studentData, attendanceMarkedStatus]);  // Recalculate whenever studentData changes


console.log(selectedStudents)
console.log(waitingStudents)
  return (
    <Container fluid>
        <NavbarCounselling/>
    <div className="counselling-attendance-main">
        
        <Row>

        <Col>
              <label>District</label>
              <Select
              className="attendance-select"
                placeholder="District"
                options={unqDistricts.map((district) => ({
                  value: district,
                  label: district,
                }))}
                onChange={handleDistrictChange}
              />
                <br/>
                
            </Col>
        
                
        </Row>
         
        <h3>{attendanceMarkedStatus}</h3>
        {changedTokenType === "selected" && (
          <h3>Token Number: S{selectedStudents.length}</h3>
        )}
        {changedTokenType === "waiting" && (
          <h3>Token Number: W{waitingStudents.length}</h3>
        )}
       <Card className="counselling-attendance-card" >
        <div className="counselling-logo">
        <Card.Img variant="top" src="./Buniyaad.png" style={{width: '4rem', height:'5rem'}} />
        <Card.Img variant="top" src="./haryana.png" style={{width: '4rem', height:'5rem'}} />
        </div>
      
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}>Attendance</Card.Title>
        <hr/>
        <Card.Text>
          <label for='srn' >SRN Number</label>
          <input type="text" name="srn"
          value={srn}
          onChange={(e)=>setSrn(e.target.value)}
          />
        </Card.Text>
        
      </Card.Body>
      <br/>
      
      <Button onClick={handleAttendanceUpdate} variant="primary">Submit</Button>
      <br/>
      <br/>
      <br/>
    </Card>
    </div>
    </Container>
  );
};
