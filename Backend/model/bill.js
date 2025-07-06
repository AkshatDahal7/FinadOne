const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  billNumber: {
    type: String,
    required: true,
    unique: true
  },
  vendorName: {
    type: String,
    required: true
  },
  companyName: String,
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid', 'overdue'],
    default: 'unpaid'
  },
  issueDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  paymentDate: Date,
  description: {
    type: String,
    maxlength: 1000
  }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
