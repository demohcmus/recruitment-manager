import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Container, Row, Col, Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Css/HomeEmployee.css'

const BusinessList = () => {
  const auth = useAuth();
  const userRole = auth.user?.role;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [businessList, setBusinessList] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

  useEffect(() => {
    fetch(`${apiUrl}/api/business/allbusinesses`)
      .then(response => response.json())
      .then(data => {
        setBusinessList(data);
        setFilteredBusinesses(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [apiUrl]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredBusinesses(
      businessList.filter(business =>
        business.companyName.toLowerCase().includes(value) ||
        business.taxCode.toLowerCase().includes(value) ||
        business.email.toLowerCase().includes(value) ||
        business.address.toLowerCase().includes(value) ||
        business.phoneNumber.toLowerCase().includes(value)
      )
    );
  };

  if (userRole !== 'Employee') {
    return <div>Unauthorized</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Row className="my-4">
          <Col>
            <h1>Business List Data Table</h1>
            <h2>Business Table</h2>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search businesses..."
                aria-label="Search businesses..."
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleSearch}
              />

            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Tax Code</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredBusinesses.map(business => (
                  <tr key={business.id}>
                    <td>{business.companyName}</td>
                    <td>{business.taxCode}</td>
                    <td>{business.email}</td>
                    <td>{business.address}</td>
                    <td>{business.phoneNumber}</td>
                    <td>{new Date(business.registrationDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default BusinessList;
