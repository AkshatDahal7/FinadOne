import React from 'react';

const Invoice = () => {
  const invoiceData = {
    invoiceNumber: 'INV-00123',
    date: '2025-06-20',
    company: {
      name: 'FinVault Pvt. Ltd.',
      address: '123 Finance St, Kathmandu, Nepal',
      email: 'support@finvault.com',
    },
    client: {
      name: 'Akshat Dahal',
      address: '456 Client Rd, Pokhara, Nepal',
      email: 'akshat@example.com',
    },
    items: [
      { description: 'Website Design', quantity: 1, rate: 500 },
      { description: 'Hosting (1 year)', quantity: 1, rate: 100 },
      { description: 'Maintenance', quantity: 6, rate: 50 },
    ],
  };

  const calculateTotal = () =>
    invoiceData.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);

  return (
    <div style={styles.invoice}>
      <h1>Invoice</h1>
      <div style={styles.section}>
        <strong>Invoice #: </strong>{invoiceData.invoiceNumber}<br />
        <strong>Date: </strong>{invoiceData.date}
      </div>

      <div style={styles.section}>
        <h3>From:</h3>
        <p>{invoiceData.company.name}<br />
        {invoiceData.company.address}<br />
        {invoiceData.company.email}</p>

        <h3>To:</h3>
        <p>{invoiceData.client.name}<br />
        {invoiceData.client.address}<br />
        {invoiceData.client.email}</p>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.rate}</td>
              <td>${item.quantity * item.rate}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td><strong>${calculateTotal()}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  invoice: {
    fontFamily: 'Arial',
    maxWidth: 800,
    margin: '20px auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 10,
    background: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 20,
  },
  th: {
    background: '#eee',
    padding: 10,
    borderBottom: '1px solid #ccc',
  },
  td: {
    padding: 10,
    borderBottom: '1px solid #eee',
  },
};

export default Invoice;
