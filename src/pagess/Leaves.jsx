// import React, { useState } from "react";
// import { Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";

// const Leaves = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Sample Leave Data
//   const leaveData = [
//     {
//       id: 1,
//       photo: "👤",
//       empId: 2003,
//       name: "Stephen McDonald",
//       designation: "Developer",
//       group: "IT Team",
//       leaveDate: "04-Jan-2025",
//       status: "Approved",
//     },
//     {
//       id: 2,
//       photo: "👤",
//       empId: 2005,
//       name: "Murali Sambatham",
//       designation: "Telecalling",
//       group: "IT Team",
//       leaveDate: "05-Jan-2025",
//       status: "Approved",
//     },
//     {
//       id: 3,
//       photo: "👤",
//       empId: 2005,
//       name: "Murali Sambatham",
//       designation: "Telecalling",
//       group: "IT Team",
//       leaveDate: "07-Jan-2025",
//       status: "Approved",
//     },
//     {
//       id: 4,
//       photo: "👤",
//       empId: 2005,
//       name: "Murali Sambatham",
//       designation: "Telecalling",
//       group: "IT Team",
//       leaveDate: "08-Jan-2025",
//       status: "Approved",
//     },
//   ];

//   // Filtered Data
//   const filteredData = leaveData.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="w-100 p-3 mt-4">
//       <h3 className="mb-3">Leave List</h3>

//       {/* Filters */}
//       <div className="w-100 d-flex gap-5 mb-3 justify-content-center">
//         <DropdownButton title="Month">
//           <Dropdown.Item>January</Dropdown.Item>
//         </DropdownButton>

//         <DropdownButton title="Year">
//           <Dropdown.Item>2025</Dropdown.Item>
//         </DropdownButton>

//         <DropdownButton title="Designation">
//           <Dropdown.Item>Developer</Dropdown.Item>
//           <Dropdown.Item>Telecalling</Dropdown.Item>
//         </DropdownButton>

//         <DropdownButton title="Group">
//           <Dropdown.Item>IT Team</Dropdown.Item>
//         </DropdownButton>

//         <DropdownButton title="Leave Status">
//           <Dropdown.Item>Approved</Dropdown.Item>
//           <Dropdown.Item>Pending</Dropdown.Item>
//         </DropdownButton>

//         <Button variant="success">Filter</Button>
//         <Button variant="danger">Cancel</Button>
//       </div>

//       {/* Search Bar */}
//       <Form.Control
//         type="text"
//         placeholder="Search"
//         className="mb-3"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {/* Table */}
//       <Table striped bordered hover>
//         <thead className="table-dark">
//           <tr>
//             <th>#</th>
//             <th>Photo</th>
//             <th>Emp ID</th>
//             <th>Employee Name</th>
//             <th>Designation</th>
//             <th>Group</th>
//             <th>Leave Date</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((leave, index) => (
//             <tr key={leave.id}>
//               <td>{index + 1}</td>
//               <td>{leave.photo}</td>
//               <td>{leave.empId}</td>
//               <td>{leave.name}</td>
//               <td>{leave.designation}</td>
//               <td>{leave.group}</td>
//               <td>{leave.leaveDate}</td>
//               <td>
//                 <Button variant="success" size="sm">
//                   {leave.status}
//                 </Button>
//               </td>
//               <td>
//                 <Button variant="primary" size="sm">
//                   ✏️ Edit
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Leaves;


import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";

const Leaves = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    month: "All",
    year: "All",
    designation: "All",
    group: "All",
    status: "All",
  });

  // Sample Leave Data
  const leaveData = [
    {
      id: 1,
      photo: "👤",
      empId: 2003,
      name: "Stephen McDonald",
      designation: "Developer",
      group: "IT Team",
      leaveDate: "04-Jan-2025",
      status: "Approved",
    },
    {
      id: 2,
      photo: "👤",
      empId: 2005,
      name: "Murali Sambatham",
      designation: "Telecalling",
      group: "IT Team",
      leaveDate: "05-Jan-2025",
      status: "Pending",
    },
    {
      id: 3,
      photo: "👤",
      empId: 2005,
      name: "Murali Sambatham",
      designation: "Telecalling",
      group: "IT Team",
      leaveDate: "07-Feb-2025",
      status: "Approved",
    },
    {
      id: 4,
      photo: "👤",
      empId: 2005,
      name: "Murali Sambatham",
      designation: "Telecalling",
      group: "IT Team",
      leaveDate: "08-Mar-2025",
      status: "Rejected",
    },
  ];

  // Function to handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  // Function to extract the month from the leave date
  const getMonthFromLeaveDate = (dateString) => {
    return dateString.split("-")[1]; // Example: "04-Jan-2025" → "Jan"
  };

  // Filtered Data based on selected filters
  const filteredData = leaveData.filter((item) => {
    const itemMonth = getMonthFromLeaveDate(item.leaveDate);
    const itemYear = item.leaveDate.split("-")[2]; // Extracts Year (e.g., "2025")

    return (
      (filters.month === "All" || itemMonth === filters.month) &&
      (filters.year === "All" || itemYear === filters.year) &&
      (filters.designation === "All" || item.designation === filters.designation) &&
      (filters.group === "All" || item.group === filters.group) &&
      (filters.status === "All" || item.status === filters.status) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Search filter
    );
  });

  return (
    <div className="container-fluid p-3 mt-4">
      <h3 className="mb-3 text-center">Leave List</h3>

      {/* Filters Section */}
      <div className="row mb-3">
        <div className="col-lg-10 col-md-12 mx-auto">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <DropdownButton title={`Month: ${filters.month}`} onSelect={(e) => handleFilterChange("month", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Jan">January</Dropdown.Item>
              <Dropdown.Item eventKey="Feb">February</Dropdown.Item>
              <Dropdown.Item eventKey="Mar">March</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Year: ${filters.year}`} onSelect={(e) => handleFilterChange("year", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="2025">2025</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Designation: ${filters.designation}`} onSelect={(e) => handleFilterChange("designation", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Developer">Developer</Dropdown.Item>
              <Dropdown.Item eventKey="Telecalling">Telecalling</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Group: ${filters.group}`} onSelect={(e) => handleFilterChange("group", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="IT Team">IT Team</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title={`Status: ${filters.status}`} onSelect={(e) => handleFilterChange("status", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Approved">Approved</Dropdown.Item>
              <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
              <Dropdown.Item eventKey="Rejected">Rejected</Dropdown.Item>
            </DropdownButton>

            <Button variant="danger" onClick={() => setFilters({ month: "All", year: "All", designation: "All", group: "All", status: "All" })}>
              Reset
            </Button>
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
              <th>Photo</th>
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Group</th>
              <th>Leave Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((leave, index) => (
                <tr key={leave.id}>
                  <td>{index + 1}</td>
                  <td className="text-center">{leave.photo}</td>
                  <td>{leave.empId}</td>
                  <td>{leave.name}</td>
                  <td>{leave.designation}</td>
                  <td>{leave.group}</td>
                  <td>{leave.leaveDate}</td>
                  <td className="text-center">
                    <Button variant={leave.status === "Approved" ? "success" : leave.status === "Pending" ? "warning" : "danger"} size="sm">
                      {leave.status}
                    </Button>
                  </td>
                  <td className="text-center">
                    <Button variant="primary" size="sm">
                      ✏️ Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-danger">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Leaves;

