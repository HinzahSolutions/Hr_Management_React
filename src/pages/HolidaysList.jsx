import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";

const HolidaysList = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        month: "All",
        year: "All",
    });


    const holidayData = [
        { id: 1, holidayDate: "09-Nov-2024", holiday: "Republic Day" },
        { id: 2, holidayDate: "19-May-2025", holiday: "Ramjan" },
        { id: 3, holidayDate: "02-Nov-2024", holiday: "Pongal" },
        { id: 4, holidayDate: "06-Dec-2021", holiday: "Diwali" },
        { id: 5, holidayDate: "07-Apr-2025", holiday: "Karthigal" },
        { id: 6, holidayDate: "22-May-2022", holiday: "Thala Jayanthi" },
        { id: 7, holidayDate: "15-Apr-2020", holiday: "Independence Day" },
        { id: 8, holidayDate: "05-Apr-2023", holiday: "Onam" },
    ];


    // Function to handle filter changes
    const handleFilterChange = (type, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    };

    // Function to extract the month from the Holiday date
    const getMonthFromHolidayDate = (dateString) => {
        return dateString.split("-")[1]; // Example: "04-Jan-2025" → "Jan"
    };


    // Filtered Data based on selected filters
    const filteredData = holidayData.filter((item) => {
        const itemMonth = getMonthFromHolidayDate(item.holidayDate);
        const itemYear = item.holidayDate.split("-")[2];  // Extracts Year (e.g., "2025")

        return (
            (filters.month === "All" || itemMonth === filters.month) &&
            (filters.year === "All" || itemYear === filters.year) &&
            item.holiday.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


    return (
        <div className="container-fluid p-3 mt-4">
            <h3 className="mb-3 text-center">Holidays List</h3>


            <div className="row mb-3">
                <div className="col-lg-10 col-md-12 mx-auto">
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <DropdownButton title={`Month : ${filters.month}`} onSelect={(e) => handleFilterChange("month", e)}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="Apr">April</Dropdown.Item>
                            <Dropdown.Item eventKey="May">May</Dropdown.Item>
                            <Dropdown.Item eventKey="Nov">Novamber</Dropdown.Item>
                            <Dropdown.Item eventKey="Dec">Decembar</Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton title={`Year : ${filters.year}`} onSelect={(e) => handleFilterChange("year", e)}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
                            <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
                            <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
                            <Dropdown.Item eventKey="2024">2024</Dropdown.Item>
                            <Dropdown.Item eventKey="2025">2025</Dropdown.Item>
                        </DropdownButton>

                        <Button variant="danger" onClick={() => setFilters({ month: "All", year: "All" })}>Reset</Button>
                        <Button variant="success">+ Add Holiday</Button>
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
                            <th>Holiday Date</th>
                            <th>Holiday</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((day, index) => (
                                <tr key={day.id}>
                                    <td>{index + 1}</td>
                                    {/* <td className="text-center">👤</td> */}
                                    <td>{day.holidayDate}</td>
                                    <td>{day.holiday}</td>
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

export default HolidaysList





// {/* Flex container: Row direction, centered horizontally & vertically */ }
// <div className="row mb-3 ">
//     <div className="col-md-6 col-sm-10 mx-auto p-3 rounded ">
//         <div className="d-flex flex-row justify-content-center align-items-center gap-2">
//             <Form.Control
//                 type="text"
//                 placeholder="Search Holiday"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="flex-grow-1"
//             />
//             <Button className="w-50" variant="success">+ Add Holiday</Button>
//         </div>
//     </div>
// </div> 