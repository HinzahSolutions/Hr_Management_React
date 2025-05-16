import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { addNewEmployees, /*fetchEmployeeById,*/ updateEmployee } from '../features/employeeSlice';
import { toastError, toastSuccess } from '../utils/toastHelper';
import { useNavigate, useParams } from 'react-router-dom';


// localStorage.setItem("updateEmployeeData", JSON.stringify([{id:1}]));

// localStorage.removeItem("updateEmployeeData");

function AddEmployee() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();  // for edit mode
  console.log('id', id);
  const isEdit = Boolean(id);
  const { data: employeesData, loading, error } = useSelector((state) => state.employees);
  console.log('employeesData', employeesData);

  const [form, setForm] = useState({
    emp_id: "",
    emp_name: "",
    designation: "",
    emp_group: "",
    contact_no: "",
    email_id: "",
    ind_contact_no: "",
    dob: "",
    joining_date: "",
    nationality: "",
    duty_date: "",
    basic_amt: "",
    accommodation: "",
    allowance: "",
    act_flag: "",
    address: ""
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    if (isEdit) {
      let employee = employeesData.find((emp) => String(emp.employee_id) === String(id));
      console.log('employee', employee);
      const formatDate = (dateStr) => dateStr ? dateStr.split('T')[0] : "";

      if (!employee) {
        const localData = localStorage.getItem('editEmployee');
        if (localData) employee = JSON.parse(localData);
      }

      if (employee) {
        setForm({
          emp_id: employee.emp_id || "",
          emp_name: employee.emp_name || "",
          designation: employee.designation || "",
          emp_group: employee.emp_group || "",
          contact_no: employee.contact_no || "",
          email_id: employee.email_id || "",
          ind_contact_no: employee.ind_contact_no || "",
          dob: formatDate(employee.dob),
          joining_date: formatDate(employee.joining_date),
          nationality: employee.nationality || "",
          duty_date: formatDate(employee.duty_date),
          basic_amt: employee.basic_amt || "",
          accommodation: employee.accommodation || "",
          allowance: employee.allowance || "",
          act_flag: employee.act_flag || "",
          address: employee.address || ""
        });
      }
    }
  }, [id, isEdit, employeesData])


  



  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.emp_id || !form.emp_name || !form.designation || !form.emp_group ||
      !form.contact_no || !form.email_id || !form.ind_contact_no || !form.dob ||
      !form.joining_date || !form.nationality || !form.basic_amt || !form.duty_date ||
      !form.accommodation || !form.allowance || !form.act_flag || !form.address
    ) {
      // return alert('Error', 'All fields are required.');
      return toast.error('Please Fill in All Fields!');
    }

    const newEmployee = {
      emp_id: form.emp_id,
      emp_name: form.emp_name,
      designation: form.designation,
      emp_group: form.emp_group,
      contact_no: form.contact_no,
      email_id: form.email_id,
      ind_contact_no: form.ind_contact_no,
      dob: form.dob,
      joining_date: form.joining_date,
      nationality: form.nationality,
      duty_date: form.duty_date,
      basic_amt: form.basic_amt,
      accommodation: form.accommodation,
      allowance: form.allowance,
      act_flag: form.act_flag,
      address: form.address
    };

    const updatedEmployee = {
      ...form,
      employee_id: id  // <-- make this explicit
    };

    if (isEdit) {
      console.log("Form values on submit:", form);           // ✅ Add this
      console.log("Updating employee with:", updatedEmployee); // ✅ Add this
      dispatch(updateEmployee({ updatedData: updatedEmployee }));
      toast.success("Employee updated successfully!");
    } else {
      dispatch(addNewEmployees(newEmployee));
      toast.success("Employee added successfully!");
    }

    clearForm();
  }


  const clearForm = () => {
    setForm({
      emp_id: "",
      emp_name: "",
      designation: "",
      emp_group: "",
      contact_no: "",
      email_id: "",
      ind_contact_no: "",
      dob: "",
      joining_date: "",
      nationality: "",
      duty_date: "",
      basic_amt: "",
      accommodation: "",
      allowance: "",
      act_flag: "",
      address: ""
    });
  };



  return (
    <>
      <div className='text-center pt-5'>
        <h2>{isEdit ? "Enter the Update Data" : "Enter the Employee Data"}</h2>
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
                  value={form.emp_id}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className="fw-bold">EMP NAME</Form.Label>
                <Form.Control
                  type="text"
                  name="emp_name"
                  value={form.emp_name}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DESIGNATION</Form.Label>
                <Form.Select type="text" name="designation" value={form.designation} onChange={handleChange}>
                  <option>NONE</option>
                  <option>CEO</option>
                  <option>DEVELOPER</option>
                  <option>EMPLOYEE</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>GROUP</Form.Label>
                <Form.Select type="text" name="emp_group" value={form.emp_group} onChange={handleChange}>
                  <option>NONE</option>
                  <option>HR TEAM</option>
                  <option>IT TEAM</option>
                  {/* <option>EMPLOYEE</option> */}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb- col-xxl-3 col-md-12 col-lg-4 col-xl-4">
                <Form.Label className='fw-bold'>CONTACT NUMBER</Form.Label>
                <Form.Control
                  type="number"
                  name="contact_no"
                  value={form.contact_no}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>EMAIL ID</Form.Label>
                <Form.Control
                  type="text"
                  name="email_id"
                  value={form.email_id}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className="fw-bold">INDIAN CONTACT NUMBER</Form.Label>
                <Form.Control
                  type="number"
                  name="ind_contact_no"
                  value={form.ind_contact_no}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DATE-OF-BIRTH</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>JOINING DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="joining_date"
                  value={form.joining_date}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>NATIONALITY</Form.Label>
                <Form.Control
                  type="text"
                  name="nationality"
                  value={form.nationality}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>BASIC AMT</Form.Label>
                <Form.Control
                  type="number"
                  name="basic_amt"
                  value={form.basic_amt}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>DUTY DATE</Form.Label>
                <Form.Control
                  type="date"
                  name="duty_date"
                  value={form.duty_date}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ACCOMODATION</Form.Label>
                <Form.Control
                  type="number"
                  name="accommodation"
                  value={form.accommodation}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ALLOWANCE</Form.Label>
                <Form.Control
                  type="number"
                  name="allowance"
                  value={form.allowance}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className='fw-bold'>ACT FLAG</Form.Label>
                <Form.Control
                  type="number"
                  name="act_flag"
                  value={form.act_flag}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-6 col-xxl-3 col-md-12 col-lg-5 col-xl-4">
                <Form.Label className="fw-bold">ADDRESS</Form.Label>
                <Form.Control
                  as="textarea"
                  className="w-100"
                  style={{ height: '100px' }} // Adjust the height as needed
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className="d-flex gap-3 pt-5">
              <Button variant="info text-white" >SEARCH</Button>
              {/* <Button variant="success">UPDATE</Button> */}
              <Button variant="success" type="submit">{isEdit ? 'UPDATE EMPLOYEE' : 'ADD NEW EMPLOYEE'}</Button>
              <Button variant="warning text-white" onClick={clearForm}>CLEAR ALL</Button>
              <Button variant="dark" onClick={() => navigate(-1)}>EXIT</Button>
            </div>

          </div>
          <ToastContainer />
        </Form>

      </div>
    </>
  )
}

export default AddEmployee


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (
//     !empID || !empName || !designation || !group || !contactNo || !emailId ||
//     !indianContactNo || !dateOfBirth || !joiningDate || !nationality ||
//     !basicAmount || !dutyDate || !accomodation || !allowance || !actFlag || !address
//   ) {
//     // return alert('Error', 'All fields are required.');
//     return toastNotifyError();
//   }

//   try {
//     const employeeData = {
//       emp_id: empID,
//       emp_name: empName,
//       designation: designation,
//       emp_group: group,
//       contact_no: contactNo,
//       email_id: emailId,
//       ind_contact_no: indianContactNo,
//       dob: dateOfBirth,
//       joining_date: joiningDate,
//       nationality: nationality,
//       duty_date: dutyDate,
//       basic_amt: basicAmount,
//       accommodation: accomodation,
//       allowance: allowance,
//       act_flag: actFlag,
//       address: address
//     };

//     const response = await axios.post(`http://192.168.0.2:15930/createEmployee`, employeeData);
//     setNewEmployeeData(response.data);

//     toastNotifySuccess();

//     // console.log("response.data:", response.data);
//     // console.log("New Employee:", employeeData);

//     setEmpID("");
//     setEmpName("");
//     setDesignation("");
//     setGroup("");
//     setContactNo("");
//     setEmailId("");
//     setIndianContactNo("");
//     setDateOfBirth("");
//     setJoiningDate("");
//     setNationality("");
//     setDutyDate("");
//     setBasicAmount("");
//     setAccomodation("");
//     setAllowance("");
//     setActFlag("");
//     setAddress("");

//     // You can now send this data to your backend or Redux store
//   } catch (error) {
//     console.error('Error adding new employee:', error.response ? error.response.data : error.message);
//   }
// };



// const toastNotifySuccess = () => {
//   toast.success('Successfully!', {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//     // transition: Bounce,
//   });
// }

// const toastNotifyError = () => {
//   toast.error('Error!', {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//     // transition: Bounce,
//   });
// }


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