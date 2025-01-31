import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Dashboard.css';
import EmployeeSidebar from './EmployeeSidebar';
import Footer from './Component/Footer'; // Import the Footer component


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
      <Footer /> {/* Add the Footer component here */}
    </Container>
  );
};

export default Layout;
