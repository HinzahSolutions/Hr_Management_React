import React from 'react'
import { Button, Form } from 'react-bootstrap';

function AddEmployee() {
  return (
    <>
      <div className='text-center pt-2'>
        <h2>Enter the Employee Data</h2>
      </div>
      <div className="container-fluid p-3 mt-4" >

        <Form >
          <div className="d-flex justify-content-center flex-wrap p-1">
            <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-2 gap-5" >
              <Form.Group className="mb- col-xxl-3 col-md-12 col-lg-4 col-xl-4">
                <Form.Label className='fw-bold'>EMP CODE</Form.Label>
                <Form.Control
                  type="text"
                  name="client_name"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className="fw-bold">EMP NAME</Form.Label>
                <Form.Control
                  type="text"
                  name="client_contact"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DESIGNATION</Form.Label>
                <Form.Select type="text">
                  <option>CEO</option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group>



              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DATE-OF-BIRTH</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"

                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>JOINING DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"

                />
              </Form.Group>
            </div>


            <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-4 gap-5 bg-black mt-1 " >
              <h4></h4>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold text-white'>EMP ID CODE</Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold text-white'>ISSUE DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold text-white'>EXP DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"
                />
              </Form.Group>
            </div>


            <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-2 gap-5" >
              <Form.Group className="mb- col-xxl-3 col-md-12 col-lg-4 col-xl-4">
                <Form.Label className='fw-bold'>CONTACT NUMBER</Form.Label>
                <Form.Control
                  type="text"
                  name="client_name"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className="fw-bold">INDIAN CONTACT NUMBER</Form.Label>
                <Form.Control
                  type="text"
                  name="client_contact"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>NATIONALITY</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>EMAIL ID</Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className="fw-bold">ADDRESS</Form.Label>
                <Form.Control
                  as="textarea"
                  name="amount"
                  className="w-100"
                  style={{ height: '100px' }} // Adjust the height as needed
                />
              </Form.Group>
            </div>


            <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-4 gap-5 bg-black mt-1 " >
              <h4></h4>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold text-white'>PP CODE</Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold text-white'>ISSUE DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold text-white'>EXP DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="amount"
                />
              </Form.Group>
            </div>


            <div className="d-flex flex-wrap justify-content-center col-6 col-sm-6 col-xl-4 col-xxl-6 w-100 p-2 gap-5" >
              <Form.Group className="mb- col-xxl-3 col-md-12 col-lg-4 col-xl-4">
                <Form.Label className='fw-bold'>BASIC AMT</Form.Label>
                <Form.Control
                  type="text"
                  name="client_name"
                />
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DUTY DET</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ACCOMODATION</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ALLOWENCE</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ACT FLAG</Form.Label>
                <Form.Select type="text">
                  <option></option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="d-flex gap-3 pt-5">
              <Button variant="info text-white" >SEARCH</Button>
              <Button variant="success">UPDATE</Button>
              <Button variant="primary" type="submit">ADD NEW EMPLOYEE</Button>
              <Button variant="warning text-white" >CLEAR ALL</Button>
              <Button variant="dark" >EXIT</Button>
            </div>

          </div>
        </Form>

      </div>
    </>
  )
}

export default AddEmployee