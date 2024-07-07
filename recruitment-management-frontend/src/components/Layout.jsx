import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Dashboard.css';
import EmployeeSidebar from './EmployeeSidebar';

const Layout = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <EmployeeSidebar />
        </Col>
        <Col xs={10} className="content">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;