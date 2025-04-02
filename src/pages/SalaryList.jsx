import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";

const SalaryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    month: "January",
    year: "2025",
    designation: "All",
    group: "All",
    sort: "None",
    status: "All",
  });

  // Sample Salary Data
  const salaryData = [
    { id: 1, empId: "2001", name: "John Doe", role: "CEO", group: "IT Team", basicSalary: 25000, leaves: 20, lossOfPay: 16129, advance: 0, loan: 0, allowance: 0, netSalary: 8871, status: "Unpaid" },
    { id: 2, empId: "2002", name: "Mark Williams", role: "Developer", group: "IT Team", basicSalary: 20000, leaves: 20, lossOfPay: 12903, advance: 0, loan: 0, allowance: 0, netSalary: 7097, status: "Unpaid" },
    { id: 3, empId: "2003", name: "Stephen McDonald", role: "Developer", group: "IT Team", basicSalary: 20000, leaves: 21, lossOfPay: 6774, advance: 0, loan: 0, allowance: 0, netSalary: 13226, status: "Unpaid" },
    { id: 4, empId: "2004", name: "Kumar Swaminathan", role: "Designer", group: "IT Team", basicSalary: 15000, leaves: 20, lossOfPay: 9677, advance: 0, loan: 0, allowance: 0, netSalary: 5323, status: "Unpaid" },
    { id: 5, empId: "2005", name: "Murali Sambatham", role: "Designer", group: "IT Team", basicSalary: 10000, leaves: 23, lossOfPay: 7419, advance: 0, loan: 0, allowance: 0, netSalary: 2581, status: "Unpaid" },
  ];

  // Function to handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  // Filtered Data based on search & filters
  const filteredData = salaryData
    .filter((item) => {
      return (
        (filters.designation === "All" || item.role === filters.designation) &&
        (filters.group === "All" || item.group === filters.group) &&
        (filters.status === "All" || item.status === filters.status) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (filters.sort === "Net Salary (High to Low)") return b.netSalary - a.netSalary;
      if (filters.sort === "Net Salary (Low to High)") return a.netSalary - b.netSalary;
      return 0;
    });

  return (
    <div className="container-fluid p-3 mt-4">
      <h3 className="mb-3 text-center">Salary List</h3>

      {/* Filter Section */}
      <div className="row mb-3">
        <div className="col-lg-12 col-md-12 mx-auto">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <DropdownButton title={`Month: ${filters.month}`} onSelect={(e) => handleFilterChange("month", e)}>
              <Dropdown.Item eventKey="January">January</Dropdown.Item>
              <Dropdown.Item eventKey="February">February</Dropdown.Item>
              <Dropdown.Item eventKey="March">March</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Year: ${filters.year}`} onSelect={(e) => handleFilterChange("year", e)}>
              <Dropdown.Item eventKey="2025">2025</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Designation: ${filters.designation}`} onSelect={(e) => handleFilterChange("designation", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="CEO">CEO</Dropdown.Item>
              <Dropdown.Item eventKey="Developer">Developer</Dropdown.Item>
              <Dropdown.Item eventKey="Designer">Designer</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Group: ${filters.group}`} onSelect={(e) => handleFilterChange("group", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="IT Team">IT Team</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Sort: ${filters.sort}`} onSelect={(e) => handleFilterChange("sort", e)}>
              <Dropdown.Item eventKey="None">None</Dropdown.Item>
              <Dropdown.Item eventKey="Net Salary (High to Low)">Net Salary (High to Low)</Dropdown.Item>
              <Dropdown.Item eventKey="Net Salary (Low to High)">Net Salary (Low to High)</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Status: ${filters.status}`} onSelect={(e) => handleFilterChange("status", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Paid">Paid</Dropdown.Item>
              <Dropdown.Item eventKey="Unpaid">Unpaid</Dropdown.Item>
            </DropdownButton>

            <Button variant="success">+ Bulk Action</Button>
            <Button variant="primary">Generate Salary</Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-md-6 col-sm-10 mx-auto">
          <Form.Control type="text" placeholder="Search Employee" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Employee</th>
              <th>Basic Salary</th>
              <th>Leaves</th>
              <th>Loss of Pay</th>
              <th>Advance</th>
              <th>Loan</th>
              <th>Allowance</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((salary, index) => (
                <tr key={salary.id}>
                  <td>{index + 1}</td>
                  <td className="text-center">👤</td>
                  <td>{salary.empId} {salary.name} <br /><span className="badge bg-primary">{salary.role}</span></td>
                  <td>{salary.basicSalary}</td>
                  <td>{salary.leaves}</td>
                  <td>{salary.lossOfPay}</td>
                  <td>{salary.advance}</td>
                  <td>{salary.loan}</td>
                  <td>{salary.allowance}</td>
                  <td>{salary.netSalary}</td>
                  <td>
                    <Button variant={salary.status === "Paid" ? "success" : "danger"} size="sm">
                      {salary.status}
                    </Button>
                  </td>
                  <td>
                    <Button variant="warning" size="sm">✏️ Edit</Button>
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
  );
};

export default SalaryList;
