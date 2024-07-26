import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyExpenseGraph = ({ data }) => {
  const chartData = {
    labels: data.map(item => {
      const [year, month] = item._id.split('-');
      return new Date(year, month - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
    }),
    datasets: [
      {
        label: 'Mess',
        data: data.map(item => item.mess?.totalCost || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tiffin',
        data: data.map(item => item.tiffin?.totalCost || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Junk',
        data: data.map(item => item.junk?.totalCost || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expenses Breakdown',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Expenses (₹)',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MonthlyExpenseGraph;