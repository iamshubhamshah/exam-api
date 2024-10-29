import React, {useState, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import DashBoardServices from '../services/DashBoardServices';
import Table from 'react-bootstrap/Table';


export default function SchoolDash8 () {
    const [BlockSchoolDash, setBlockSchoolDash] = useState([]);
    
    const fetchPosts = async()=>{
        try {
            const response = await DashBoardServices.getDashBoard8();
            setBlockSchoolDash(response.data)
            

        } catch (error) {
            
        }
     
    }
    useEffect(() =>{
        fetchPosts();
    }, []);
    console.log(BlockSchoolDash)
            
    
    return(
        <div>
           
            {BlockSchoolDash.length > 0 ?(
                <>
                {BlockSchoolDash.map((eachDistrict, index)=>(
                    <Accordion key = {index} deafaultActiveKey = {['0']}alwaysOpen>
                        {eachDistrict.blocks.map((eachBlock, eachBlockIndex)=>(
                            <>
                        
                        <Accordion.Item key={eachBlockIndex} eventKey={eachBlockIndex.toString()}>
                            <Accordion.Header>
                                <div>
                                <p>{eachBlock.block}</p>
                                <p>L-1 Count: {eachBlock.blockCount}</p>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>School</th>
                                            <th>L-1 Registration Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eachBlock.schools.map((eachSchool, eachSchoolIndex)=>(
                                            <tr key={eachSchoolIndex}>
                                                <td>{eachSchoolIndex+1}</td>
                                                <td>{eachSchool.school}</td>
                                                <td>{eachSchool.count}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>

                        </Accordion.Item>
                        </>
                        ))}
                    </Accordion>
                ))}
                </>
                
            ):(<p> Mo data found</p>)}
          
        </div>
    )
}