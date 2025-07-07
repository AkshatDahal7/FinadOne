import React, { useState } from 'react';
import './CustomerForm.css'; // optional, like your customer form

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    customerName: '',
    companyName: '',
    amount: '',
    status: '',
    dueDate: '',
    issueDate: '',
    description: '',
    paymentDate: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Invoice submitted:', formData);
    try{
    const invoice = await fetch("http://localhost:4000/sales/invoice",{
      method: "POST",
      headers: "application/json",
      body: JSON.stringify(formData)
    })
    if(!invoice.ok) throw new Error("Invoice failed to save!");

    const data = await invoice.json();
      alert("Invoice saved" + data._id);
    setFormData({
    invoiceNumber: '',
    customerName: '',
    companyName: '',
    amount: '',
    status: '',
    dueDate: '',
    issueDate: '',
    description: '',
    paymentDate: ''
  })
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <div className="invoice-form">
      <h2>Invoice Details</h2>

      <div className="form-group">
        <label>Invoice Number</label>
        <input
          type="text"
          value={formData.invoiceNumber}
          onChange={e => handleChange('invoiceNumber', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Customer Name</label>
        <input
          type="text"
          value={formData.customerName}
          onChange={e => handleChange('customerName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          value={formData.companyName}
          onChange={e => handleChange('companyName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          value={formData.amount}
          onChange={e => handleChange('amount', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          value={formData.status}
          onChange={e => handleChange('status', e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="form-group">
        <label>Issue Date</label>
        <input
          type="date"
          value={formData.issueDate}
          onChange={e => handleChange('issueDate', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={e => handleChange('dueDate', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Payment Date</label>
        <input
          type="date"
          value={formData.paymentDate}
          onChange={e => handleChange('paymentDate', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
        ></textarea>
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Save Invoice</button>
      </div>
    </div>
  );
};

export default InvoiceForm;
