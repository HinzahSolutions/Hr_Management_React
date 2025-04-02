import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./../styles/Components.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeePresentAbsentChart = () => {

  const data = {
    labels: ["Today Present", "Today Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [80, 20],
        backgroundColor: ["#3498db", "#e74c3c",],
        hoverBackgroundColor: ["#2980b9", "#c0392b",],
        borderWidth: 2,
        // cutout: "60%",
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333", // Legend text color
          font: {
            size: 14, // Legend font size
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)", // Dark tooltip background
        titleColor: "white",
        bodyColor: "white",
      },
    },
  };


  return (
    <div>
      <div className="employee-chart-container">
        <h2>Employee</h2>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

export default EmployeePresentAbsentChart