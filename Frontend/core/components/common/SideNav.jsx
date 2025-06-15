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
    navigate(sectionName === "Dashboard" ? "/" : `/${sectionName.toLowerCase()}`);
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
        🏠 Dashboard
      </div>

      {/* Sales Section */}
      <div>
        <div
          className={`sidebar-item ${activeSection === "Sales" ? "active" : ""}`}
          onClick={() => handleSectionClick("Sales")}
        >
          💰 Sales
        </div>
        {activeSection === "Sales" && (
          <div className="submenu">
            <div
              className={`submenu-item ${activePage === "Invoice" ? "active" : ""}`}
              onClick={() => handlePageClick("Invoice", "/sales/invoice")}
            >
              📄 Invoice
            </div>
            <div
              className={`submenu-item ${activePage === "Customer" ? "active" : ""}`}
              onClick={() => handlePageClick("Customer", "/sales/customer")}
            >
              👤 Customer
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
          🛒 Purchases
        </div>
        {activeSection === "Purchases" && (
          <div className="submenu">
            <div
              className={`submenu-item ${activePage === "Bill" ? "active" : ""}`}
              onClick={() => handlePageClick("Bill", "/purchases/bill")}
            >
              🧾 Bill
            </div>
            <div
              className={`submenu-item ${activePage === "Vendor" ? "active" : ""}`}
              onClick={() => handlePageClick("Vendor", "/purchases/vendor")}
            >
              🏢 Vendor
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
          🏦 Banking
        </div>
        {activeSection === "Banking" && (
          <div className="submenu">
            <div
              className={`submenu-item ${activePage === "Accounts" ? "active" : ""}`}
              onClick={() => handlePageClick("Accounts", "/banking/accounts")}
            >
              💳 Accounts
            </div>
            <div
              className={`submenu-item ${activePage === "Transactions" ? "active" : ""}`}
              onClick={() => handlePageClick("Transactions", "/banking/transactions")}
            >
              💸 Transactions
            </div>
            <div
              className={`submenu-item ${activePage === "Reports" ? "active" : ""}`}
              onClick={() => handlePageClick("Reports", "/banking/reports")}
            >
              📊 Reports
            </div>
            <div
              className={`submenu-item ${activePage === "Balance" ? "active" : ""}`}
              onClick={() => handlePageClick("Balance", "/banking/balance")}
            >
              ⚖️ Balance
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
