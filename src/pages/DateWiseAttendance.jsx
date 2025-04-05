import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";


const DateWiseAttendance = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        group: "All",
    })

    const dateWiseAttendance = [
        { id: 1, employee: "Jhon", group: "IT Team", inTime: "10.00 AM", outTime: "10.00 PM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", totalHours: "12.00" },
        { id: 2, employee: "David", group: "Billing Team", inTime: "10.00 AM", outTime: "10.00 PM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", totalHours: "12.00" },
        { id: 3, employee: "Mathuew", group: "Marketing Team", inTime: "10.00 AM", outTime: "10.00 PM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", totalHours: "12.00" },
        { id: 4, employee: "Charles", group: "HR Team", inTime: "10.00 AM", outTime: "10.00 PM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", totalHours: "12.00" },
        { id: 5, employee: "Victor", group: "IT Team", inTime: "10.00 AM", outTime: "10.00 PM", delayAllowedUpto: "0 Mins", breakTime: "0 Mins", totalHours: "12.00" },

    ];

    // Function to handle filter changes
    const handleFilterChange = (type, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    };

    // Filtered Data based on selected filters
    const filterDateWiseAttendance = dateWiseAttendance.filter((item) => (
        (filters.group === "All" || item.group === filters.group) &&
        item.employee.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    return (
        <div className="container-fluid p-3 mt-4">
            <h3 className="mb-3 text-center">DateWise Attendance</h3>

            {/* Filters Section */}
            <div className="row mb-3">
                <div className="col-lg-10 col-md-12 mx-auto">
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <DropdownButton title={`Group : ${filters.group}`} onSelect={(e) => handleFilterChange("group", e)}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="IT Team">IT Team</Dropdown.Item>
                            <Dropdown.Item eventKey="Billing Team">Billing Team</Dropdown.Item>
                            <Dropdown.Item eventKey="Marketing Team">Marketing Team</Dropdown.Item>
                            <Dropdown.Item eventKey="HR Team">HR Team</Dropdown.Item>
                        </DropdownButton>

                        <Button variant="danger" onClick={() => setFilters({ group: "All" })}>
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
                            <th>Employee Name</th>
                            <th>Group</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                            <th>Delay Allowed Upto</th>
                            <th>Break Time</th>
                            <th>Total Hours</th>
                            <th>Attendance Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterDateWiseAttendance.length > 0 ? (
                            filterDateWiseAttendance.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.employee}</td>
                                    <td>{item.group}</td>
                                    <td>{item.inTime}</td>
                                    <td>{item.outTime}</td>
                                    <td>{item.delayAllowedUpto}</td>
                                    <td>{item.breakTime}</td>
                                    <td>{item.totalHours}</td>
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

export default DateWiseAttendance