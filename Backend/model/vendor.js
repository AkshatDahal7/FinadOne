const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  customerType: {
    type: String,
    enum: ['business', 'individual'],
    default: 'business'
  },
  firstName: String,
  lastName: String,
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: /.+\@.+\..+/
  },
  workPhone: String,
  mobile: String,
  companyName: String,
  salutation: {
    type: String,
    enum: ['Mr.', 'Ms.', 'Mrs.', 'Dr.']
  },
  taxRate: {
    type: String,
    enum: ['Standard Rate (10%)', 'Reduced Rate (5%)', 'Zero Rate (0%)']
  },
  currency: {
    type: String,
    enum: ['USD - US Dollar', 'EUR - Euro', 'GBP - British Pound']
  },
  paymentTerms: {
    type: String,
    enum: ['Net 30', 'Net 15', 'Due on Receipt']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  contactPersons: [
    {
      name: String,
      email: {
        type: String,
        match: /.+\@.+\..+/
      },
      phone: String
    }
  ],
  customFields: [
    {
      label: String,
      value: String
    }
  ],
  reportingTags: [String],
  remarks: {
    type: String,
    maxlength: 1000
  }
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
