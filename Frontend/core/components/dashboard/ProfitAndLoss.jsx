import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ProfitLoss.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ProfitLoss = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    revenue: [12000, 15000, 11000, 18000, 16000, 20000],
    expenses: [8000, 9000, 7500, 12000, 10000, 13000],
  };

  const profitLoss = monthlyData.revenue.map(
    (rev, i) => rev - monthlyData.expenses[i]
  );

  const totalRevenue = monthlyData.revenue.reduce((a, b) => a + b, 0);
  const totalExpenses = monthlyData.expenses.reduce((a, b) => a + b, 0);
  const totalProfit = totalRevenue - totalExpenses;

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: monthlyData.labels,
        datasets: [
          {
            label: "Revenue",
            data: monthlyData.revenue,
            backgroundColor: "rgba(34, 197, 94, 0.8)",
            borderColor: "rgba(34, 197, 94, 1)",
            borderWidth: 1,
            yAxisID: "y",
          },
          {
            label: "Expenses",
            data: monthlyData.expenses,
            backgroundColor: "rgba(239, 68, 68, 0.8)",
            borderColor: "rgba(239, 68, 68, 1)",
            borderWidth: 1,
            yAxisID: "y",
          },
          {
            label: "Profit/Loss",
            data: profitLoss,
            type: "line",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointBackgroundColor: profitLoss.map((val) =>
              val >= 0 ? "rgba(34, 197, 94, 1)" : "rgba(239, 68, 68, 1)"
            ),
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 6,
            yAxisID: "y",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Monthly Profit & Loss Analysis",
            font: {
              size: 18,
              weight: "bold",
            },
            color: "#1f2937",
          },
          legend: {
            display: true,
            position: "top",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                return `${label}: $${context.parsed.y.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Months",
              font: {
                weight: "bold",
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Amount ($)",
              font: {
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              callback: (value) => `$${value.toLocaleString()}`,
            },
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="profit-loss-overview">
      <div className="profitloss-card">
        <div className="profitloss-title">Profit & Loss Statement</div>
      <div className="content-inside">
        <div className="summary-cards">
          <div className="pl-revenue-card">
            <div className="card-label">Total Revenue</div>
            <div className="pl-revenue-amount">${totalRevenue.toLocaleString()}</div>
          </div>
          <div className="pl-expense-card">
            <div className="card-label">Total Expenses</div>
            <div className="pl-expense-amount">${totalExpenses.toLocaleString()}</div>
          </div>
          <div className="pl-profit-card">
            <div className="card-label">Net Profit</div>
            <div
              className={`pl-profit-amount ${
                totalProfit >= 0 ? "positive" : "negative"
              }`}
            >
              ${totalProfit.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
