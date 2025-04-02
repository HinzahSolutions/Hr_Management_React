import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Sidebar from './pagess/Sidebar'
// import Navbar from './pagess/Navbarmain'
// import Navbarmain from './pages/Navbarmain'
// import Home from "./pages/Dashboard"
// import Leaves from "./pages/Leaves"; // Import the Leaves component
// import SalaryList from './pages/SalaryList'
// import LoanList from './pages/LoanList'
// import Incentive from './pages/Incentive'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Leaves, SalaryList, LoanList, Incentive, Navbarmain, Sidebar, Bonus, HolidaysList } from './pages'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <>
          <Navbarmain />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/salarylist" element={<SalaryList />} />
            <Route path='/loanlist' element={<LoanList />} />
            <Route path='/incentive' element={<Incentive />} />
            <Route path='/bonus' element={<Bonus />} />
            <Route path='/holidays' element={<HolidaysList />} />
          </Routes>
        </>
      </Router>
    </>
  )
}

export default App
