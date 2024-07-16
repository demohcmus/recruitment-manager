import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Container, Row, Col, Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Css/HomeEmployee.css';

const RecruitmentInforList = () => {
  const auth = useAuth();
  const userRole = auth.user?.role;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [recruitmentList, setRecruitmentList] = useState([]);
  const [filteredRecruitments, setFilteredRecruitments] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

  useEffect(() => {
    fetch(`${apiUrl}/api/recruitment/allrecruitments`)
      .then(response => response.json())
      .then(data => {
        setRecruitmentList(data);
        setFilteredRecruitments(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [apiUrl]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredRecruitments(
      recruitmentList.filter(recruitment =>
        recruitment.position.toLowerCase().includes(value) ||
        recruitment.requirements.toLowerCase().includes(value) ||
        recruitment.jobDescription.toLowerCase().includes(value) ||
        recruitment.jobType.toLowerCase().includes(value) ||
        recruitment.status.toLowerCase().includes(value) ||
        recruitment.businessEmail.toLowerCase().includes(value)
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
            <h1>Recruitment List Data Table</h1>
            <h2>Recruitment Table</h2>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search recruitments..."
                aria-label="Search recruitments..."
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
                  <th>Position</th>
                  <th>Number of Positions</th>
                  <th>Recruitment Start Date</th>
                  <th>Recruitment End Date</th>
                  <th>Requirements</th>
                  <th>Job Description</th>
                  <th>Salary</th>
                  <th>Job Type</th>
                  <th>Posting Form</th>
                  <th>Posting Start Date</th>
                  <th>Posting Duration Days</th>
                  <th>Status</th>
                  <th>Business Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecruitments.map(recruitment => (
                  <tr key={recruitment.id}>
                    <td>{recruitment.position}</td>
                    <td>{recruitment.numberOfPositions}</td>
                    <td>{new Date(recruitment.recruitmentStartDate).toLocaleDateString()}</td>
                    <td>{new Date(recruitment.recruitmentEndDate).toLocaleDateString()}</td>
                    <td>{recruitment.requirements}</td>
                    <td>{recruitment.jobDescription}</td>
                    <td>{recruitment.salary}</td>
                    <td>{recruitment.jobType}</td>
                    <td>{recruitment.postingForm}</td>
                    <td>{new Date(recruitment.postingStartDate).toLocaleDateString()}</td>
                    <td>{recruitment.postingDurationDays}</td>
                    <td>
                      <span className={`badge bg-${recruitment.status === 'active' ? 'success' : 'danger'}`}>
                        {recruitment.status}
                      </span>
                    </td>
                    <td>{recruitment.businessEmail}</td>
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

export default RecruitmentInforList;
