import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function DashBoardPage () {
    return (
        <Container>
           <Row>
            <Link to={'/districtblockdash-mb'}>District Dashboard MB</Link>
            <Link to={'/districtblockdash-100'}>District Dashboard 100</Link>
            <Link to={'/blockschooldash-mb'}>Block Dashboard MB</Link>
            <Link to={'/blockschooldash-100'}>Block Dashboard 100</Link>
            <Link to={'/schooldash-mb'}>School Dashboard MB</Link>
            <Link to={'/schooldash-100'}>School Dashboard MB</Link>
           </Row>
        
        </Container>

    )
}