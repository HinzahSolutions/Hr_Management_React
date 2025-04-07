import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";

const LoanReport = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "All",
    designation: "All",
    group: "All",
    status: "All",
    sort: "None"
  });


  const loanReportData = [
    { id: 1, empID: 2001, employeeName: "Jhon", designation: "IT Team", group: "CEO", loanType: "Loan", loans: 5, startDate: "09-Nov-2024", endDate: "07-Apr-2025", total: "5000", paid: "3000", balance: "2000" },
    { id: 2, empID: 2002, employeeName: "David", designation: "HR Team", group: "CEO", loanType: "Advance", loans: 4, startDate: "19-May-2025", endDate: "06-Dec-2021", total: "2000", paid: "1000", balance: "1000" },
    { id: 3, empID: 2003, employeeName: "Charles", designation: "IT Team", group: "Manager", loanType: "Loan", loans: 2, startDate: "02-Nov-2024", endDate: "09-Nov-2024", total: "4000", paid: "0", balance: "4000" },
    { id: 4, empID: 2004, employeeName: "Mathuew", designation: "HR Team", group: "Manager", loanType: "Advance", loans: 1, startDate: "06-Dec-2021", endDate: "19-May-2025", total: "1000", paid: "0", balance: "1000" },
    { id: 5, empID: 2005, employeeName: "Victor", designation: "IT Team", group: "CEO", loanType: "Loan", loans: 3, startDate: "07-Apr-2025", endDate: "02-Nov-2024", total: "3000", paid: "1500", balance: "1500" },
  ];


  // Function to handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };


  const filteredLoanRepotData = loanReportData.filter((item) => {
    const status = item.balance === "0" ? "Non - Active" : "Active";

    return (
      (filters.type === "All" || item.loanType === filters.type) &&
      (filters.designation === "All" || item.designation === filters.designation) &&
      (filters.group === "All" || item.group === filters.group) &&
      (filters.status === "All" || filters.status === status) &&
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sorting logic
  if (filters.sort === "A-Z") {
    filteredLoanRepotData.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  } else if (filters.sort === "Z-A") {
    filteredLoanRepotData.sort((a, b) => b.employeeName.localeCompare(a.employeeName));
  }



  return (
    <div className="container-fluid p-3 mt-4">
      <h3 className="mb-3 text-center">Loan Report</h3>


      <div className="row mb-3">
        <div className="col-lg-10 col-md-12 mx-auto">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <DropdownButton title={`Loan Type : ${filters.type}`} onSelect={(e) => handleFilterChange("type", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Loan">Loan</Dropdown.Item>
              <Dropdown.Item eventKey="Advance">Advance</Dropdown.Item>
            </DropdownButton>

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

            <DropdownButton title={`Loan Status : ${filters.status}`} onSelect={(e) => handleFilterChange("status", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
              <Dropdown.Item eventKey="Non - Active">Non - Active</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Sort : ${filters.sort}`} onSelect={(e) => handleFilterChange("sort", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
              <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
            </DropdownButton>


            <Button variant="success"  >Filter</Button>
            <Button variant="danger" onClick={() => setFilters({ type: "All", designation: "All", group: "All", status: "All", sort: "All" })}>Cancel</Button>
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
              <th>Employee Name</th>
              <th>Designation / Group</th>
              <th>Type</th>
              <th>Loans</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoanRepotData.length > 0 ? (
              filteredLoanRepotData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>#{item.empID}<br />{item.employeeName}</td>
                  <td>{item.group}<br />{item.designation}</td>
                  <td>{item.loanType}</td>
                  <td>{item.loans}</td>
                  <td>{item.startDate}<br />{item.endDate}</td>
                  <td>{item.total}</td>
                  <td>{item.paid}</td>
                  <td>{item.balance}</td>
                  <td className="text-center">
                    <Button
                      variant={item.balance === "0" ? "secondary" : "success"}
                      size="sm"
                    >
                      {item.balance === "0" ? "Non - Active" : "Active"}
                    </Button>
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

export default LoanReport