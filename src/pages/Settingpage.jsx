import React, { useState } from 'react';
// import { Form, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton, Button, Form, Table, InputGroup } from 'react-bootstrap';

const dummyData = [
    { id: 1, name: 'Dashboard', active: true },
    { id: 2, name: 'Employee', active: false },
    { id: 3, name: ' Designation', active: true },
    { id: 4, name: 'Group', active: true },
    { id: 5, name: 'Shift', active: false },
    { id: 6, name: 'Holidays', active: true },
    { id: 7, name: 'Datewise Attendance', active: true },
    { id: 8, name: ' Monthly Attendance', active: false },
    { id: 9, name: ' Datewise Overduty', active: true },
    { id: 10, name: ' Leaves', active: true },
    { id: 11, name: 'Salary', active: false },
    { id: 12, name: 'Overduty', active: true },
    { id: 13, name: 'Incentive', active: true },
    { id: 14, name: 'Bonus', active: false },
    { id: 15, name: 'Salary Holding', active: true },
    { id: 16, name: 'Food Allowance', active: true },
    { id: 17, name: 'Reports', active: false },
    { id: 18, name: 'Attendance Report', active: true },
    { id: 19, name: ' PF / ESI Report', active: true },
    { id: 20, name: 'Allowance Report', active: false },
    { id: 21, name: 'Loan Report', active: true },
    { id: 22, name: 'Salary Report', active: true },
    { id: 23, name: 'Users', active: false },
    { id: 24, name: 'Admin Setting', active: true },
];

const Settingpage = () => {
    const [search, setSearch] = useState('');
    const [employees, setEmployees] = useState(dummyData);

    const handleToggle = (id) => {
        const updated = employees.map((emp) =>
            emp.id === id ? { ...emp, active: !emp.active } : emp
        );
        setEmployees(updated);
    };

    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">


            <div className="row mb-3">
                <div className="col-lg-12 col-md-12 mx-auto">
                    <div className="d-flex flex-wrap gap-2 justify-content-center">


                        <DropdownButton title=" Select Department ">
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="CEO">CEO</Dropdown.Item>
                            <Dropdown.Item eventKey="Developer">Developer</Dropdown.Item>
                            <Dropdown.Item eventKey="Designer">Designer</Dropdown.Item>
                            <Dropdown.Item eventKey="Telecalling">Telecalling</Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton title="Select Role">
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="IT Team">IT Team</Dropdown.Item>
                            <Dropdown.Item eventKey="HR">HR</Dropdown.Item>
                            <Dropdown.Item eventKey="Design">Design</Dropdown.Item>
                        </DropdownButton>



                       
                                      <Button variant="info text-white" >Search</Button>
                                      <Button variant="dark">Update</Button>
                                      <Button variant="success" >Filter</Button>
                                      <Button variant="danger">Cancel</Button>
                    </div>
                </div>
            </div>
            {/* <h3>Admin Settings</h3>
      <Form.Control
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"


        const dummyData = [
  { id: 1, name: 'Alice Johnson', active: true },
  { id: 2, name: 'Brian Smith', active: false },
  { id: 3, name: 'Catherine Lee', active: true },
  { id: 4, name: 'David Brown', active: true },
  { id: 5, name: 'Ella Williams', active: false },
  { id: 6, name: 'Frank Miller', active: true },
  { id: 7, name: 'Grace Thompson', active: true },
  { id: 8, name: 'Henry Davis', active: false },
  { id: 9, name: 'Isla Moore', active: true },
  { id: 10, name: 'Jack Wilson', active: true },
];


      /> */}


            <div>
                <h3>Select Name</h3>
                <Form.Select
  className="mb-3 w-90"
  
  value={search}
>  
  <option value=""> --Select Name --</option>
  <option value=""> Alice Johnson ,   <span > Department :  IT team</span></option>
  <option value="">Brian Smith,   <span > Department :  IT team</span></option>
  <option value="">Catherine Lee,  <span > Department :  HR</span></option>
  <option value="">David Brown,   <span > Department : HR</span></option>
  <option value="">Ella Williams,   <span > Department :  HR</span></option>
  <option value="">Frank Miller,   <span> Department :  Design</span></option>
  <option value="">Grace Thompson,   <span > Department :  Design</span></option>

</Form.Select>
            </div>


            <h3>Overalll Status</h3>

            <div className='d-flex row  justify-content-around  p-2 w-100'>
  <Form.Control
    placeholder={`Total Status : ${employees.length}`}
    className="w-auto p-3"
    style={{
      backgroundColor: '#6c757d',
      color: 'white',
      fontWeight: 'bold'
    }}
    disabled
  />

  <Form.Control
    placeholder={`Active : ${employees.filter(emp => emp.active).length}`}
    className="w-auto p-3"
    style={{
      backgroundColor: '#198754',
      color: 'white',
      fontWeight: 'bold'
    }}
    disabled
  />

  <Form.Control
    placeholder={`Diactive : ${employees.filter(emp => !emp.active).length}`}
    className="w-auto p-3"
    style={{
      backgroundColor: '#dc3545',
      color: 'white',
      fontWeight: 'bold'
    }}
    disabled
  />
</div>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>On/Off</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    id={`switch-${emp.id}`}
                                    checked={emp.active}
                                    onChange={() => handleToggle(emp.id)}
                                    label={emp.active ? 'On' : 'Off'}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Settingpage;
