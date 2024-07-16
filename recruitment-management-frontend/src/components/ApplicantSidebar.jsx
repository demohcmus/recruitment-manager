import React, { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Dashboard.css";

const ApplicantSidebar = () => {
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
      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="#">Payment</Nav.Link>
        <Nav.Link href="#">Applicants</Nav.Link>
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

export default ApplicantSidebar;
