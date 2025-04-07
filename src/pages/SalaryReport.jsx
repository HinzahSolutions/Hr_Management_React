import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const SalaryReport = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([new Date('2025-01-01'), new Date('2025-01-31')]);
  const [startDate, endDate] = dateRange;
  const [filters, setFilters] = useState({
    designation: "All",
    group: "All",
    sort: "None"
  });

  const salaryReportData = [
    { id: 1, empID: 2001, employeeName: "Jhon", designation: "IT Team", group: "CEO", basicSalary: "5000", pf: 0, esi: 0, leaves: 20, lossOfPay: "16,000", advance: 0, loan: 0, allowance: 0, salaryHolding: "0", food: 0, netSalary: "8,000" },
    { id: 2, empID: 2002, employeeName: "David", designation: "HR Team", group: "CEO", basicSalary: "3000", pf: 0, esi: 0, leaves: 20, lossOfPay: "12,000", advance: 0, loan: 0, allowance: 0, salaryHolding: "0", food: 0, netSalary: "6,000" },
    { id: 3, empID: 2003, employeeName: "Charles", designation: "IT Team", group: "Manager", basicSalary: "4000", pf: 0, esi: 0, leaves: 21, lossOfPay: "14,000", advance: 0, loan: 0, allowance: 0, salaryHolding: "1,000", food: 0, netSalary: "7,000" },
    { id: 4, empID: 2004, employeeName: "Mathuew", designation: "HR Team", group: "Manager", basicSalary: "1000", pf: 0, esi: 0, leaves: 20, lossOfPay: "15,000", advance: 0, loan: 0, allowance: 0, salaryHolding: "0", food: 0, netSalary: "7,500" },
    { id: 5, empID: 2005, employeeName: "Victor", designation: "IT Team", group: "CEO", basicSalary: "2000", pf: 0, esi: 0, leaves: 23, lossOfPay: "13,000", advance: 0, loan: 0, allowance: 0, salaryHolding: "0", food: 0, netSalary: "6,500" },
  ];


  // Function to handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };


  const filteredSalaryReportData = salaryReportData.filter((item) => {
    return (
      (filters.designation === "All" || item.designation === filters.designation) &&
      (filters.group === "All" || item.group === filters.group) &&
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })


  // Sorting logic
  if (filters.sort === "A-Z") {
    filteredSalaryReportData.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  } else if (filters.sort === "Z-A") {
    filteredSalaryReportData.sort((a, b) => b.employeeName.localeCompare(a.employeeName));
  }


  return (
    <div className="container-fluid p-3 mt-4">
      <h3 className="mb-3 text-center">Salary Report</h3>


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


            <Button variant="success"  >Filter</Button>
            <Button variant="danger" onClick={() => setFilters({ type: "All", designation: "All", group: "All", sort: "All" })}>Cancel</Button>
            <Button variant="primary" onClick={() => window.print()}>🖨️ Print</Button>
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
              <th>Basic Salary</th>
              <th>PF</th>
              <th>ESI</th>
              <th>Leaves</th>
              <th>Loss of Pay</th>
              <th>Advance</th>
              <th>Loan</th>
              <th>Allowance</th>
              <th>Salary Holding</th>
              <th>Food</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaryReportData.length > 0 ? (
              filteredSalaryReportData.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.empID}</td>
                  <td>{item.employeeName}</td>
                  <td>{item.basicSalary}</td>
                  <td>{item.pf}</td>
                  <td>{item.esi}</td>
                  <td>{item.leaves}</td>
                  <td>{item.lossOfPay}</td>
                  <td>{item.advance}</td>
                  <td>{item.loan}</td>
                  <td>{item.allowance}</td>
                  <td>{item.salaryHolding}</td>
                  <td>{item.food}</td>
                  <td>{item.netSalary}</td>
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

export default SalaryReport