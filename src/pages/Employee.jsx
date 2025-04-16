import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Employee() {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([new Date('2025-01-01'), new Date('2025-01-31')]);
  const [startDate, endDate] = dateRange;
  const [filters, setFilters] = useState({
    designation: "All",
    group: "All",
    status: "All",
    sort: "None"
  });


  const employeeList = [
    { id: 1, empID: 2001, employeeName: "Jhon", designation: "IT Team", group: "CEO", nationality: "indian", email: "jhon@gmail.com", address: "chennai", joiningDate: "09-Nov-2024", contact: "1234567890" },
    { id: 2, empID: 2002, employeeName: "David", designation: "HR Team", group: "CEO", nationality: "indian", email: "david@gmail.com", address: "chennai", joiningDate: "19-May-2025", contact: "0987654321" },
    { id: 3, empID: 2003, employeeName: "Charles", designation: "IT Team", group: "Manager", nationality: "indian", email: "charles@gmail.com", address: "chennai", joiningDate: "02-Nov-2024", contact: "1234509876" },
    { id: 4, empID: 2004, employeeName: "Mathuew", designation: "HR Team", group: "Manager", nationality: "indian", email: "mathuew@gmail.com", address: "chennai", joiningDate: "06-Dec-2021", contact: "0987612345" },
    { id: 5, empID: 2005, employeeName: "Victor", designation: "IT Team", group: "CEO", nationality: "indian", email: "victor@gmail.com", address: "chennai", joiningDate: "07-Apr-2025", contact: "5432167890" },
  ];


  // Function to handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };


  const filteredEmployeeList = employeeList.filter((item) => {
    return (
      (filters.designation === "All" || item.designation === filters.designation) &&
      (filters.group === "All" || item.group === filters.group) &&
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })


  // Sorting logic
  if (filters.sort === "A-Z") {
    filteredEmployeeList.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  } else if (filters.sort === "Z-A") {
    filteredEmployeeList.sort((a, b) => b.employeeName.localeCompare(a.employeeName));
  }


  return (
    <div className="container-fluid p-3 mt-4">
      <h3 className="mb-3 text-center">Employee List</h3>

      <div className="row mb-3">
        <div className="col-lg-10 col-md-12 mx-auto">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable
              placeholderText="Select Date Range"
              className="form-control"
              dateFormat="dd-MM-yyyy" // 👈 Add this line
            />

            <DropdownButton title={`Designation : ${filters.designation}`} onSelect={(e) => handleFilterChange("designation", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="IT Team">IT Team</Dropdown.Item>
              <Dropdown.Item eventKey="HR Team">HR Team</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Group : ${filters.group}`} onSelect={(e) => handleFilterChange("group", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="CEO">CEO</Dropdown.Item>
              <Dropdown.Item eventKey="Manager">Manager</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Sort : ${filters.sort}`} onSelect={(e) => handleFilterChange("sort", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
              <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
            </DropdownButton>

            <Button variant="danger" onClick={() => setFilters({ designation: "All", group: "All", sort: "All" })}>Reset</Button>
            <Button variant="success" onClick={() => navigate("/addemployee")}  >+ Add Employee</Button>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 col-sm-10 mx-auto">
          <Form.Control
            type="text"
            placeholder="Search Employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>



      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>email</th>
              <th>Contact</th>
              <th>Designation / Group</th>
              <th>Joining Date</th>
              <th>Nationality</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployeeList.length > 0 ? (
              filteredEmployeeList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.empID}</td>
                  <td>{item.employeeName}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.group}<br />{item.designation}</td>
                  <td>{item.joiningDate}</td>
                  <td>{item.nationality}</td>
                  <td>{item.address}</td>
                  <td>
                    <Button variant="success" size="sm">Active</Button>
                  </td>
                  <td>
                    <Button variant="primary" size="sm">✏️ Edit</Button>{" "}
                    <Button variant="danger" size="sm">🗑 Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center text-danger">No records found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>




    </div>
  )
}

export default Employee