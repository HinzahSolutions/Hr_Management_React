

// import React from "react";
// import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
// import { BsSpeedometer, BsPeople, BsCalendarCheck, BsCurrencyDollar, BsFileEarmarkText, BsPerson, BsBoxArrowRight } from "react-icons/bs";
// import { FaUserTie, FaUsers, FaUserClock, FaMoneyBillWave, FaGift, FaHamburger, FaHandHoldingUsd, FaCalendarCheck } from "react-icons/fa";
// import Leaves  from "./Leaves"; // ✅ Added FaCalendarCheck
// import { Link } from "react-router-dom";

// const Navbarmain = () => {
//   return (
//     <Navbar bg="primary" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand href="#"> HR MANAGEMENT</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link href="/"><BsSpeedometer /> Dashboard</Nav.Link>

//             <NavDropdown title={<><BsPeople /> Employee</>} id="employee-dropdown">
//               <NavDropdown.Item href="#"><FaUserTie /> Employee</NavDropdown.Item>
//               <NavDropdown.Item href="#"><FaUsers /> Designation</NavDropdown.Item>
//               <NavDropdown.Item href="#"><FaUserClock /> Group</NavDropdown.Item>
//               <NavDropdown.Item href="#"><FaUserClock /> Shift</NavDropdown.Item>
//               <NavDropdown.Item href="#"><BsCalendarCheck /> Holidays</NavDropdown.Item>
//             </NavDropdown>

//             <NavDropdown title={<><BsCalendarCheck /> Attendance</>} id="attendance-dropdown">
//               <NavDropdown.Item href="#"><FaCalendarCheck /> Datewise Attendance</NavDropdown.Item>  {/* ✅ Fixed FaCalendarCheck */}
//               <NavDropdown.Item href="#"><FaCalendarCheck /> Monthly Attendance</NavDropdown.Item>  {/* ✅ Fixed FaCalendarCheck */}
//               <NavDropdown.Item href="#"><FaUserClock /> Datewise Overduty</NavDropdown.Item>
//             </NavDropdown>

//             <Nav.Link as={Link} to="/leaves" ><BsFileEarmarkText /> Leaves</Nav.Link>
//             <Nav.Link href="/salarylist"><BsCurrencyDollar /> Salary</Nav.Link>
//             <Nav.Link  as={Link} to="/loanlist" ><FaMoneyBillWave /> Loan</Nav.Link>

//             <NavDropdown title={<><BsBoxArrowRight /> Others</>} id="others-dropdown">
//               <NavDropdown.Item href="#"><FaHandHoldingUsd /> Overduty</NavDropdown.Item>
//               <NavDropdown.Item href="#"><FaGift /> Incentive</NavDropdown.Item>
//               <NavDropdown.Item href="#"><BsCurrencyDollar /> Bonus</NavDropdown.Item>
//               <NavDropdown.Item href="#"><FaMoneyBillWave /> Salary Holding</NavDropdown.Item>
//               <NavDropdown.Item href="#"><FaHamburger /> Food Allowance</NavDropdown.Item>
//             </NavDropdown>

//             <Nav.Link href="#"><BsFileEarmarkText /> Reports</Nav.Link>
//             <Nav.Link href="#"><BsPerson /> Users</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navbarmain;

import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { BsSpeedometer, BsPeople, BsCalendarCheck, BsCurrencyDollar, BsFileEarmarkText, BsPerson, BsBoxArrowRight } from "react-icons/bs";
import { FaUserTie, FaUsers, FaUserClock, FaMoneyBillWave, FaGift, FaHamburger, FaHandHoldingUsd, FaCalendarCheck } from "react-icons/fa";
import { TfiPanel } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";

