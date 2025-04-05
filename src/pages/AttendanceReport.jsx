// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown, DropdownButton, Button, Form,Table } from 'react-bootstrap';

// const AttendanceReport = () => {
//   const [dateRange, setDateRange] = useState([new Date('2025-01-01'), new Date('2025-01-31')]);
//   const [startDate, endDate] = dateRange;

//   const [filters, setFilters] = useState({
//     designation: 'All',
//     group: 'All',
//     sort: 'None'
//   });

//   const [searchTerm, setSearchTerm] = useState('');

//   const handleFilterChange = (key, value) => {
//     setFilters({ ...filters, [key]: value });
//   };

//   const handleCancel = () => {
//     setDateRange([new Date(''), new Date('')]);
//     setFilters({
//       designation: 'All',
//       group: 'All',
//       sort: 'None'
//     });
//     setSearchTerm('');
//   };

//   const handleFilter = () => {
//     console.log('Apply Filter:', { startDate, endDate, ...filters, searchTerm });
//     // Implement actual filtering logic here
//   };

//   const data = [
//     {
//       id: 1, empId: '2001', name: 'John Doe', designation: 'CEO / IT Team',
//       offHours: '9 hrs', halfDay: 0, permission: 0, workingDays: 11,
//       present: 11, absent: 0, holidays: 0, odHours: '3 hrs'
//     },
//     {
//       id: 2, empId: '2002', name: 'Mark Williams', designation: 'Developer / IT Team',
//       offHours: '0 hrs', halfDay: 0, permission: 0, workingDays: 11,
//       present: 11, absent: 0, holidays: 0, odHours: '0 hrs'
//     },
//   ];

//   return (
//     <div className="container-fluid p-3 mt-4">
//       <h4 className="mb-4">Attendance Report</h4>

//       <div className="row mb-3">
//         <div className="col-lg-12 col-md-12 mx-auto">
//           <div className="d-flex flex-wrap gap-2 justify-content-center">

//             <DatePicker
//               selectsRange
//               startDate={startDate}
//               endDate={endDate}
//               onChange={(update) => setDateRange(update)}
//               isClearable
//               placeholderText="Select Date Range"
//               className="form-control"
//             />

//             <DropdownButton title={`Designation: ${filters.designation}`} onSelect={(e) => handleFilterChange('designation', e)}>
//               <Dropdown.Item eventKey="All">All</Dropdown.Item>
//               <Dropdown.Item eventKey="CEO">CEO</Dropdown.Item>
//               <Dropdown.Item eventKey="Developer">Developer</Dropdown.Item>
//               <Dropdown.Item eventKey="Designer">Designer</Dropdown.Item>
//             </DropdownButton>

//             <DropdownButton title={`Group: ${filters.group}`} onSelect={(e) => handleFilterChange('group', e)}>
//               <Dropdown.Item eventKey="All">All</Dropdown.Item>
//               <Dropdown.Item eventKey="IT Team">IT Team</Dropdown.Item>
//               <Dropdown.Item eventKey="HR">HR</Dropdown.Item>
//             </DropdownButton>

//             <DropdownButton title={`Sort: ${filters.sort}`} onSelect={(e) => handleFilterChange('sort', e)}>
//               <Dropdown.Item eventKey="None">None</Dropdown.Item>
//               <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
//               <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
//             </DropdownButton>

//             <Button variant="success" onClick={handleFilter}>Filter</Button>
//             <Button variant="danger" onClick={handleCancel}>Cancel</Button>
//             <Button variant="primary" onClick={() => window.print()}>🖨️ Print</Button>
//           </div>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="row mb-3">
//         <div className="col-md-6 col-sm-10 mx-auto">
//           <Form.Control
//             type="text"
//             placeholder="Search Employee"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Attendance Table */}
//       <div className="table-responsive">
//         <Table striped bordered hover>
//           <thead className="table-dark text-center">
//           <tr>
//             <th>S.NO</th>
//             <th>Emp ID</th>
//             <th>Employee Name</th>
//             <th>Designation / Group</th>
//             <th>Off Hours</th>
//             <th>Half Day</th>
//             <th>Permission</th>
//             <th>Working Days</th>
//             <th>Present</th>
//             <th>Absent</th>
//             <th>Holidays</th>
//             <th>OD Hours</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data
//             .filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
//             .map((emp, index) => (
//               <tr key={emp.id}>
//                 <td>{index + 1}</td>
//                 <td>{emp.empId}</td>
//                 <td>{emp.name}</td>
//                 <td>{emp.designation}</td>
//                 <td>{emp.offHours}</td>
//                 <td>{emp.halfDay}</td>
//                 <td>{emp.permission}</td>
//                 <td>{emp.workingDays}</td>
//                 <td>{emp.present}</td>
//                 <td>{emp.absent}</td>
//                 <td>{emp.holidays}</td>
//                 <td>{emp.odHours}</td>
//               </tr>
//           ))}
//         </tbody>
//       </Table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceReport;


