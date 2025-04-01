import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './pagess/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './pagess/Navbarmain'
import Navbarmain from './pagess/Navbarmain'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pagess/Dashboard"
import Leaves from "./pagess/Leaves"; // Import the Leaves component
import SalaryList from './pagess/SalaryList'
import LoanList from './pagess/LoanList'
import Incentive from './pagess/Incentive'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <>
        <Navbarmain />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/salarylist"  element={<SalaryList />} />
          <Route path='/loanlist' element={<LoanList/>} />
          <Route path='/incentive' element={<Incentive/>} />
        </Routes>
      </>
    </Router>
    </>
  )
}

export default App
