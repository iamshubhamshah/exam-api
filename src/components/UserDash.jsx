// This Dash Will be used by to see their registerd students.

import React, { useState, useEffect, useContext} from "react";
import DashBoardServices from "../services/DashBoardServices";
import { Table, Row, Col, Container, Button } from "react-bootstrap";
import DependentDropsForFilter from './DependentDropsForFilter';

import { UserContext } from "./ContextApi/UserContextAPI/UserContext";


const BaseURL = process.env.REACT_APP_API_BASE_URL;
const AllData = () => {
  //Defining useState hooks

  const [allData, setAllData] = useState([]);

  //Filter hooks
  const [district, setDistrict] = useState('')
  const [block, setBlock] = useState('')
  const [school, setSchool] = useState('')
  const [isUser, setIsUser] = useState('')

  const {user} = useContext(UserContext);
  



  


  console.log(district)

  
  const fetchAllData = async () => {

    let query = `isRegisteredBy=${user.mobile}&district=${district}&block=${block}&school=${school}`.trim();
    
    try {
      const response = await DashBoardServices.GetAllStudentData(query);
      setAllData(response.data || []);
    } catch (error) 
       { console.log("Error fetching data:", error);
        setAllData([]) //Clear all data to set an empty array if filter don't match
       }
  };

  useEffect((e) => {
    fetchAllData();
  }, [ district, block, school]);

  
  function handleClearFilter() {
    setDistrict('')
    setBlock('')
    setSchool('')
  }



  return (
    <Container>
      <Row>
        <Col >
        <DependentDropsForFilter
        setDistrict={setDistrict}
        setBlock={setBlock}
        setSchool={setSchool}        
        />
        
        </Col>

        <Button onClick={handleClearFilter}>Clear Filter</Button>
       
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
                          src={`${BaseURL}/api/postimages/${eachStudent.image}`}
                          alt={eachStudent.name}
                          style={{ width: 100, height: 100 }}
                        />
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
  );
};

export default AllData;
