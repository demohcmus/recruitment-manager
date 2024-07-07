import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Container, Row, Col, Table, Button, InputGroup, FormControl, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/HomeEmployee.css'

const HomeEmployee = () => {
  const auth = useAuth();
  const userRole = auth.user?.role;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const employeeList = [
    { id: 1, name: 'Employee 1', position: 'Position 1', department: 'Department 1', status: 'Active' },
    { id: 2, name: 'Employee 2', position: 'Position 2', department: 'Department 2', status: 'Inactive' },
  ];
  const [filteredEmployees, setFilteredEmployees] = useState(employeeList);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredEmployees(
      employeeList.filter(employee =>
        employee.name.toLowerCase().includes(value) ||
        employee.position.toLowerCase().includes(value) ||
        employee.department.toLowerCase().includes(value)
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
              <h1>Employee Data Table</h1>
              <h2>Table</h2>
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search employees..."
                  aria-label="Search employees..."
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
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.position}</td>
                      <td>{employee.department}</td>
                      <td>
                        <span className={`badge bg-${employee.status === 'Active' ? 'success' : 'danger'}`}>
                          {employee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
      </Row>
    </Container>
  );
};

export default HomeEmployee;
