import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton, Modal} from "react-bootstrap";

const LoanList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newLoan, setNewLoan] = useState({
    empId: "",
    name: "",
    role: "",
    group: "",
    type: "Loan",
    loans: 1,
    date: new Date().toISOString().split("T")[0],
    total: 0,
    paid: 0,
    balance: 0,
    status: "Active",
  });

  const [filters, setFilters] = useState({
    loanType: "All",
    designation: "All",
    group: "All",
    loanStatus: "All",
    sort: "None",
  });

  // Sample Loan Data
  const [loanData, setLoanData] = useState([
    { id: 1, empId: "2001", name: "John Doe", role: "CEO", group: "IT Team", type: "Loan", loans: 1, date: "03-Jan-2025", total: 5000, paid: 4000, balance: 1000, status: "Active" },
    { id: 2, empId: "2002", name: "John Doe", role: "CEO", group: "IT Team", type: "Advance", loans: 5, date: "03-Feb-2025", total: 3000, paid: 0, balance: 3000, status: "Active" },
    { id: 3, empId: "2003", name: "Mark", role: "Developer", group: "IT Team", type: "Advance", loans: 5, date: "05-Feb-2025", total: 7000, paid: 5000, balance: 2000, status: "Active" },
  ]);



  const filteredData = loanData
    .filter((item) => {
      return (
        (filters.loanType === "All" || item.type === filters.loanType) &&
        (filters.designation === "All" || item.role === filters.designation) &&
        (filters.group === "All" || item.group === filters.group) &&
        (filters.loanStatus === "All" || item.status === filters.loanStatus) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (filters.sort === "Balance (High to Low)") return b.balance - a.balance;
      if (filters.sort === "Balance (Low to High)") return a.balance - b.balance;
      return 0;
    });

    const handleFilterChange = (type, value) => {
      setFilters((prev) => ({ ...prev, [type]: value }));
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewLoan({ ...newLoan, [name]: value });
    };
  
    const handleAddLoan = () => {
      setLoanData([...loanData, { id: loanData.length + 1, ...newLoan }]);
      setShowModal(false);
    };
  

  return (
    <div className="container-fluid p-3 mt-4">
      <h3 className="mb-3 text-center">Loan List</h3>

      {/* Filter Section */}
      <div className="row mb-3">
        <div className="col-lg-12 col-md-12 mx-auto">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <DropdownButton title={`Loan Type: ${filters.loanType}`} onSelect={(e) => handleFilterChange("loanType", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Loan">Loan</Dropdown.Item>
              <Dropdown.Item eventKey="Advance">Advance</Dropdown.Item>
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

            <DropdownButton title={`Loan Status: ${filters.loanStatus}`} onSelect={(e) => handleFilterChange("loanStatus", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
              <Dropdown.Item eventKey="Closed">Closed</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Sort: ${filters.sort}`} onSelect={(e) => handleFilterChange("sort", e)}>
              <Dropdown.Item eventKey="None">None</Dropdown.Item>
              <Dropdown.Item eventKey="Balance (High to Low)">Balance (High to Low)</Dropdown.Item>
              <Dropdown.Item eventKey="Balance (Low to High)">Balance (Low to High)</Dropdown.Item>
            </DropdownButton>

            <Button variant="primary"  onClick={() => setShowModal(true)} >+ Add Loan</Button>
            <Button variant="warning">💰 Loan Pre-Payment</Button>
            <Button variant="success">📊 Generate EMI</Button>
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
              <th>Employee Name</th>
              <th>Designation / Group</th>
              <th>Type</th>
              <th>Loans</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((loan, index) => (
                <tr key={loan.id}>
                  <td>{index + 1}</td>
                  <td className="text-center">👤</td>
                  <td>
                    {loan.empId} {loan.name} <br />
                    <span className="badge bg-primary">{loan.role}</span>
                  </td>
                  <td>{loan.role} / {loan.group}</td>
                  <td>
                    <span className={`badge ${loan.type === "Loan" ? "bg-danger" : "bg-info"}`}>{loan.type}</span>
                  </td>
                  <td>{loan.loans}</td>
                  <td>{loan.date}</td>
                  <td>₹{loan.total.toLocaleString()}</td>
                  <td>₹{loan.paid.toLocaleString()}</td>
                  <td>₹{loan.balance.toLocaleString()}</td>
                  <td>
                    <Button variant={loan.status === "Active" ? "warning" : "secondary"} size="sm">
                      {loan.status}
                    </Button>
                  </td>
                  <td>
                    <Button variant="success" size="sm">✏️ Edit</Button>{" "}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control type="text" name="empId" value={newLoan.empId} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={newLoan.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" name="role" value={newLoan.role} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Group</Form.Label>
              <Form.Control type="text" name="group" value={newLoan.group} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Loan Type</Form.Label>
              <Form.Select name="type" value={newLoan.type} onChange={handleInputChange}>
                <option>Loan</option>
                <option>Advance</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" name="total" value={newLoan.total} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Paid</Form.Label>
              <Form.Control type="number" name="paid" value={newLoan.paid} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Balance</Form.Label>
              <Form.Control type="number" name="balance" value={newLoan.balance} onChange={handleInputChange} disabled />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={newLoan.status} onChange={handleInputChange}>
                <option>Active</option>
                <option>Closed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddLoan}>Add Loan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoanList;
