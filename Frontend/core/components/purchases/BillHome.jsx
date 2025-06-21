import React, { useState, useEffect } from "react";
import BillForm from "./BillForm";
import "./bill.css";

const BillList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [bills, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  // Sample data - replace with API call
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setInvoices([
        {
          id: 1001,
          invoiceNumber: "INV-2024-001",
          customerName: "John Doe",
          companyName: "ABC Corporation",
          amount: 5000,
          status: "paid",
          dueDate: "2024-01-15",
          issueDate: "2024-01-01",
          description: "Web Development Services",
          paymentDate: "2024-01-10"
        },
        {
          id: 1002,
          invoiceNumber: "INV-2024-002",
          customerName: "Jane Smith",
          companyName: "XYZ Industries",
          amount: 3500,
          status: "pending",
          dueDate: "2024-02-15",
          issueDate: "2024-01-15",
          description: "Mobile App Development",
          paymentDate: null
        },
        {
          id: 1003,
          invoiceNumber: "INV-2024-003",
          customerName: "Mike Johnson",
          companyName: "Tech Solutions LLC",
          amount: 2500,
          status: "overdue",
          dueDate: "2024-01-20",
          issueDate: "2024-01-05",
          description: "System Integration",
          paymentDate: null
        },
        {
          id: 1004,
          invoiceNumber: "INV-2024-004",
          customerName: "Sarah Wilson",
          companyName: "Design Studio",
          amount: 1200,
          status: "draft",
          dueDate: "2024-02-28",
          issueDate: "2024-01-25",
          description: "UI/UX Design Services",
          paymentDate: null
        },
        {
          id: 1005,
          invoiceNumber: "INV-2024-005",
          customerName: "David Brown",
          companyName: "Marketing Pro",
          amount: 4200,
          status: "sent",
          dueDate: "2024-02-10",
          issueDate: "2024-01-20",
          description: "Digital Marketing Campaign",
          paymentDate: null
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle adding new bill
  const handleAddInvoice = () => {
    setEditingInvoice(null);
    setShowForm(true);
  };

  // Handle editing bill
  const handleEditInvoice = (bill) => {
    setEditingInvoice(bill);
    setShowForm(true);
  };

  // Handle deleting bill
  const handleDeleteInvoice = (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      setInvoices(bills.filter(bill => bill.id !== invoiceId));
    }
  };

  // Handle form submission
  const handleFormSubmit = (invoiceData) => {
    if (editingInvoice) {
      // Update existing bill
      setInvoices(bills.map(bill => 
        bill.id === editingInvoice.id 
          ? { ...invoiceData, id: editingInvoice.id }
          : bill
      ));
    } else {
      // Add new bill
      const newInvoice = {
        ...invoiceData,
        id: Date.now(), // Simple ID generation
        invoiceNumber: `INV-2024-${String(bills.length + 1).padStart(3, '0')}`,
        status: "draft",
        issueDate: new Date().toISOString().split('T')[0],
        paymentDate: null
      };
      setInvoices([...bills, newInvoice]);
    }
    setShowForm(false);
    setEditingInvoice(null);
  };

  // Handle going back from form
  const handleBackToList = () => {
    setShowForm(false);
    setEditingInvoice(null);
  };

  // Handle status change
  const handleStatusChange = (invoiceId, newStatus) => {
    setInvoices(bills.map(bill => 
      bill.id === invoiceId 
        ? { 
            ...bill, 
            status: newStatus,
            paymentDate: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : null
          }
        : bill
    ));
  };

  // Filter bills based on search and status
  const filteredInvoices = bills.filter(bill => {
    const matchesSearch = 
      bill.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || bill.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate summary stats
  const paidAmount = bills.filter(i => i.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = bills.filter(i => i.status === 'pending' || i.status === 'sent').reduce((sum, bill) => sum + bill.amount, 0);
  const overdueAmount = bills.filter(i => i.status === 'overdue').reduce((sum, bill) => sum + bill.amount, 0);

  // Get status color class
  const getStatusClass = (status) => {
    switch(status) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'sent': return 'status-sent';
      case 'overdue': return 'status-overdue';
      case 'draft': return 'status-draft';
      default: return 'status-default';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  // Check if overdue
  const isOverdue = (bill) => {
    if (bill.status === 'paid' || bill.status === 'draft') return false;
    return new Date(bill.dueDate) < new Date();
  };

  if (showForm) {
    return (
      <InvoiceForm 
        bill={editingInvoice}
        onSubmit={handleFormSubmit}
        onBack={handleBackToList}
        isEditing={!!editingInvoice}
      />
    );
  }

  return (
    <div className="bill-list-container">
      {/* Header Section */}
      <div className="bill-list-header">
        <div className="header-title">
          <h1>Bill Management</h1>
          <p>Create, manage and track your bills</p>
        </div>
        <button className="btn btn-primary add-bill-btn" onClick={handleAddInvoice}>
          <span className="btn-icon">+</span>
          Create bill
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{bills.length}</div>
          <div className="stat-label">Total Bills</div>
        </div>
        <div className="stat-card stat-paid">
          <div className="stat-value">${paidAmount.toLocaleString()}</div>
          <div className="stat-label">Payable Amount</div>
        </div>
        <div className="stat-card stat-pending">
          <div className="stat-value">${pendingAmount.toLocaleString()}</div>
          <div className="stat-label">Amount Paid</div>
        </div>
        <div className="stat-card stat-overdue">
          <div className="stat-value">${overdueAmount.toLocaleString()}</div>
          <div className="stat-label">Overdue Amount</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bill-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search bills..."
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
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* bill List */}
      <div className="bill-list-section">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading bills...</p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h3>No bills found</h3>
            <p>
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filters"
                : "Get started by creating your first bill"
              }
            </p>
            {!searchTerm && filterStatus === "all" && (
              <button className="btn btn-primary" onClick={handleAddInvoice}>
                Create Your First bill
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="bill-table">
              <div className="table-header">
                <div className="header-cell">Bill #</div>
                <div className="header-cell">Vendor</div>
                <div className="header-cell">Amount</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Issue Date</div>
                <div className="header-cell">Due Date</div>
                <div className="header-cell">Actions</div>
              </div>

              {/* Table Body */}
              <div className="table-body">
                {filteredInvoices.map((bill) => (
                  <div key={bill.id} className={`table-row ${isOverdue(bill) ? 'row-overdue' : ''}`}>
                    <div className="table-cell">
                      <div className="bill-info">
                        <div className="bill-number">{bill.invoiceNumber}</div>
                        <div className="bill-description">{bill.description}</div>
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="customer-info">
                        <div className="customer-name">{bill.customerName}</div>
                        <div className="company-name">{bill.companyName}</div>
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="bill-amount">
                        ${bill.amount.toLocaleString()}
                      </div>
                    </div>
                    <div className="table-cell">
                      <select
                        value={bill.status}
                        onChange={(e) => handleStatusChange(bill.id, e.target.value)}
                        className={`status-select ${getStatusClass(bill.status)}`}
                      >
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>
                    <div className="table-cell">
                      <div className="date-info">
                        {formatDate(bill.issueDate)}
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className={`date-info ${isOverdue(bill) ? 'date-overdue' : ''}`}>
                        {formatDate(bill.dueDate)}
                        {isOverdue(bill) && <span className="overdue-indicator">!</span>}
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleEditInvoice(bill)}
                          title="Edit bill"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => window.print()}
                          title="Print bill"
                        >
                          Print
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteInvoice(bill.id)}
                          title="Delete bill"
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
              Showing {filteredInvoices.length} of {bills.length} bills
              <span className="total-amount">
                Total: ${filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillList;