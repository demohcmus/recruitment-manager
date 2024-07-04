import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Container, Row, Col, Table, Button, InputGroup, FormControl, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Dashboard.css';

const HomeBusiness = () => {
  const auth = useAuth();
  const userRole = auth.user?.role;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const businessesList = [
    { id: 1, title: 'title here 1', category: 'Category name', teacher: 'Teacher James', lesson: 'Lessons name', enrolled: 16, price: '$25.00', status: 'Active' },
    { id: 2, title: 'title here 2', category: 'Category name', teacher: 'Teacher James', lesson: 'Lessons name', enrolled: 16, price: '$25.00', status: 'Active' },
  ];
  const [filteredBusinesses, setFilteredBusinesses] = useState(businessesList);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredBusinesses(
      businessesList.filter(business =>
        business.title.toLowerCase().includes(value) ||
        business.category.toLowerCase().includes(value) ||
        business.teacher.toLowerCase().includes(value)
      )
    );
  };

  if (userRole !== 'Business') {
    return <div>Unauthorized</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar">
          <div className="logo">Salessa</div>
          <Nav defaultActiveKey="/dashboard" className="flex-column">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/register-recruitment')}>Register for recruitment</Nav.Link>
            <Nav.Link href="/payment">Payment</Nav.Link>
            <Nav.Link href="/applicant-list">Applicants</Nav.Link>
          </Nav>
        </Col>
        <Col xs={10} className="content">
          <Row className="my-4">
            <Col>
              <h1>Data table</h1>
              <h2>Table</h2>
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search content here..."
                  aria-label="Search content here..."
                  aria-describedby="basic-addon2"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Button variant="primary" id="button-addon2">
                  Add New
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Teacher</th>
                    <th>Lesson</th>
                    <th>Enrolled</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBusinesses.map(business => (
                    <tr key={business.id}>
                      <td>{business.title}</td>
                      <td>{business.category}</td>
                      <td>{business.teacher}</td>
                      <td>{business.lesson}</td>
                      <td>{business.enrolled}</td>
                      <td>{business.price}</td>
                      <td>
                        <span className={`badge bg-${business.status === 'Active' ? 'success' : 'danger'}`}>
                          {business.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeBusiness;
