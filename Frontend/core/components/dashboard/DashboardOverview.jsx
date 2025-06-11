import React from "react";
import "./DashboardOverview.css"
const DashboardOverview = () =>{
    const totalRevenue = 1000;
    const totalExpenses = 500;
    const totalProfit = totalRevenue - totalExpenses;
    return(
        <div className="dashboard-overview">
                <div className="dashboard-title">
                    Dashboard
                </div>
                <div className="Trevenue-card">
                    Total revenue <div className="revenue-amount">${totalRevenue}</div>
                </div>
                <div className="Texpense-card">
                    Total expense
                    <div className="expense-amount">
                    ${totalExpenses}
                    </div>
                </div>
                <div className="Tprofit-card">
                    Total sales
                    <div className="profit-amount">
                    ${totalProfit}
                    </div>
                </div>
        </div>
    )
}


export default DashboardOverview;