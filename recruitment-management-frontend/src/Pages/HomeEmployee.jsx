import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { Container, Row, Col, Table, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/HomeEmployee.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

const HomeEmployee = () => {
  const auth = useAuth();
  const userRole = auth.user?.role;
  const navigate = useNavigate();

  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/employee/ByEmail/${auth.user.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you use JWT for auth
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEmployeeInfo(data);
        } else {
          setError('Failed to fetch employee information');
        }
      } catch (error) {
        setError('An error occurred while fetching employee information');
      } finally {
        setLoading(false);
      }
    };

    if (auth.user?.email) {
      fetchEmployeeInfo();
    }
  }, [auth.user]);

  if (userRole !== 'Employee') {
    return <div>Unauthorized</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={10} className="content">
          <Row className="my-4">
            <Col>
              <h1>Information of Your Employee Account</h1>
            </Col>
          </Row>
          {employeeInfo && (
            <Row className="my-4">
              <Col>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>Full Name</td>
                      <td>{employeeInfo.fullName}</td>
                    </tr>
                    <tr>
                      <td>Identity Number</td>
                      <td>{employeeInfo.identityNumber}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{employeeInfo.email}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>{employeeInfo.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td>Position</td>
                      <td>{employeeInfo.position}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{employeeInfo.address}</td>
                    </tr>
                    <tr>
                      <td>Registration Date</td>
                      <td>{new Date(employeeInfo.registrationDate).toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeEmployee;