const Navbarmain = () => {
  const location = useLocation(); 

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">HR MANAGEMENT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
              <BsSpeedometer /> Dashboard
            </Nav.Link>

            <NavDropdown title={<><BsPeople /> Employee</>} id="employee-dropdown">
              <NavDropdown.Item as={Link} to="/employee" className={location.pathname === "/employee" ? "active" : ""}>
                <FaUserTie /> Employee
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/designation" className={location.pathname === "/designation" ? "active" : ""}>
                <FaUsers /> Designation
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/group" className={location.pathname === "/group" ? "active" : ""}>
                <FaUserClock /> Group
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/shift" className={location.pathname === "/shift" ? "active" : ""}>
                <FaUserClock /> Shift
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/holidays" className={location.pathname === "/holidays" ? "active" : ""}>
                <BsCalendarCheck /> Holidays
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={<><BsCalendarCheck /> Attendance</>} id="attendance-dropdown">
              <NavDropdown.Item as={Link} to="/datewise-attendance" className={location.pathname === "/datewise-attendance" ? "active" : ""}>
                <FaCalendarCheck /> Datewise Attendance
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/weekly-attendance" className={location.pathname === "/weekly-attendance" ? "active" : ""}>
                <FaCalendarCheck /> Weekly Attendance
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/monthly-attendance" className={location.pathname === "/monthly-attendance" ? "active" : ""}>
                <FaCalendarCheck /> Monthly Attendance
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/datewise-overduty" className={location.pathname === "/datewise-overduty" ? "active" : ""}>
                <FaUserClock /> Datewise Overduty
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/leaves" className={location.pathname === "/leaves" ? "active" : ""}>
              <BsFileEarmarkText /> Leaves
            </Nav.Link>

            <Nav.Link as={Link} to="/salarylist" className={location.pathname === "/salarylist" ? "active" : ""}>
              <BsCurrencyDollar /> Salary
            </Nav.Link>

            <Nav.Link as={Link} to="/loanlist" className={location.pathname === "/loanlist" ? "active" : ""}>
              <FaMoneyBillWave />  Loan
            </Nav.Link>

            <NavDropdown title={<><BsBoxArrowRight /> Others</>} id="others-dropdown">
              <NavDropdown.Item as={Link} to="/overduty" className={location.pathname === "/overduty" ? "active" : ""}>
                <FaHandHoldingUsd /> Overduty
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/incentive" className={location.pathname === "/incentive" ? "active" : ""}>
                <FaGift /> Incentive
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/bonus" className={location.pathname === "/bonus" ? "active" : ""}>
                <BsCurrencyDollar /> Bonus
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/salary-holding" className={location.pathname === "/salary-holding" ? "active" : ""}>
                <FaMoneyBillWave /> Salary Holding
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/food-allowance" className={location.pathname === "/food-allowance" ? "active" : ""}>
                <FaHamburger /> Food Allowance
              </NavDropdown.Item>
            </NavDropdown>


            <NavDropdown title={<><BsBoxArrowRight /> Reports</>} id="reports-dropdown">
              <NavDropdown.Item as={Link} to="/attendance-report" className={location.pathname === "/attendance-report" ? "active" : ""}>
                <FaHandHoldingUsd /> Attendance Report
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/pf-esi-report" className={location.pathname === "/pf-esi-report" ? "active" : ""}>
                <FaGift /> PF / ESI Report
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/allowance-report" className={location.pathname === "/allowance-report" ? "active" : ""}>
                <BsCurrencyDollar /> Allowance Report
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/loan-report" className={location.pathname === "/loan-report" ? "active" : ""}>
                <FaMoneyBillWave /> Loan Report
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/salary-report" className={location.pathname === "/salary-report" ? "active" : ""}>
                <FaHamburger /> Salary Report
              </NavDropdown.Item>
            </NavDropdown>

            {/* <Nav.Link as={Link} to="/reports" className={location.pathname === "/reports" ? "active" : ""}>
              <BsFileEarmarkText /> Reports
            </Nav.Link> */}

            {/* <Nav.Link as={Link} to="/signup" className={location.pathname === "/users" ? "active" : ""}>
              <BsPerson /> Users
            </Nav.Link> */}
            <Nav.Link as={Link} to="/adminsetting" className={location.pathname === "/users" ? "active" : ""}>
              <TfiPanel /> Admin Panel
            </Nav.Link>
            <Nav.Link
  onClick={() => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/signup";
  }}
>
  <BsBoxArrowRight /> Logout
</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarmain;




