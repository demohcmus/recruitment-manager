import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Dashboard.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

const HomeBusiness = () => {
  const auth = useAuth();
  const userRole = auth.user?.role;
  const navigate = useNavigate();

  const [businessInfo, setBusinessInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/business/${auth.user.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you use JWT for auth
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBusinessInfo(data);
        } else {
          setError('Failed to fetch business information');
        }
      } catch (error) {
        setError('An error occurred while fetching business information');
      } finally {
        setLoading(false);
      }
    };

    if (auth.user?.email) {
      fetchBusinessInfo();
    }
  }, [auth.user]);

  if (userRole !== 'Business') {
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
              <h1>Informations of Your Business</h1>
            </Col>
          </Row>
          {businessInfo && (
            <Row className="my-4">
              <Col>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>Company Name</td>
                      <td>{businessInfo.companyName}</td>
                    </tr>
                    <tr>
                      <td>Tax Code</td>
                      <td>{businessInfo.taxCode}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{businessInfo.email}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{businessInfo.address}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>{businessInfo.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td>Registration Date</td>
                      <td>{new Date(businessInfo.registrationDate).toLocaleDateString()}</td>
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

export default HomeBusiness;
