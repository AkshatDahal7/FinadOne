import React from "react";
import DashboardOverview from "../components/dashboard/dashboardOverview";
import ProfitLoss from "../components/dashboard/ProfitAndLoss";
import './Dashboard.css'
const Dashboard = () =>{
    return (
        <div className="dashboardOverall">
        <div className="dashboardContainer">
            <DashboardOverview/>
            </div>
                <div className="dashboardRemaining">
            <ProfitLoss/>
        </div>
        </div>
    )
}
export default Dashboard