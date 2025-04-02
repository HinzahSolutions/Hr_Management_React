import React from 'react'
import { AllowanceChart, EmployeePresentAbsentChart, LoanChart, MonthForeCastSalaryChart, PFESIChart, SalaryAdvanceChart, SalaryChart, SalaryHoldingChart } from '../components'
import "./../styles/Style.css"

function Dashboard() {
  return (
    <div>
      <div className='top-chart-container'>
        <EmployeePresentAbsentChart />
        <LoanChart />
        <SalaryAdvanceChart />
      </div>
      <div className='center-chart-container'>
        <SalaryChart />
        <MonthForeCastSalaryChart />
      </div>
      <div className='bottom-chart-container'>
        <PFESIChart />
        <SalaryHoldingChart />
        <AllowanceChart />
      </div>
    </div>
  )
}

export default Dashboard