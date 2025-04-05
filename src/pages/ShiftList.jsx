import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";

const ShiftList = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    shift: "All",
  })

  const shiftListData = [
    { id: 1, shiftName: "Office Shift", inTime: "10.00 AM", outTime: "10.00 PM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", employee: 4, },
    { id: 2, shiftName: "Telecalling", inTime: "10.00 PM", outTime: "10.00 AM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", employee: 2, },
    { id: 3, shiftName: "Marketing", inTime: "10.00 AM", outTime: "10.00 PM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", employee: 3, },
    { id: 4, shiftName: "supervisor", inTime: "10.00 PM", outTime: "10.00 AM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", employee: 5, },
    { id: 5, shiftName: "Manager", inTime: "10.00 AM", outTime: "10.00 PM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", employee: 9, },
    { id: 6, shiftName: "Accountent", inTime: "10.00 PM", outTime: "10.00 AM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", employee: 1, },
  ];

  // Function to handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };


  // Apply both shift filter & search filter
  const filteredShifts = shiftListData.filter((shift) => {
    // Shift filter
    if (filters.shift === "Day Shift" && shift.inTime !== "10.00 AM") return false;
    if (filters.shift === "Night Shift" && shift.inTime !== "10.00 PM") return false;

    // Search filter (match shiftName or employee count)
    if (searchTerm) {
      return (
        shift.shiftName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shift.employee.toString().includes(searchTerm)
      );
    }

    return true;
  });

  return (
    <div className="container-fluid p-3 mt-4">
      <h3 className="mb-3 text-center">Shift List</h3>


      <div className="row mb-3">
        <div className="col-lg-10 col-md-12 mx-auto">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <DropdownButton title={`Shift : ${filters.shift}`} onSelect={(e) => handleFilterChange("shift", e)}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Day Shift">Day Shift</Dropdown.Item>
              <Dropdown.Item eventKey="Night Shift">Night Shift</Dropdown.Item>
            </DropdownButton>

            <Button variant="danger" onClick={() => setFilters({ shift: "All" })}>Reset</Button>
            <Button variant="success">+ Add Shift</Button>
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
              <th>Shift Name</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Delay Allowed Upto</th>
              <th>Break Time</th>
              <th>Employee</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredShifts.length > 0 ? (
              filteredShifts.map((day, index) => (
                <tr key={day.id}>
                  <td>{index + 1}</td>
                  {/* <td className="text-center">👤</td> */}
                  <td>{day.shiftName}</td>
                  <td>{day.inTime}</td>
                  <td>{day.outTime}</td>
                  <td>{day.delayAllowedUpto}</td>
                  <td>{day.breakTime}</td>
                  <td>{day.employee}</td>
                  <td className="text-center">
                    <Button variant="success" size="sm">Active</Button>
                  </td>
                  <td className="text-center">
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

export default ShiftList



// // Filtered shift list based on selected shift filter
// const filteredShifts = shiftListData.filter((shift) => {
//   if (filters.shift === "Day Shift") {
//     return shift.inTime === "10.00 AM";
//   } else if (filters.shift === "Night Shift") {
//     return shift.inTime === "10.00 PM";
//   }
//   return true; // Show all shifts if "All" is selected
// });




{/* Flex container: Row direction, centered horizontally & vertically */ }
{/* <div className="row mb-3 ">
        <div className="col-md-6 col-sm-10 mx-auto p-3 rounded ">
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <Form.Control
              type="text"
              placeholder="Search Shift"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow-1"
            />
            <Button className="w-50" variant="success">+ Add Shift</Button>
          </div>
        </div>
      </div> */}