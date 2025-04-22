import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';

function AddEmployee() {

  const [empID, setEmpID] = useState("");
  const [empName, setEmpName] = useState("");
  const [designation, setDesignation] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [indianContactNo, setIndianContactNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [basicAmount, setBasicAmount] = useState("");
  const [dutyDate, setDutyDate] = useState("");
  const [accomodation, setAccomodation] = useState("");
  const [allowance, setAllowance] = useState("");
  const [actFlag, setActFlag] = useState("");
  const [address, setAddress] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = {
      empID,
      empName,
      designation,
      contactNo,
      emailId,
      indianContactNo,
      dateOfBirth,
      joiningDate,
      nationality,
      dutyDate,
      basicAmount,
      accomodation,
      allowance,
      actFlag,
      address
    };

    console.log("New Employee:", employeeData);
    // You can now send this data to your backend or Redux store
  };


  const clearForm = () => {
    setEmpID("");
    setEmpName("");
    setDesignation("");
    setContactNo("");
    setEmailId("");
    setIndianContactNo("");
    setDateOfBirth("");
    setJoiningDate("");
    setNationality("");
    setDutyDate("");
    setBasicAmount("");
    setAccomodation("");
    setAllowance("");
    setActFlag("");
    setAddress("");
  };



  return (
    <>
      <div className='text-center pt-5'>
        <h2>Enter the Employee Data</h2>
      </div>
      <div className="container-fluid p-3 mt-4" >

        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center flex-wrap p-1">
            <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-2 gap-5" >

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>EMP ID </Form.Label>
                <Form.Control
                  type="text"
                  name="emp_id"
                  value={empID}
                  onChange={(e) => setEmpID(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className="fw-bold">EMP NAME</Form.Label>
                <Form.Control
                  type="text"
                  name="emp_name"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DESIGNATION</Form.Label>
                <Form.Select type="text" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                  <option>NONE</option>
                  <option>CEO</option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb- col-xxl-3 col-md-12 col-lg-4 col-xl-4">
                <Form.Label className='fw-bold'>CONTACT NUMBER</Form.Label>
                <Form.Control
                  type="number"
                  name="employee_contact"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>EMAIL ID</Form.Label>
                <Form.Control
                  type="text"
                  name="email_id"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className="fw-bold">INDIAN CONTACT NUMBER</Form.Label>
                <Form.Control
                  type="number"
                  name="indian_employee_contact"
                  value={indianContactNo}
                  onChange={(e) => setIndianContactNo(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DATE-OF-BIRTH</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>JOINING DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="joining_date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>NATIONALITY</Form.Label>
                <Form.Control
                  type="text"
                  name="nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>BASIC AMT</Form.Label>
                <Form.Control
                  type="text"
                  name="basic_amount"
                  value={basicAmount}
                  onChange={(e) => setBasicAmount(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DUTY DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="duty_date"
                  value={dutyDate}
                  onChange={(e) => setDutyDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ACCOMODATION</Form.Label>
                <Form.Control
                  type="text"
                  name="accomodation"
                  value={accomodation}
                  onChange={(e) => setAccomodation(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ALLOWANCE</Form.Label>
                <Form.Control
                  type="text"
                  name="allowance"
                  value={allowance}
                  onChange={(e) => setAllowance(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ACT FLAG</Form.Label>
                <Form.Control
                  type="text"
                  name="act_flag"
                  value={actFlag}
                  onChange={(e) => setActFlag(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className="fw-bold">ADDRESS</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  className="w-100"
                  style={{ height: '100px' }} // Adjust the height as needed
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="d-flex gap-3 pt-5">
              <Button variant="info text-white" >SEARCH</Button>
              <Button variant="success">UPDATE</Button>
              <Button variant="primary" type="submit">ADD NEW EMPLOYEE</Button>
              <Button variant="warning text-white" onClick={clearForm}>CLEAR ALL</Button>
              <Button variant="dark" >EXIT</Button>
            </div>

          </div>
        </Form>

      </div>
    </>
  )
}

export default AddEmployee

{/* <Form.Group className="mb- col-xxl-3 col-md-12 col-lg-4 col-xl-4">
                <Form.Label className='fw-bold'>EMP CODE</Form.Label>
                <Form.Control
                  type="text"
                  name="client_name"
                />
              </Form.Group> */}


{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ISSUE DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"
                />
              </Form.Group> */}

{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>EXP DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"
                />
              </Form.Group> */}





{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>NATIONALITY</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group> */}



{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>PP CODE</Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                />
              </Form.Group> */}

{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ISSUE DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"
                />
              </Form.Group> */}

{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>EXP DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"
                />
              </Form.Group> */}

{/* <Form.Group className="mb- col-xxl-3 col-md-12 col-lg-4 col-xl-4">
                <Form.Label className='fw-bold'>BASIC AMT</Form.Label>
                <Form.Control
                  type="text"
                  name="client_name"
                />
              </Form.Group> */}

{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DUTY DET</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group> */}

{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ACCOMODATION</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group> */}

{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ALLOWENCE</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group> */}

{/* <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ACT FLAG</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group> */}



{/* <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-2 gap-5" > */ }
{/* </div> */ }

{/* <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-4 gap-5 bg-black mt-1 " >
              <h4></h4>

             
            </div> */}


{/* <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-4 gap-5 bg-black mt-1 " >
              <h4></h4>

            </div> */}


{/* <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-2 gap-5" >

            </div> */}