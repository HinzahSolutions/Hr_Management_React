import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./../styles/Components.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const LoanChart = () => {

  const data = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        label: "Loan",
        data: [80, 20],
       
        backgroundColor: ["#2ecc71", "#e74c3c"],
        hoverBackgroundColor: ["#27ae60", "#c0392b"],
        borderWidth: 2,
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333", 
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "white",
        bodyColor: "white",
      },
    },
  };

  return (
    <div>
      <div className="loan-chart-container">
      <h2>Loan</h2>
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}

export default LoanChart