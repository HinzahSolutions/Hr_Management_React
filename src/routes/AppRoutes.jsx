import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from "../components/ProtectedRoute";
import { AddEmployee, AllowanceReport, AttendanceReport, Bonus, Dashboard, DateWiseAttendance, Employee, HolidaysList, Incentive, Leaves, LoanList, LoanReport, PFESIReport, SalaryList, SalaryReport, Settingpage, ShiftList, Signup, WeeklyAttendance } from '../pages'

const AppRoutes = () => {
    return (
        // <Routes>
        //     <Route path="/" element={<Dashboard />} />
        //     <Route path="/leaves" element={<Leaves />} />
        //     <Route path="/salarylist" element={<SalaryList />} />
        //     <Route path='/loanlist' element={<LoanList />} />
        //     <Route path='/incentive' element={<Incentive />} />
        //     <Route path='/bonus' element={<Bonus />} />
        //     <Route path='/holidays' element={<HolidaysList />} />
        //     <Route path='/shift' element={<ShiftList />} />
        //     <Route path='/datewise-attendance' element={<DateWiseAttendance />} />
        //     <Route path='/attendance-report' element={<AttendanceReport />} />
        //     <Route path='/pf-esi-report' element={<PFESIReport />} />
        //     <Route path='/allowance-report' element={<AllowanceReport />} />
        //     <Route path='/loan-report' element={<LoanReport />} />
        //     <Route path='/salary-report' element={<SalaryReport />} />
        //     <Route path='/signup' element={<Signup />} />
        //     <Route path='/addemployee' element={<AddEmployee />} />
        //     <Route path='/employee' element={<Employee />} />
        //     <Route path='/adminsetting' element={<Settingpage />} />
        //     <Route path='/weekly-attendance' element={<WeeklyAttendance />} />
        //     <Route path="/edit/:id" element={<AddEmployee />} />
        // </Routes>
        <Routes>
  <Route path="/signup" element={<Signup />} />

  <Route
    path="/"
    element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
  />
  <Route
    path="/leaves"
    element={<ProtectedRoute><Leaves /></ProtectedRoute>}
  />
  <Route
    path="/salarylist"
    element={<ProtectedRoute><SalaryList /></ProtectedRoute>}
  />
  <Route
    path="/loanlist"
    element={<ProtectedRoute><LoanList /></ProtectedRoute>}
  />
  <Route
    path="/incentive"
    element={<ProtectedRoute><Incentive /></ProtectedRoute>}
  />
  <Route
    path="/bonus"
    element={<ProtectedRoute><Bonus /></ProtectedRoute>}
  />
  <Route
    path="/holidays"
    element={<ProtectedRoute><HolidaysList /></ProtectedRoute>}
  />
  <Route
    path="/shift"
    element={<ProtectedRoute><ShiftList /></ProtectedRoute>}
  />
  <Route
    path="/datewise-attendance"
    element={<ProtectedRoute><DateWiseAttendance /></ProtectedRoute>}
  />
  <Route
    path="/attendance-report"
    element={<ProtectedRoute><AttendanceReport /></ProtectedRoute>}
  />
  <Route
    path="/pf-esi-report"
    element={<ProtectedRoute><PFESIReport /></ProtectedRoute>}
  />
  <Route
    path="/allowance-report"
    element={<ProtectedRoute><AllowanceReport /></ProtectedRoute>}
  />
  <Route
    path="/loan-report"
    element={<ProtectedRoute><LoanReport /></ProtectedRoute>}
  />
  <Route
    path="/salary-report"
    element={<ProtectedRoute><SalaryReport /></ProtectedRoute>}
  />
  <Route
    path="/addemployee"
    element={<ProtectedRoute><AddEmployee /></ProtectedRoute>}
  />
  <Route
    path="/employee"
    element={<ProtectedRoute><Employee /></ProtectedRoute>}
  />
  <Route
    path="/adminsetting"
    element={<ProtectedRoute><Settingpage /></ProtectedRoute>}
  />
  <Route
    path="/weekly-attendance"
    element={<ProtectedRoute><WeeklyAttendance /></ProtectedRoute>}
  />
  <Route
    path="/edit/:id"
    element={<ProtectedRoute><AddEmployee /></ProtectedRoute>}
  />
</Routes>
    )
}

export default AppRoutes