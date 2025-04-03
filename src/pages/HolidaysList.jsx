import React, { useState } from "react";
import { Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";

const HolidaysList = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const holidayData = [
        { id: 1, holidayDate: "09-Nov-2024", holiday: "Republic Day" },
        { id: 2, holidayDate: "19-Mar-2024", holiday: "Ramjan" },
        { id: 3, holidayDate: "02-Jun-2024", holiday: "Pongal" },
        { id: 4, holidayDate: "06-Dec-2024", holiday: "Diwali" },
        { id: 5, holidayDate: "07-Feb-2024", holiday: "Karthigal" },
        { id: 6, holidayDate: "22-May-2024", holiday: "Thala Jayanthi" },
        { id: 7, holidayDate: "15-Aug-2024", holiday: "Independence Day" },
        { id: 8, holidayDate: "05-Apr-2024", holiday: "Onam" },
    ];

    return (
        <div className="container-fluid p-3 mt-4">
            <h3 className="mb-3 text-center">Holidays List</h3>

            {/* <div className="row mb-3">
                <div className="col-md-6 col-sm-10 mx-auto border border-success">
                    <Form.Control
                        type="text"
                        placeholder="Search Holiday"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-6 col-sm-10 mx-auto border border-danger">
                    <Button variant="success">+ Add Holiday</Button>
                </div>
            </div> */}


            <div className="row mb-3 ">
                <div className="col-md-6 col-sm-10 mx-auto p-3 rounded ">
                    {/* Flex container: Row direction, centered horizontally & vertically */}
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                        <Form.Control
                            type="text"
                            placeholder="Search Holiday"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow-1"
                        />
                        <Button className="w-50" variant="success">+ Add Holiday</Button>
                    </div>
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
                        {holidayData.length > 0 ? (
                            holidayData.map((day, index) => (
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