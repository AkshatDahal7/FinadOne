import React from "react";
import DashboardOverview from "../components/dashboard/dashboardOverview";
import ProfitLoss from "../components/dashboard/ProfitAndLoss";
import './Dashboard.css'
const Dashboard = () =>{
    return (
        <div className="dashboardMain">
        <DashboardOverview/>
        <ProfitLoss/>
        </div>
    )
}
export default Dashboard