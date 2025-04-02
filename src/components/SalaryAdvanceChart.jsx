import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import "./../styles/Components.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalaryAdvanceChart = () => {

  const data = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        label: "Salary Advance",
        data: [12, 19],
        // backgroundColor: ["#3498db", "#9b59b6", "#e74c3c", "#2ecc71", "#f1c40f"],
        // hoverBackgroundColor: ["#2980b9", "#8e44ad", "#c0392b", "#27ae60", "#f39c12"],
        backgroundColor: ["#3498db", "#9b59b6",],
        hoverBackgroundColor: ["#2980b9", "#8e44ad",],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // ✅ Makes it a Horizontal Bar Chart
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
        position: "bottom",
        labels: {
          color: "#333", // Legend text color
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)", // Dark tooltip background
        titleColor: "white",
        bodyColor: "white",
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Ensure values start from zero
      },
    },
  };

  return (
    <div>
      <div className="salary-advance-chart-container">
      <h2>Salary Advance</h2>
      <div style={{ height: "250px", margin: "auto",display:'flex',alignItems:'center' }}>
        <Bar data={data} options={options} className="salary-chart" />
      </div>

        {/* ✅ Custom Legend Below */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "15px", height: "15px", backgroundColor: "#3498db", borderRadius: "3px" }}></div>
            <span>Paid</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "15px", height: "15px", backgroundColor: "#9b59b6", borderRadius: "3px" }}></div>
            <span>Pending</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryAdvanceChart