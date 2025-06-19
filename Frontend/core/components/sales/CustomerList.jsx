import React, { useState, useEffect } from "react";
import CustomerForm from "./CustomerForm";
import "./CustomerList.css";

const CustomerList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  // Sample data - replace with API call
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setCustomers([
        {
          id: 1,
          customerName: "John Doe",
          companyName: "ABC Corporation",
          email: "john.doe@abc.com",
          phone: "+1 (555) 123-4567",
          receivable: 5000,
          status: "active",
          lastInvoice: "2024-01-15",
          totalInvoices: 12
        },
        {
          id: 2,
          customerName: "Jane Smith",
          companyName: "XYZ Industries",
          email: "jane.smith@xyz.com",
          phone: "+1 (555) 987-6543",
          receivable: 0,
          status: "active",
          lastInvoice: "2024-01-20",
          totalInvoices: 8
        },
        {
          id: 3,
          customerName: "Mike Johnson",
          companyName: "Tech Solutions LLC",
          email: "mike@techsolutions.com",
          phone: "+1 (555) 456-7890",
          receivable: 2500,
          status: "inactive",
          lastInvoice: "2023-12-10",
          totalInvoices: 5
        },
        {
          id: 4,
          customerName: "Sarah Wilson",
          companyName: "Design Studio",
          email: "sarah@designstudio.com",
          phone: "+1 (555) 321-0987",
          receivable: 1200,
          status: "active",
          lastInvoice: "2024-01-18",
          totalInvoices: 15
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle adding new customer
  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  // Handle editing customer
  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  // Handle deleting customer
  const handleDeleteCustomer = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
    }
  };

  // Handle form submission
  const handleFormSubmit = (customerData) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(customers.map(customer => 
        customer.id === editingCustomer.id 
          ? { ...customerData, id: editingCustomer.id }
          : customer
      ));
    } else {
      // Add new customer
      const newCustomer = {
        ...customerData,
        id: Date.now(), // Simple ID generation
        receivable: 0,
        status: "active",
        lastInvoice: null,
        totalInvoices: 0
      };
      setCustomers([...customers, newCustomer]);
    }
    setShowForm(false);
    setEditingCustomer(null);
  };

  // Handle going back from form
  const handleBackToList = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate summary stats
  const totalReceivable = customers.reduce((sum, customer) => sum + customer.receivable, 0);
  const activeCustomers = customers.filter(c => c.status === "active").length;

  if (showForm) {
    return (
      <CustomerForm 
        customer={editingCustomer}
        onSubmit={handleFormSubmit}
        onBack={handleBackToList}
        isEditing={!!editingCustomer}
      />
    );
  }

  return (
    <div className="customer-list-container">
      {/* Header Section */}
      <div className="customer-list-header">
        <div className="header-title">
          <h1>Customer Management</h1>
          <p>Manage your customers and track receivables</p>
        </div>
        <button className="btn btn-primary add-customer-btn" onClick={handleAddCustomer}>
          <span className="btn-icon">+</span>
          Add Customer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{customers.length}</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{activeCustomers}</div>
          <div className="stat-label">Active Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totalReceivable.toLocaleString()}</div>
          <div className="stat-label">Total Receivables</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{customers.filter(c => c.receivable > 0).length}</div>
          <div className="stat-label">Outstanding</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="customer-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-controls">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Customer List */}
      <div className="customer-list-section">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading customers...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No customers found</h3>
            <p>
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filters"
                : "Get started by adding your first customer"
              }
            </p>
            {!searchTerm && filterStatus === "all" && (
              <button className="btn btn-primary" onClick={handleAddCustomer}>
                Add Your First Customer
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="customer-table">
              <div className="table-header">
                <div className="header-cell">Customer</div>
                <div className="header-cell">Company</div>
                <div className="header-cell">Contact</div>
                <div className="header-cell">Receivables</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Last Invoice</div>
                <div className="header-cell">Actions</div>
              </div>

              {/* Table Body */}
              <div className="table-body">
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className="table-row">
                    <div className="table-cell">
                      <div className="customer-info">
                        <div className="customer-avatar">
                          {customer.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div className="customer-details">
                          <div className="customer-name">{customer.customerName}</div>
                          <div className="customer-id">ID: {customer.id}</div>
                        </div>
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="company-name">{customer.companyName}</div>
                    </div>
                    <div className="table-cell">
                      <div className="contact-info">
                        <div className="email">{customer.email}</div>
                        <div className="phone">{customer.phone}</div>
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className={`receivable ${customer.receivable > 0 ? 'outstanding' : 'clear'}`}>
                        ${customer.receivable.toLocaleString()}
                      </div>
                    </div>
                    <div className="table-cell">
                      <span className={`status-badge ${customer.status}`}>
                        {customer.status}
                      </span>
                    </div>
                    <div className="table-cell">
                      <div className="last-invoice">
                        {customer.lastInvoice ? customer.lastInvoice : 'Never'}
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleEditCustomer(customer)}
                          title="Edit Customer"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          title="Delete Customer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            <div className="results-summary">
              Showing {filteredCustomers.length} of {customers.length} customers
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerList;