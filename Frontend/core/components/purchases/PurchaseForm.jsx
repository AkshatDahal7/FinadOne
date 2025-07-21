import React, { useState } from 'react';
import "../sales/CustomerForm.css"

const VendorForm = () => {
  const [activeTab, setActiveTab] = useState('other-details');
  const [formData, setFormData] = useState({
    vendorType: 'business',
    firstName: '',
    lastName: '',
    displayName: '',
    salutation: '',
    companyName: '',
    taxRate: '',
    currency: '',
    paymentTerms: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    contactPersons: [],
    reportingTags: [],
    remarks: '',
    email: '',
    workPhone: '',
    mobile: ''
  });

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
        <button className="btn btn-primary" type="button">Add Contact Person</button>
      </div>
      <div className="empty-state">
        <p>No contact persons added yet</p>
        <p>Click "Add Contact Person" to get started</p>
      </div>
    </div>
  );

  const renderCustomFields = () => (
    <div className="tab-content">
      <div className="contact-person-header">
        <h3>Custom Fields</h3>
        <button className="btn btn-primary" type="button">Add Custom Field</button>
      </div>
      <div className="empty-state">
        <p>No custom fields configured</p>
        <p>Add custom fields to capture additional information</p>
      </div>
    </div>
  );

  const renderReportingTags = () => (
    <div className="tab-content">
      <h3>Reporting Tags</h3>
      <div className="form-group">
        <label className="form-label">Tags:</label>
        <input type="text" className="form-input" placeholder="Enter tags separated by commas" value={formData.reportingTags.join(',')} onChange={(e) => handleInputChange('reportingTags', e.target.value.split(','))} />
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Tags help you categorize and filter vendors for reporting purposes.
        </p>
      </div>
    </div>
  );

  const renderRemarks = () => (
    <div className="tab-content">
      <h3>Internal Notes</h3>
      <div className="form-group">
        <label className="form-label">Notes:</label>
        <textarea className="form-textarea" rows="6" placeholder="Add any internal notes or remarks about this Vendor..." value={formData.remarks} onChange={(e) => handleInputChange('remarks', e.target.value)}></textarea>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'other-details': return renderOtherDetails();
      case 'address': return renderAddress();
      case 'contact-persons': return renderContactPersons();
      case 'custom-fields': return renderCustomFields();
      case 'reporting-tags': return renderReportingTags();
      case 'remarks': return renderRemarks();
      default: return renderOtherDetails();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const vendor = await fetch("http://localhost:4000/purchases/vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!vendor.ok) throw new Error("Failed to save vendor");
      const data = await vendor.json();
      alert("Saved vendor " + data._id);
      // Reset form if needed
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="customer-form-container">
        <div className="form-header">
          <h1 className="form-title">Vendor Information</h1>
        </div>
        <div className="main-form-section">
          <h2 className="section-title">Primary Details</h2>
          <div className="form-group">
            <label className="form-label">Vendor Type <span className="info-icon">ⓘ</span></label>
            <div className="radio-group">
              <div className="radio-item">
                <input type="radio" name="vendorType" value="business" className="radio-input" checked={formData.vendorType === 'business'} onChange={(e) => handleInputChange('vendorType', e.target.value)} />
                <span className="radio-label">Business</span>
              </div>
              <div className="radio-item">
                <input type="radio" name="vendorType" value="individual" className="radio-input" checked={formData.vendorType === 'individual'} onChange={(e) => handleInputChange('vendorType', e.target.value)} />
                <span className="radio-label">Individual</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Primary Contact <span className="info-icon">ⓘ</span></label>
            <div className="form-group-grid">
              <select className="form-select" value={formData.salutation} onChange={(e) => handleInputChange('salutation', e.target.value)}>
                <option value="">Select Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
              </select>
              <input type="text" className="form-input" placeholder="First Name" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
              <input type="text" className="form-input" placeholder="Last Name" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Company Name:</label>
            <input type="text" className="form-input" placeholder="Enter company name" value={formData.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label required">Display Name* <span className="info-icon">ⓘ</span></label>
            <select className={`form-select ${!formData.displayName ? 'error' : ''}`} value={formData.displayName} onChange={(e) => handleInputChange('displayName', e.target.value)}>
              <option value="">Select or type to add</option>
              <option>Company Name</option>
              <option>Full Name</option>
              <option>First Name Only</option>
            </select>
            {!formData.displayName && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                Enter the Display Name of your Vendor
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Email Address <span className="info-icon">ⓘ</span></label>
            <input type="email" className="form-input" placeholder="Enter email address" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone <span className="info-icon">ⓘ</span></label>
            <div className="form-group-inline">
              <input type="tel" className="form-input" placeholder="Work Phone" value={formData.workPhone} onChange={(e) => handleInputChange('workPhone', e.target.value)} />
              <input type="tel" className="form-input" placeholder="Mobile" value={formData.mobile} onChange={(e) => handleInputChange('mobile', e.target.value)} />
            </div>
          </div>
        </div>
        <div className="tab-section">
          <div className="tab-navigation">
            {tabs.map((tab) => (
              <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>
        <div className="action-buttons">
          <button className="btn btn-secondary">Cancel</button>
          <button type="submit" className="btn btn-primary">Save Vendor</button>
        </div>
      </div>
    </form>
  );
};

export default VendorForm;
