import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./../styles/Components.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const SalaryHoldingChart = () => {
    const data = {
        labels: ["Sep", "Nov", "Jan"],
        datasets: [
            {
                label: "Salary Holding",
                data: [50, 40, 60],
                // backgroundColor: ["#3498db", "#9b59b6", "#e74c3c", "#2ecc71"],
                // hoverBackgroundColor: ["#2980b9", "#8e44ad", "#c0392b", "#27ae60"],
                backgroundColor: ["#3498db", "#2ecc71", "#9b59b6"],
                hoverBackgroundColor: ["#2980b9", "#27ae60", "#8e44ad"],
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
    };

    return (
        <div>
            <div className="salary-holding-chart-container">
                <h2>Salary Holding</h2>
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}

export default SalaryHoldingChart