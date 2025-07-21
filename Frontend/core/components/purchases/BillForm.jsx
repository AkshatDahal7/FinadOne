import React, { useState } from 'react';
import './billForm.css'; 

const BillForm = () => {
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

    const bill = await fetch("http://localhost:4000/purchases/bill",{
      method : "POST",
      group : "application/json",
      body : JSON.stringify(formData) 
  })
    if(!bill.ok) throw new Error("Bill not saved");
    const data = await bill.json();
    alert("Bill has been saved :"+ data._id)
    console.log('bill submitted:', formData);


    // You can now send this data to your backend or state manager
  };

  return (
    <div className="bill-list-container">
      <div className='form-header'>

      <h2>Bill Details</h2>
      </div>

        <div className='main-form-section'>
        <div className='form-group'>

        <div className="form-group">

        <div className='form-title'>

        <label>Bill Number</label>
        </div>
        <div className='form-input'>

        <input
          type="text"
          value={formData.invoiceNumber}
          onChange={e => handleChange('invoiceNumber', e.target.value)}
          />
        </div>
          </div>
        </div>

      <div className="form-group">
        <div className='form-title'>

        <label>Vendor Name</label>
        </div>
        <div className='form-input'>

        <input
          type="text"
          value={formData.customerName}
          onChange={e => handleChange('customerName', e.target.value)}
        />
        </div>
      </div>

      <div className="form-group">
        <div className='form-title'>

        <label>Company Name</label>
        </div>
        <div className='form-input'>

        <input
          type="text"
          value={formData.companyName}
          onChange={e => handleChange('companyName', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <div className='form-title'>

        <label>Amount</label>
        </div>
        <div className='form-input'>

        <input
          type="number"
          value={formData.amount}
          onChange={e => handleChange('amount', e.target.value)}
        />
        </div>
      </div>

      <div className="form-group">
        <div className='form-title'>

        <label>Status</label>
        </div>
        <div className='form-input'>

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
      </div>

      <div className="form-group">
        <div className='form-title'>

        <label>Issue Date</label>
        </div>
        <div className='form-input'>

        <input
          type="date"
          value={formData.issueDate}
          onChange={e => handleChange('issueDate', e.target.value)}
        />
        </div>
      </div>

      <div className="form-group">
        <div className='form-title'>
        <label>Due Date</label>
        </div>
        <div className='form-input'>
        <input
          type="date"
          value={formData.dueDate}
          onChange={e => handleChange('dueDate', e.target.value)}
        />
        </div>
      </div>

      <div className="form-group">
        <label>Payment Date</label>
        <div className='form-input'>

        <input
          type="date"
          value={formData.paymentDate}
          onChange={e => handleChange('paymentDate', e.target.value)}
        />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <div className='form-textarea'>

        <textarea
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
        ></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Save Bill</button>
          </div>
      </div>
    </div>
  );
};

export default BillForm;
