import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Container, Row, Col, Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Css/HomeEmployee.css';

const ApplicantList = () => {
  const auth = useAuth();
  const userRole = auth.user?.role;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [applicantList, setApplicantList] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

  useEffect(() => {
    fetch(`${apiUrl}/api/applicant/allapplicants`)
      .then(response => response.json())
      .then(data => {
        setApplicantList(data);
        setFilteredApplicants(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [apiUrl]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredApplicants(
      applicantList.filter(applicant =>
        applicant.fullName.toLowerCase().includes(value) ||
        applicant.identityNumber.toLowerCase().includes(value) ||
        applicant.email.toLowerCase().includes(value) ||
        applicant.address.toLowerCase().includes(value) ||
        applicant.phoneNumber.toLowerCase().includes(value) ||
        applicant.skills.toLowerCase().includes(value) ||
        applicant.educationLevel.toLowerCase().includes(value)
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
            <h1>Applicant List Data Table</h1>
            <h2>Applicant Table</h2>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search applicants..."
                aria-label="Search applicants..."
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
                  <th>Full Name</th>
                  <th>Identity Number</th>
                  <th>Birth Date</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Skills</th>
                  <th>Education Level</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map(applicant => (
                  <tr key={applicant.id}>
                    <td>{applicant.fullName}</td>
                    <td>{applicant.identityNumber}</td>
                    <td>{new Date(applicant.birthDate).toLocaleDateString()}</td>
                    <td>{applicant.gender}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.phoneNumber}</td>
                    <td>{applicant.address}</td>
                    <td>{applicant.skills}</td>
                    <td>{applicant.educationLevel}</td>
                    <td>{new Date(applicant.registrationDate).toLocaleDateString()}</td>
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

export default ApplicantList;
