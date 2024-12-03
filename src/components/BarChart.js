import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const BarChart = ({ title, data }) => {
  const labels = data.map((item) => item.month);
  const counts = data.map((item) => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title || "Data",
        data: counts,
        backgroundColor: "#4caf50", // Customize bar color
        borderColor: "#388e3c", // Bar border color
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          family: "Polysans",
        },
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
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="w-full h-full mt-4">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
