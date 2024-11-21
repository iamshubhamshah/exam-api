//This component verifies the registered students data and once verified, the status on the registration slip updates to...
// registration done from pending. Enjoy the code below:

// This Page will consist User login for verification..
// I will use the same user table to store the verification team's users' data.


import React, {useState, useEffect, useContext} from 'react';
import DashBoardServices from '../services/DashBoardServices';
import {Table, Row, Col, Container, Button} from 'react-bootstrap';
import DependentDropsForFilter from './DependentDropsForFilter';
import UserService from '../services/UserService';
import {Link, Navigate, useLocation} from "react-router-dom";
import { UserContext } from './ContextApi/UserContextAPI/UserContext';
import VerificationService from '../services/VerificationService';
import Select from "react-select";




const BaseURL = process.env.REACT_APP_API_BASE_URL;

const Verification = () => {

    //Conditionally doing something on the based on useLocaiton
    const location = useLocation();


    //Defining state hooks;

    const [allData, setAllData] = useState([]);
    const [query, setQuery] =  useState('');
    const [filterApplied, setFilterApplied] = useState(false)


    //Below hooks are for letting users log in for verification.
    // const {setUser} = useContext(UserContext); // Context api

    const [userId, setUserId] = useState([]);
    const [isUerMatched, setIsUserMatched]= useState(false);
    const [errorRedirect, setErrorRedirect] = useState(false);


    //Filter Hooks

    const [district, setDistrict] = useState('')
    const [block, setBlock] = useState('')
    const [school, setSchool] = useState('')
  


    const handleSubmit = async function (e) {
        e.preventDefault();

        try {
            const response = await VerificationService.getVerificationUsers(userId);
            // console.log(response.data.data.userId)
            const dbuserId = response.data.data.userId;

            if (dbuserId === userId){
                setIsUserMatched(true);
                
            } else {
                setIsUserMatched(false);

            }


        } catch (error) {
            setErrorRedirect(true);
            
        }
    };


    //Below is for filter on verification data


    const handleFilterSubmit = async () => {
       if(district || block || school){
        setFilterApplied(true)
       

       } else{
        setFilterApplied(false)
       }

       let query = `district=${district}&block=${block}&school=${school}&grade=8`.trim();
      
       
        try {
            const response = await DashBoardServices.GetAllStudentData(query);
            setAllData(response.data || []);

            
        } catch (error) {
            console.log('Error fetching data: ', error);
            setAllData([])// Clear all data to set an empty array if filter don't match
            
        }

      
        
    };

    // useEffect(() => {
    //     handleFilterSubmit();
    //   }, [ district, block, school]);


      function handleClearFilter () {
        setFilterApplied(false)
        setDistrict('')
        setBlock('')
        setSchool('')
      }

      console.log(filterApplied)

    function verifyPost() {
        alert('i am veerified')
    }

      return (
        <Container>
            <Row>
                <from
                style={{
                    display: '',
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    textAlign: 'center', 
                    width: '500px', 
                    height: '100%', 
                    border:'solid',
                    borderRadius:'20px'
                  }}
                  onSubmit={handleSubmit}
                >
                    <label>Your ID:</label>
                    <br/>
                    <input
                    type='text'
                    name='userId'
                    placeholder='Your ID'
                    onChange={(e) => setUserId(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Login</button>
                </from>
            </Row>





            {isUerMatched ? (
                <>
                
                <Row>
            <Col>
                <DependentDropsForFilter
                // on clearing filter drop down filters resets to inital value
                district={district}
                block={block}
                school={school}
                setDistrict={setDistrict}
                setBlock={setBlock}
                setSchool={setSchool}
                />
                </Col>

             <Row>
                <Col className="d-flex" style={{ gap: '10px' }}>
                <Button onClick={handleFilterSubmit}>Apply Filter</Button>
                
                <Button onClick={handleClearFilter}>Clear Filter</Button>
                </Col>
                
             
             </Row>
                

            </Row>

            
            <Row>
            {filterApplied ? (
                <>
                <Row>
                
                <Col>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>SRN</th>
                            <th>Name</th>
                            <th>Father</th>
                            <th>D.O.B</th>
                            <th>Gender</th>
                            <th>Category</th>
                            <th>District</th>
                            <th>Block</th>
                            <th>School</th>
                            <th>Class</th>
                            <th>Image</th>
                            <th>Remarks</th>
                            <th>Status</th>
                            <th>Confirm</th>

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
                                    <td>{eachStudent.district}</td>
                                    <td>{eachStudent.block}</td>
                                    <td>{eachStudent.school}</td>
                                    <td>{eachStudent.grade}</td>
                                    <td>
                                        <img
                                        src={`https://vikalpaexamination.blr1.digitaloceanspaces.com/postImages/${eachStudent.imageUrl}`}
                                        alt={eachStudent.name}
                                        style={{width:100, height:100}}/>
                                    </td>
                                    {/* Below handles the verification process using multiselected dropdown */}
                                    <td>
                                    <Select
                                        placeholder="Select Verification status"
                                        isMulti
                                        options={[
                                            { value: 'Invalid Name', label: 'Invalid Name' },
                                            { value: 'Invalid Father', label: 'Invalid Father' },
                                            {value: 'Invalid Mobile', label:'Invalid Mobile'},
                                            {value: 'Invalid Image', label:'Invalid Image'},
                                            {value: 'Image Not Upoaded', label:'Image Not Uploaded'}
                                        ]}
                                        />

                                    </td>
                                    <td>
                                    <Select
                                        placeholder="Select Verification status"
                                        
                                        options={[
                                            { value: 'Verified', label: 'Verified' },
                                            { value: 'Not Verified', label: 'Not Verified' },
                                            {value: 'Rejected', label:'Rejected'}
                                        ]}
                                        />

                                    </td>
                                    <td>
                                        <button id={eachStudent.srn} onClick={(e)=>verifyPost(eachStudent.srn,e)}>Submit</button>
                                    </td>

                                </tr>
                            ))
                        ):(
                            <tr>
                                 <td colSpan="14" style={{ textAlign: "center" }}>This District or block or shool has no registration yet</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                </Col>
            </Row>
                </>

            ):(
                <div>
                    <h1>Kinldy Apply filters to Check Your School Dashboard</h1>
                </div>
            )}
            
        

            </Row>
                
                </>


            ):(

              <p>Wrong User Id</p>  


            )}      


            

        </Container>
      )


}

export default Verification;
