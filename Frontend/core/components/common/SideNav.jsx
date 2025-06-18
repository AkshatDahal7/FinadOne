import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Sidenav.css'

const SideNav = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [activePage, setActivePage] = useState("");
  const navigate = useNavigate();

  const handleSectionClick = (sectionName) => {
    setActiveSection((prev) => (prev === sectionName ? "" : sectionName));
    setActivePage(""); // Clear subpage selection when switching section
    // navigate(sectionName === "Dashboard" ? "/" : `/${sectionName.toLowerCase()}`);
    if (sectionName == "Dashboard")
    {
      navigate("/")
    }
  };

  const handlePageClick = (pageName, route) => {
    setActivePage(pageName);
    navigate(route);
  };

  return (
    <div className="sideBar">
      {/* Dashboard */}
      <div
        className={`sidebar-item ${activeSection === "Dashboard" ? "active" : ""}`}
        onClick={() => handleSectionClick("Dashboard")}
      >
        <span className="sidebar-icon">🏠</span>
        <span className="sidebar-text">Dashboard</span>
      </div>

      {/* Sales Section */}
      <div>
        <div
          className={`sidebar-item ${activeSection === "Sales" ? "active" : ""}`}
          onClick={() => handleSectionClick("Sales")}
        >
          <span className="sidebar-icon">💰</span>
          <span className="sidebar-text">Sales</span>
        </div>
        {activeSection === "Sales" && (
          <div className="submenu">
            <div
              className={`submenu-item ${activePage === "Invoice" ? "active" : ""}`}
              onClick={() => handlePageClick("Invoice", "/sales/invoice")}
            >
              <span className="sidebar-icon">📄</span>
              <span className="sidebar-text">Invoice</span>
            </div>
            <div
              className={`submenu-item ${activePage === "Customer" ? "active" : ""}`}
              onClick={() => handlePageClick("Customer", "/sales/customer")}
            >
              <span className="sidebar-icon">👤</span>
              <span className="sidebar-text">Customer</span>
            </div>
          </div>
        )}
      </div>

      {/* Purchases Section */}
      <div>
        <div
          className={`sidebar-item ${activeSection === "Purchases" ? "active" : ""}`}
          onClick={() => handleSectionClick("Purchases")}
        >
          <span className="sidebar-icon">🛒</span>
          <span className="sidebar-text">Purchases</span>
        </div>
        {activeSection === "Purchases" && (
          <div className="submenu">
            <div
              className={`submenu-item ${activePage === "Bill" ? "active" : ""}`}
              onClick={() => handlePageClick("Bill", "/purchases/bill")}
            >
              <span className="sidebar-icon">🧾</span>
              <span className="sidebar-text">Bill</span>
            </div>
            <div
              className={`submenu-item ${activePage === "Vendor" ? "active" : ""}`}
              onClick={() => handlePageClick("Vendor", "/purchases/vendor")}
            >
              <span className="sidebar-icon">🏢</span>
              <span className="sidebar-text">Vendor</span>
            </div>
          </div>
        )}
      </div>

      {/* Banking Section */}
      <div>
        <div
          className={`sidebar-item ${activeSection === "Banking" ? "active" : ""}`}
          onClick={() => handleSectionClick("Banking")}
        >
          <span className="sidebar-icon">🏦</span>
          <span className="sidebar-text">Banking</span>
        </div>
        {activeSection === "Banking" && (
          <div className="submenu">
            <div
              className={`submenu-item ${activePage === "Accounts" ? "active" : ""}`}
              onClick={() => handlePageClick("Accounts", "/banking/accounts")}
            >
              <span className="sidebar-icon">💳</span>
              <span className="sidebar-text">Accounts</span>
            </div>
            <div
              className={`submenu-item ${activePage === "Transactions" ? "active" : ""}`}
              onClick={() => handlePageClick("Transactions", "/banking/transactions")}
            >
              <span className="sidebar-icon">💸</span>
              <span className="sidebar-text">Transactions</span>
            </div>
            <div
              className={`submenu-item ${activePage === "Reports" ? "active" : ""}`}
              onClick={() => handlePageClick("Reports", "/banking/reports")}
            >
              <span className="sidebar-icon">📊</span>
              <span className="sidebar-text">Reports</span>
            </div>
            <div
              className={`submenu-item ${activePage === "Balance" ? "active" : ""}`}
              onClick={() => handlePageClick("Balance", "/banking/balance")}
            >
              <span className="sidebar-icon">⚖️</span>
              <span className="sidebar-text">Balance</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;