import React, { useState } from 'react';
import "../sales/CustomerForm.css"
const CustomerForm = () => {
  const [activeTab, setActiveTab] = useState('other-details');
  const [formData, setFormData] = useState({
    customerType: 'business',
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    workPhone: '',
    mobile: '',
    companyName: '',
    salutation: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    taxRate: '',
    currency: '',
    paymentTerms: '',
    reportingTags: [],
    remarks: '',
    contactPersons: [],
    customFields: []
  });

  const submitHandler = async(e) =>{
    e.preventDefault();
    if (!formData.salutation) {
    alert("Please select a salutation");
    return;
  }
    console.log("Submitting formData:", formData);
    try{
      const customer = await fetch("https://finadone.onrender.com/sales/customer",{
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(formData),
      });

      if(!customer.ok) throw new Error("Failed to save Customer!!")
      const data = await customer.json();
      alert("Customer saved" + data._id);

      setFormData({
        customerType: 'business',
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        workPhone: '',
        mobile: '',
        companyName: '',
        salutation: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: ''
        },
        taxRate: '',
        currency: '',
        paymentTerms: '',
        reportingTags: [],
        remarks: '',
        contactPersons: [],
        customFields: []
      });

    }
    catch(e){
      console.log(e);
    }
  }
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addContactPerson = () => {
    setFormData(prev => ({
      ...prev,
      contactPersons: [...prev.contactPersons, { name: '', email: '', phone: '' }]
    }));
  };

  const updateContactPerson = (index, field, value) => {
    const updated = [...formData.contactPersons];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, contactPersons: updated }));
  };

  const addCustomField = () => {
    setFormData(prev => ({
      ...prev,
      customFields: [...prev.customFields, { label: '', value: '' }]
    }));
  };

  const updateCustomField = (index, field, value) => {
    const updated = [...formData.customFields];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, customFields: updated }));
  };

  const tabs = [
    { id: 'other-details', label: 'Other Details' },
    { id: 'address', label: 'Address' },
    { id: 'contact-persons', label: 'Contact Persons' },
    { id: 'custom-fields', label: 'Custom Fields' },
    { id: 'reporting-tags', label: 'Reporting Tags' },
    { id: 'remarks', label: 'Remarks' }
  ];

  const renderOtherDetails = () => (
    <div className="tab-content">
      <h3>Other Details</h3>
      <div className="form-group">
        <label className="form-label">Tax Rate:</label>
        <select className="form-select" value={formData.taxRate} onChange={(e) => handleInputChange('taxRate', e.target.value)}>
          <option value="">Select a Tax</option>
          <option>Standard Rate (10%)</option>
          <option>Reduced Rate (5%)</option>
          <option>Zero Rate (0%)</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Currency:</label>
        <select className="form-select" value={formData.currency} onChange={(e) => handleInputChange('currency', e.target.value)}>
          <option value="">Select Currency</option>
          <option>USD - US Dollar</option>
          <option>EUR - Euro</option>
          <option>GBP - British Pound</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Payment Terms:</label>
        <select className="form-select" value={formData.paymentTerms} onChange={(e) => handleInputChange('paymentTerms', e.target.value)}>
          <option value="">Select Payment Terms</option>
          <option>Net 30</option>
          <option>Net 15</option>
          <option>Due on Receipt</option>
        </select>
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="tab-content">
      <h3>Address Information</h3>
      <div className="form-group-grid">
        <div className="form-group">
          <label className="form-label">Street Address:</label>
          <input type="text" className="form-input" placeholder="Enter street address" value={formData.address.street} onChange={(e) => handleNestedChange('address', 'street', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">City:</label>
          <input type="text" className="form-input" placeholder="Enter city" value={formData.address.city} onChange={(e) => handleNestedChange('address', 'city', e.target.value)} />
        </div>
      </div>
      <div className="form-group-grid">
        <div className="form-group">
          <label className="form-label">State/Province:</label>
          <input type="text" className="form-input" placeholder="Enter state/province" value={formData.address.state} onChange={(e) => handleNestedChange('address', 'state', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">ZIP/Postal Code:</label>
          <input type="text" className="form-input" placeholder="Enter ZIP/postal code" value={formData.address.zip} onChange={(e) => handleNestedChange('address', 'zip', e.target.value)} />
        </div>
      </div>
    </div>
  );

  const renderContactPersons = () => (
    <div className="tab-content">
      <div className="contact-person-header">
        <h3>Contact Persons</h3>
        <button className="btn btn-primary" type="button" onClick={addContactPerson}>Add Contact Person</button>
      </div>
      {formData.contactPersons.length === 0 ? (
        <div className="empty-state">
          <p>No contact persons added yet</p>
          <p>Click "Add Contact Person" to get started</p>
        </div>
      ) : (
        formData.contactPersons.map((person, index) => (
          <div key={index} className="form-group-grid">
            <input type="text" className="form-input" placeholder="Name" value={person.name} onChange={(e) => updateContactPerson(index, 'name', e.target.value)} />
            <input type="email" className="form-input" placeholder="Email" value={person.email} onChange={(e) => updateContactPerson(index, 'email', e.target.value)} />
            <input type="text" className="form-input" placeholder="Phone" value={person.phone} onChange={(e) => updateContactPerson(index, 'phone', e.target.value)} />
          </div>
        ))
      )}
    </div>
  );

  const renderCustomFields = () => (
    <div className="tab-content">
      <div className="contact-person-header">
        <h3>Custom Fields</h3>
        <button className="btn btn-primary" type="button" onClick={addCustomField}>Add Custom Field</button>
      </div>
      {formData.customFields.length === 0 ? (
        <div className="empty-state">
          <p>No custom fields configured</p>
          <p>Add custom fields to capture additional information</p>
        </div>
      ) : (
        formData.customFields.map((field, index) => (
          <div key={index} className="form-group-grid">
            <input type="text" className="form-input" placeholder="Label" value={field.label} onChange={(e) => updateCustomField(index, 'label', e.target.value)} />
            <input type="text" className="form-input" placeholder="Value" value={field.value} onChange={(e) => updateCustomField(index, 'value', e.target.value)} />
          </div>
        ))
      )}
    </div>
  );

  const renderReportingTags = () => (
    <div className="tab-content">
      <h3>Reporting Tags</h3>
      <div className="form-group">
        <label className="form-label">Tags:</label>
        <input type="text" className="form-input" placeholder="Enter tags separated by commas" value={formData.reportingTags.join(',')} onChange={(e) => handleInputChange('reportingTags', e.target.value.split(','))} />
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Tags help you categorize and filter customers for reporting purposes.
        </p>
      </div>
    </div>
  );

  const renderRemarks = () => (
    <div className="tab-content">
      <h3>Internal Notes</h3>
      <div className="form-group">
        <label className="form-label">Notes:</label>
        <textarea 
          className="form-textarea" 
          rows="6" 
          placeholder="Add any internal notes or remarks about this customer..."
          value={formData.remarks}
          onChange={(e) => handleInputChange('remarks', e.target.value)}
        ></textarea>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'other-details':
        return renderOtherDetails();
      case 'address':
        return renderAddress();
      case 'contact-persons':
        return renderContactPersons();
      case 'custom-fields':
        return renderCustomFields();
      case 'reporting-tags':
        return renderReportingTags();
      case 'remarks':
        return renderRemarks();
      default:
        return renderOtherDetails();
    }
  };
  

  return (
    <form onSubmit={submitHandler}>
    <div className="customer-form-container">
      <div className="form-header">
        <h1 className="form-title">Customer Information</h1>
      </div>

      {/* MAIN FORM SECTION */}
      <div className="main-form-section">
        <h2 className="section-title">Primary Details</h2>
        
        {/* Customer Type */}
        <div className="form-group">
          <label className="form-label">
            Customer Type <span className="info-icon">ⓘ</span>
          </label>
          <div className="radio-group">
            <div className="radio-item">
              <input 
                type="radio" 
                name="customerType" 
                value="business"
                className="radio-input"
                checked={formData.customerType === 'business'}
                onChange={(e) => handleInputChange('customerType', e.target.value)}
              />
              <span className="radio-label">Business</span>
            </div>
            <div className="radio-item">
              <input 
                type="radio" 
                name="customerType" 
                value="individual"
                className="radio-input"
                checked={formData.customerType === 'individual'}
                onChange={(e) => handleInputChange('customerType', e.target.value)}
              />
              <span className="radio-label">Individual</span>
            </div>
          </div>
        </div>

        {/* Primary Contact */}
        <div className="form-group">
          <label className="form-label">
            Primary Contact <span className="info-icon">ⓘ</span>
          </label>
          <div className="form-group-grid">
            <select className="form-select"
            value={formData.salutation}
            onChange={(e)=>handleInputChange('salutation',e.target.value

            )}
            >
              <option value="">Select Salutation</option>
              <option value = "Mr.">Mr.</option>
              <option value = "Ms.">Ms.</option>
              <option value = "Mrs.">Mrs.</option>
              <option value = "Dr.">Dr.</option>
            </select>
            <input 
              type="text" 
              className="form-input"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
            <input 
              type="text" 
              className="form-input"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </div>
        </div>

        {/* Company Name */}
        <div className="form-group">
          <label className="form-label">Company Name:</label>
          <input type="text" className="form-input" placeholder="Enter company name" />
        </div>

        {/* Display Name - Required */}
        <div className="form-group">
          <label className="form-label required">
            Display Name* <span className="info-icon">ⓘ</span>
          </label>
          <select 
            className={`form-select ${!formData.displayName ? 'error' : ''}`}
            value={formData.displayName}
            onChange={(e) => handleInputChange('displayName', e.target.value)}
          >
            <option value="">Select or type to add</option>
            <option>Company Name</option>
            <option>Full Name</option>
            <option>First Name Only</option>
          </select>
          {!formData.displayName && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              Enter the Display Name of your customer
            </div>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">
            Email Address <span className="info-icon">ⓘ</span>
          </label>
          <input 
            type="email"
            className="form-input"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        {/* Phone Numbers */}
        <div className="form-group">
          <label className="form-label">
            Phone <span className="info-icon">ⓘ</span>
          </label>
          <div className="form-group-inline">
            <input 
              type="tel" 
              className="form-input"
              placeholder="Work Phone"
              value={formData.workPhone}
              onChange={(e) => handleInputChange('workPhone', e.target.value)}
            />
            <input 
              type="tel" 
              className="form-input"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TAB SECTION */}
      <div className="tab-section">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* ACTION BUTTONS */}
      <div className="action-buttons">
        <button className="btn btn-secondary">Cancel</button>
        <button type = "submit" className="btn btn-primary">Save Customer</button>
      </div>
    </div>
    </form>
  );
};

export default CustomerForm;