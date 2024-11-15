import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import RegistratonFormService from "../services/RegistrationFormService"; // I can remove this
import DashBoardServices from "../services/DashBoardServices";
import Table from "react-bootstrap/Table";

export default function DistrictBlockDash8() {
  const [stateDash, setStateDash] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await DashBoardServices.getDashBoard8();
      setStateDash(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error occured in fetching posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(stateDash);

  //Below variables are for shwoing total count on dashboars:
  const totalDistrictCount = stateDash.reduce((sum, eachDistrictCount) => {
    return sum + eachDistrictCount.districtCount;
  }, 0);
console.log(totalDistrictCount)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  return (
    <div>
      <h1>Mission Buniyaad Dash Board</h1>
      <hr/>
      <p style={{fontSize:'30'}}> Total Count: {totalDistrictCount}</p>
      <hr/>
      {stateDash.length > 0 ? (
        <>

        
          {stateDash.map((eachDistrict, index) => (
            <Accordion key={index}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div>
                    <p>District: {eachDistrict.district}</p>
                    <p>L-1 Registration Count: {eachDistrict.districtCount}</p>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Block</th>
                        <th>Block Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Access blocks within eachDistrict */}
                      {eachDistrict.blocks.map((eachBlock, blockIndex) => (
                        <tr key={blockIndex}>
                          <td>{blockIndex + 1}</td>
                          <td>{eachBlock.block}</td>
                          <td>{eachBlock.blockCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </>
      ) : null}
    </div>
  );
}
