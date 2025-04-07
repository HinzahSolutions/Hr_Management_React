

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton, Button, Form, Table } from 'react-bootstrap';

const AllowanceReport = () => {
  const [dateRange, setDateRange] = useState([new Date('2025-01-01'), new Date('2025-01-31')]);
  const [startDate, endDate] = dateRange;
  const [filters, setFilters] = useState({ designation: 'All', group: 'All', sort: 'None' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (key, value) => setFilters({ ...filters, [key]: value });

  const handleCancel = () => {
    setDateRange([null, null]);
    setFilters({ designation: 'All', group: 'All', sort: 'None' });
    setSearchTerm('');
  };

  const data = [
    { id: 1, empId: '2001', name: 'John Doe', designation: 'CEO', group: 'IT Team', food: 0, rental: 0, petrol: 0 },
    { id: 2, empId: '2002', name: 'Mark Williams', designation: 'Developer', group: 'IT Team', food: 0, rental: 0, petrol: 0 },
    { id: 3, empId: '2003', name: 'Stephen McDonald', designation: 'Developer', group: 'IT Team', food: 0, rental: 0, petrol: 0 },
    { id: 4, empId: '2004', name: 'Kumar Swaminathan', designation: 'Designer', group: 'IT Team', food: 0, rental: 0, petrol: 0 },
    { id: 5, empId: '2005', name: 'Murali Sambantham', designation: 'Telecalling', group: 'IT Team', food: 0, rental: 0, petrol: 0 },
  ];

  const filteredData = data
    .filter(emp => {
      const matchesDesignation = filters.designation === 'All' || emp.designation === filters.designation;
      const matchesGroup = filters.group === 'All' || emp.group === filters.group;
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDesignation && matchesGroup && matchesSearch;
    })
    .sort((a, b) => {
      if (filters.sort === 'A-Z') return a.name.localeCompare(b.name);
      if (filters.sort === 'Z-A') return b.name.localeCompare(a.name);
      return 0;
    });

  const totalFood = filteredData.reduce((sum, emp) => sum + emp.food, 0);
  const totalRental = filteredData.reduce((sum, emp) => sum + emp.rental, 0);
  const totalPetrol = filteredData.reduce((sum, emp) => sum + emp.petrol, 0);

  return (
    <div className="container-fluid p-3 mt-4">
      <h4 className="mb-4">Allowance Report</h4>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-lg-12 mx-auto">
          <div className="d-flex flex-wrap gap-2 justify-content-center">

            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date Range"
              className="form-control"
            />

            <DropdownButton title={`Designation: ${filters.designation}`} onSelect={(e) => handleFilterChange('designation', e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="CEO">CEO</Dropdown.Item>
              <Dropdown.Item eventKey="Developer">Developer</Dropdown.Item>
              <Dropdown.Item eventKey="Designer">Designer</Dropdown.Item>
              <Dropdown.Item eventKey="Telecalling">Telecalling</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Group: ${filters.group}`} onSelect={(e) => handleFilterChange('group', e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="IT Team">IT Team</Dropdown.Item>
              <Dropdown.Item eventKey="HR">HR</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Sort: ${filters.sort}`} onSelect={(e) => handleFilterChange('sort', e)}>
              <Dropdown.Item eventKey="None">None</Dropdown.Item>
              <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
              <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
            </DropdownButton>

            <Button variant="success">Filter</Button>
            <Button variant="danger" onClick={handleCancel}>Cancel</Button>
            <Button variant="outline-primary" onClick={() => window.print()}>🖨️ Print</Button>
          </div>
        </div>
      </div>

      {/* Search */}
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

      {/* Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark text-center">
            <tr>
              <th>S NO</th>
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Group</th>
              <th>Food</th>
              <th>Rental</th>
              <th>Petrol</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredData.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>{emp.group}</td>
                <td>₹{emp.food}</td>
                <td>₹{emp.rental}</td>
                <td>₹{emp.petrol}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td colSpan="5" className="text-end">Total Amount</td>
              <td>₹ {totalFood}</td>
              <td>₹ {totalRental}</td>
              <td>₹ {totalPetrol}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllowanceReport;
