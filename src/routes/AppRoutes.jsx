import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddEmployee, AllowanceReport, AttendanceReport, Bonus, Dashboard, DateWiseAttendance, Employee, HolidaysList, Incentive, Leaves, LoanList, LoanReport, PFESIReport, SalaryList, SalaryReport, Settingpage, ShiftList, Signup, WeeklyAttendance } from '../pages'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/salarylist" element={<SalaryList />} />
            <Route path='/loanlist' element={<LoanList />} />
            <Route path='/incentive' element={<Incentive />} />
            <Route path='/bonus' element={<Bonus />} />
            <Route path='/holidays' element={<HolidaysList />} />
            <Route path='/shift' element={<ShiftList />} />
            <Route path='/datewise-attendance' element={<DateWiseAttendance />} />
            <Route path='/attendance-report' element={<AttendanceReport />} />
            <Route path='/pf-esi-report' element={<PFESIReport />} />
            <Route path='/allowance-report' element={<AllowanceReport />} />
            <Route path='/loan-report' element={<LoanReport />} />
            <Route path='/salary-report' element={<SalaryReport />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/addemployee' element={<AddEmployee />} />
            <Route path='/employee' element={<Employee />} />
            <Route path='/adminsetting' element={<Settingpage />} />
            <Route path='/weekly-attendance' element={<WeeklyAttendance />} />
        </Routes>
    )
}

export default AppRoutes