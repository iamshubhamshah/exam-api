//FRONTEND/src/components/counselling/CounsellingDash.jsx

import React, { useState, useEffect } from "react";
import DashBoardServices from "../../services/DashBoardServices";
import { Row, Col, Table, Container, Accordion } from "react-bootstrap";

export const CounsellingDash = () => {
  //Hooks
  const [dashboardData, setDashBoardData] = useState([]);

  //--------------------------------------------------

  const fetchDashboardData = async () => {
    try {
      const response =
        await DashBoardServices.GetDataFor8DashboardCounselling();
      setDashBoardData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
        {/* <thead>
        <tr>
          <th>#</th>
          <th>District</th>
          <th>Enrolled</th>
          <th>Provision</th>
        </tr>
      </thead> */}
        <tbody>
          {dashboardData.length > 0
            ? dashboardData.map((eachDistrict, index) => {
                return (
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>
                        {/* <tr key={eachDistrict.district}>
                        <td>{index + 1}</td>
                        <td>{eachDistrict.district}</td>
                        <td>{eachDistrict.totalEnrolled}</td>
                        <td>{eachDistrict.totalProvision}</td>
                    </tr> */}
                        <div key={index} id={index}>
                          <p>District: {eachDistrict.district}</p>
                          <p>District: {eachDistrict.totalEnrolled}</p>
                          <p>District: {eachDistrict.totalProvision}</p>
                          <hr />
                          <p>
                            Total Present:{" "}
                            {eachDistrict.totalEnrolled +
                              eachDistrict.totalProvision}
                          </p>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Center Name</th>
                                  <th>Enrolled</th>
                                  <th>Provision</th>
                                </tr>
                              </thead>
                        {eachDistrict.centers.map((eachCenter, index) => {
                          return (
                            
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>
                                    {" "}
                                    {eachCenter.counsellingCenterAllocation}
                                  </td>
                                  <td>{eachCenter.selectedCount}</td>
                                  <td>{eachCenter.provisionCount}</td>
                                </tr>
                              </tbody>
                           
                          );
                          
                        })}
                         </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                );
              })
            : null}
        </tbody>
      </Table>
    </Container>
  );
};
