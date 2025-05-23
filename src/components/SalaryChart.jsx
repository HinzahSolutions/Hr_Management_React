import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./../styles/Components.css";

const SalaryChart = () => {

    const data = [
        { name: 'Jan A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Feb B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Mar C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Apr D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'May E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Jun F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Jul G', uv: 3490, pv: 4300, amt: 2100 },
    ];

    return (
        <div>
            <div className="salary-chart-container">
                <h2>Salary</h2>
                <ResponsiveContainer width={"100%"} height={300}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="amt" stackId="a" fill="#ffc658" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default SalaryChart