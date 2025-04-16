import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const WeeklyAttendance = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState([new Date('2025-01-01'), new Date('2025-01-31')]);
    const [startDate, endDate] = dateRange;
    const [filters, setFilters] = useState({
        group: "All",
        attendance: "All",
        sort: "None",
        status: "All",
    });


    const weeklyAttendance = [
        { id: 1, employee: "Jhon", group: "IT Team", attendance: "Present", },
        { id: 2, employee: "David", group: "Billing Team", attendance: "Absent", },
        { id: 3, employee: "Mathuew", group: "Marketing Team", attendance: "Present", },
        { id: 4, employee: "Charles", group: "HR Team", attendance: "Absent", },
        { id: 5, employee: "Victor", group: "IT Team", attendance: "Present", },

    ];


    // Function to handle filter changes
    const handleFilterChange = (type, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    };


    // Filtered Data based on selected filters
    const filterWeeklyAttendance = weeklyAttendance.filter((item) => {
        const status = item.balance === "0" ? "Non - Active" : "Active";

        return (
            (filters.group === "All" || item.group === filters.group) &&
            (filters.attendance === "All" || item.attendance === filters.attendance) &&
            (filters.status === "All" || filters.status === status) &&
            item.employee.toLowerCase().includes(searchTerm.toLowerCase())
        )
    });


    // Sorting logic
    if (filters.sort === "A-Z") {
        filterWeeklyAttendance.sort((a, b) => a.employee.localeCompare(b.employee));
    } else if (filters.sort === "Z-A") {
        filterWeeklyAttendance.sort((a, b) => b.employee.localeCompare(a.employee));
    }

    return (
        <div className="container-fluid p-3 mt-4">
            <h3 className="mb-3 text-center">Weekly Attendance</h3>

            <div className="row mb-3">
                <div className="col-lg-10 col-md-12 mx-auto">
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

                        <DropdownButton title={`Group : ${filters.group}`} onSelect={(e) => handleFilterChange("group", e)}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="IT Team">IT Team</Dropdown.Item>
                            <Dropdown.Item eventKey="Billing Team">Billing Team</Dropdown.Item>
                            <Dropdown.Item eventKey="Marketing Team">Marketing Team</Dropdown.Item>
                            <Dropdown.Item eventKey="HR Team">HR Team</Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton title={`Attendance : ${filters.attendance}`} onSelect={(e) => handleFilterChange("attendance", e)}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="Present">Present</Dropdown.Item>
                            <Dropdown.Item eventKey="Absent">Absent</Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton title={`Sort : ${filters.sort}`} onSelect={(e) => handleFilterChange("sort", e)}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
                            <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton title={`Status : ${filters.status}`} onSelect={(e) => handleFilterChange("status", e)}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
                            <Dropdown.Item eventKey="Non - Active">Non - Active</Dropdown.Item>
                        </DropdownButton>

                        <Button variant="danger" onClick={() => setFilters({ group: "All", attendance: "All", sort: "All", status: "All" })}>
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
                            <th>MONDAY</th>
                            <th>TUESDAY</th>
                            <th>WEDNESDAY</th>
                            <th>THURSDAY</th>
                            <th>FRIDAY</th>
                            <th>SATAURDAY</th>
                            <th>SUNDAY</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterWeeklyAttendance.length > 0 ? (
                            filterWeeklyAttendance.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.employee}<br />{item.group}</td>
                                    <td>{item.attendance}</td>
                                    <td>{item.attendance}</td>
                                    <td>{item.attendance}</td>
                                    <td>{item.attendance}</td>
                                    <td>{item.attendance}</td>
                                    <td>{item.attendance}</td>
                                    <td>{item.attendance}</td>
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

export default WeeklyAttendance