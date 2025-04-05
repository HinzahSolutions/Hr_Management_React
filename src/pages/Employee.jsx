import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'

function Employee() {
    const navigate = useNavigate();
  return (
    <>
        <div>
        <Button variant="success" onClick={() => navigate("/addemployee")}  >+ Add Employee</Button>
        </div>
    </>
   
  )
}

export default Employee