import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton, Button, Form, Table } from 'react-bootstrap';

const AttendanceReport = () => {
  const [dateRange, setDateRange] = useState([new Date('2025-01-01'), new Date('2025-01-31')]);
  const [startDate, endDate] = dateRange;

  const [filters, setFilters] = useState({
    designation: 'All',
    group: 'All',
    sort: 'None'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const allData = [
    {
      id: 1, empId: '2001', name: 'John Doe', designation: 'CEO', group: 'IT Team',
      offHours: '9 hrs', halfDay: 0, permission: 0, workingDays: 11,
      present: 11, absent: 0, holidays: 0, odHours: '3 hrs', joinDate: new Date('2025-01-01')
    },
    {
      id: 2, empId: '2002', name: 'Mark Williams', designation: 'Developer', group: 'IT Team',
      offHours: '0 hrs', halfDay: 0, permission: 0, workingDays: 11,
      present: 11, absent: 0, holidays: 0, odHours: '0 hrs', joinDate: new Date('2025-01-10')
    },
    {
      id: 3, empId: '2003', name: 'Stephen McDonald', designation: 'Developer', group: 'IT Team',
      offHours: '2 hrs', halfDay: 1, permission: 1, workingDays: 11,
      present: 10, absent: 1, holidays: 0, odHours: '1 hrs', joinDate: new Date('2025-01-08')
    },
    {
      id: 4, empId: '2004', name: 'Kumar Swaminathan', designation: 'Designer', group: 'Design',
      offHours: '1 hrs', halfDay: 0, permission: 0, workingDays: 11,
      present: 9, absent: 2, holidays: 0, odHours: '0 hrs', joinDate: new Date('2025-01-05')
    },
    {
      id: 5, empId: '2005', name: 'Murali Sambantham', designation: 'Telecalling', group: 'HR',
      offHours: '0 hrs', halfDay: 0, permission: 0, workingDays: 11,
      present: 8, absent: 3, holidays: 0, odHours: '0 hrs', joinDate: new Date('2025-01-02')
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleCancel = () => {
    setDateRange([new Date(''), new Date('')]);
    setFilters({
      designation: 'All',
      group: 'All',
      sort: 'None'
    });
    setSearchTerm('');
    setFilteredData([]);
  };

  const handleFilter = () => {
    let result = allData;

    if (startDate && endDate) {
      result = result.filter(emp =>
        emp.joinDate >= startDate && emp.joinDate <= endDate
      );
    }

    if (filters.designation !== 'All') {
      result = result.filter(emp => emp.designation === filters.designation);
    }

    if (filters.group !== 'All') {
      result = result.filter(emp => emp.group === filters.group);
    }

    if (searchTerm) {
      result = result.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.sort === 'A-Z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === 'Z-A') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(result);
  };

  const displayData = filteredData.length > 0 ? filteredData : allData;

  return (
    <div className="container-fluid p-3 mt-4">
      <h4 className="mb-4">Attendance Report</h4>

      <div className="row mb-3">
        <div className="col-lg-12 col-md-12 mx-auto">
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
              <Dropdown.Item eventKey="Design">Design</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Sort: ${filters.sort}`} onSelect={(e) => handleFilterChange('sort', e)}>
              <Dropdown.Item eventKey="None">None</Dropdown.Item>
              <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
              <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
            </DropdownButton>

            <Button variant="success" onClick={handleFilter}>Filter</Button>
            <Button variant="danger" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" onClick={() => window.print()}>🖨️ Print</Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
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

      {/* Attendance Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark text-center">
            <tr>
              <th>S.NO</th>
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>Designation / Group</th>
              <th>Off Hours</th>
              <th>Half Day</th>
              <th>Permission</th>
              <th>Working Days</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Holidays</th>
              <th>OD Hours</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.designation} / {emp.group}</td>
                <td>{emp.offHours}</td>
                <td>{emp.halfDay}</td>
                <td>{emp.permission}</td>
                <td>{emp.workingDays}</td>
                <td>{emp.present}</td>
                <td>{emp.absent}</td>
                <td>{emp.holidays}</td>
                <td>{emp.odHours}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceReport;
