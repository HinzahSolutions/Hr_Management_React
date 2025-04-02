import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const MonthForeCastSalaryChart = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Last Month",
                data: [45, 90, 140, 190, 170, 210], // Last month salary data
                fill: false,
                borderColor: "rgba(255, 99, 132, 1)", // Red color
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
                tension: 0.4,
            },
            {
                label: "This Month",
                data: [50, 100, 150, 200, 180, 220], // This month salary data
                fill: true, // ✅ Makes it an area chart
                borderColor: "rgba(54, 162, 235, 1)", // Blue color
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                pointBackgroundColor: "rgba(54, 162, 235, 1)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <div className="month-salary-chart-container">
                <h2>This Month Forecast Salary</h2>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default MonthForeCastSalaryChart;
