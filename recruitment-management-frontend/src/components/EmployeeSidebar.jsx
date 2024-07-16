import React, { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Dashboard.css";

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("/dashboard");

  const handleSelect = (key) => {
    setActiveKey(key);
    navigate(key);
  };

  const handleLogout = () => {
    // Xử lý logic đăng xuất tại đây (xóa token, session, vv)
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo">ABC Company</div>
      <Nav
        defaultActiveKey="/dashboard"
        className="flex-column"
        onSelect={handleSelect}
        activeKey={activeKey}
      >
        <Nav.Link
          eventKey="/dashboard"
          className={`sub-nav ${activeKey === "/dashboard" ? "active" : ""}`}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link
          eventKey="/business-list"
          className={`sub-nav ${
            activeKey === "/business-list" ? "active" : ""
          }`}
        >
          Business List
        </Nav.Link>
        <Nav.Link
          eventKey="/applicant-list"
          className={`sub-nav ${
            activeKey === "/applicant-list" ? "active" : ""
          }`}
        >
          Applicant List
        </Nav.Link>
        <Nav.Link
          eventKey="/recruitment-infor-list"
          className={`sub-nav ${
            activeKey === "/recruitment-infor-list" ? "active" : ""
          }`}
        >
          Recruitment Infor List
        </Nav.Link>
        <Nav.Link
          eventKey="/applicant-profile-list"
          className={`sub-nav ${
            activeKey === "/applicant-profile-list" ? "active" : ""
          }`}
        >
          Profile Of Applicants
        </Nav.Link>
      </Nav>
      <Button
        className="btn btn-primary btn-lg px-5 active custom-logout-btn"
        role="button"
        aria-pressed="true"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default EmployeeSidebar;
