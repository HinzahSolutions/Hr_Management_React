// import React, { useState } from "react";
// import { Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";

// const Incentive = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     month: "January",
//     year: "2025",
//     designation: "All",
//     group: "All",
//     sort: "None",
//   });

//   const incentiveData = [
//     { id: 1, empId: "2001", name: "John Doe", role: "CEO", group: "IT Team", month: "Jan", year: "2025", incentive: 0 },
//     { id: 2, empId: "2002", name: "Mark Williams", role: "Developer", group: "IT Team", month: "Jan", year: "2025", incentive: 0 },
//     { id: 3, empId: "2003", name: "Stephen McDonald", role: "Developer", group: "IT Team", month: "Jan", year: "2025", incentive: 0 },
//     { id: 4, empId: "2004", name: "Kumar Swaminathan", role: "Designer", group: "IT Team", month: "Jan", year: "2025", incentive: 0 },
//   ];

//   const handleFilterChange = (type, value) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
//   };

//   return (
//     <div className="container-fluid p-3 mt-4">
//       <h3 className="mb-3 text-center">Incentive</h3>

//       {/* Filter Section */}
//       <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
//         <DropdownButton title={filters.month} onSelect={(e) => handleFilterChange("month", e)}>
//           {[
//             "January", "February", "March", "April", "May", "June",
//             "July", "August", "September", "October", "November", "December",
//           ].map((month) => (
//             <Dropdown.Item key={month} eventKey={month}>{month}</Dropdown.Item>
//           ))}
//         </DropdownButton>
        
//         <DropdownButton title={filters.year} onSelect={(e) => handleFilterChange("year", e)}>
//           {["2023", "2024", "2025", "2026"].map((year) => (
//             <Dropdown.Item key={year} eventKey={year}>{year}</Dropdown.Item>
//           ))}
//         </DropdownButton>
        
//         <DropdownButton title={`Designation: ${filters.designation}`} onSelect={(e) => handleFilterChange("designation", e)}>
//           <Dropdown.Item eventKey="All">All</Dropdown.Item>
//           <Dropdown.Item eventKey="CEO">CEO</Dropdown.Item>
//           <Dropdown.Item eventKey="Developer">Developer</Dropdown.Item>
//           <Dropdown.Item eventKey="Designer">Designer</Dropdown.Item>
//         </DropdownButton>

//         <DropdownButton title={`Group: ${filters.group}`} onSelect={(e) => handleFilterChange("group", e)}>
//           <Dropdown.Item eventKey="All">All</Dropdown.Item>
//           <Dropdown.Item eventKey="IT Team">IT Team</Dropdown.Item>
//         </DropdownButton>
        
//         <Button variant="success">Filter</Button>
//         <Button variant="danger">Reset</Button>
//       </div>

//       {/* Search Bar */}
//       <div className="row mb-3">
//         <div className="col-md-6 col-sm-10 mx-auto">
//           <Form.Control type="text" placeholder="Search Employee" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="table-responsive">
//         <Table striped bordered hover>
//           <thead className="table-dark text-center">
//             <tr>
//               <th>#</th>
//               <th>Photo</th>
//               <th>Emp ID</th>
//               <th>Employee Name</th>
//               <th>Designation</th>
//               <th>Group</th>
//               <th>Month</th>
//               <th>Year</th>
//               <th>Incentive</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {incentiveData.map((employee, index) => (
//               <tr key={employee.id}>
//                 <td>{index + 1}</td>
//                 <td className="text-center">👤</td>
//                 <td>{employee.empId}</td>
//                 <td>{employee.name}</td>
//                 <td>{employee.role}</td>
//                 <td>{employee.group}</td>
//                 <td>{employee.month}</td>
//                 <td>{employee.year}</td>
//                 <td>
//                   <Form.Control type="number" min="0" value={employee.incentive} />
//                 </td>
//                 <td>
//                   <Button variant="primary" size="sm">💾 Save</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Bulk Incentive Button */}
//       <Button variant="primary" className="mt-3">+ Bulk Incentive</Button>
//     </div>
//   );
// };

// export default Incentive;
import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";

const Incentive = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    month: "January",
    year: "2025",
    designation: "All",
    group: "All",
    sort: "None",
  });

  const incentiveData = [
    { id: 1, empId: "2001", name: "John Doe", role: "CEO", group: "IT Team", month: "Jan", year: "2025", incentive: 0 },
    { id: 2, empId: "2002", name: "Mark Williams", role: "Developer", group: "IT Team", month: "Jan", year: "2025", incentive: 0 },
    { id: 3, empId: "2003", name: "Stephen McDonald", role: "Developer", group: "IT Team", month: "Jan", year: "2025", incentive: 0 },
    { id: 4, empId: "2004", name: "Kumar Swaminathan", role: "Designer", group: "IT Team", month: "Jan", year: "2025", incentive: 0 },
  ];

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  const filteredData = incentiveData.filter((item) => {
    return (
      (filters.month === "All" || item.month === filters.month.substring(0, 3)) &&
      (filters.year === "All" || item.year === filters.year) &&
      (filters.designation === "All" || item.role === filters.designation) &&
      (filters.group === "All" || item.group === filters.group) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container-fluid p-3 mt-4">
      <h3 className="mb-3 text-center">Incentive</h3>

      {/* Filter Section */}
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
        <DropdownButton title={filters.month} onSelect={(e) => handleFilterChange("month", e)}>
          {["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
          ].map((month) => (
            <Dropdown.Item key={month} eventKey={month}>{month}</Dropdown.Item>
          ))}
        </DropdownButton>
        
        <DropdownButton title={filters.year} onSelect={(e) => handleFilterChange("year", e)}>
          {["2023", "2024", "2025", "2026"].map((year) => (
            <Dropdown.Item key={year} eventKey={year}>{year}</Dropdown.Item>
          ))}
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
        
        <Button variant="success">Filter</Button>
        <Button variant="danger" onClick={() => setFilters({ month: "January", year: "2025", designation: "All", group: "All", sort: "None" })}>Reset</Button>
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
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Group</th>
              <th>Month</th>
              <th>Year</th>
              <th>Incentive</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td className="text-center">👤</td>
                <td>{employee.empId}</td>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.group}</td>
                <td>{employee.month}</td>
                <td>{employee.year}</td>
                <td>
                  <Form.Control type="number" min="0" value={employee.incentive} />
                </td>
                <td>
                  <Button variant="primary" size="sm">💾 Save</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Bulk Incentive Button */}
      <Button variant="primary" className="mt-3">+ Bulk Incentive</Button>
    </div>
  );
};

export default Incentive;
