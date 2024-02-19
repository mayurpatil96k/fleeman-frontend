import React from 'react';
import html2pdf from 'html2pdf.js';

class PDFGenerator extends React.Component {
  constructor(props) {
    super(props);
    // Retrieve and parse session data
    this.carData = JSON.parse(sessionStorage.getItem('carData'));
    this.invoiceDetails = JSON.parse(sessionStorage.getItem('invoiceDetails'));
    this.customerData = JSON.parse(sessionStorage.getItem('customerData'));
    this.rentalAmount = sessionStorage.getItem('rentalAmount');
    this.selectedInvoice = JSON.parse(sessionStorage.getItem('selectedInvoice'));
    this.totalamount = sessionStorage.getItem('totalamount');
    this.totalAmountfffff = sessionStorage.getItem('totalAmountfffff');
  }

  formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  generatePDF = () => {
    const content = document.createElement('div');

    // Add India Drive heading
    const heading = document.createElement('h1');
    heading.textContent = 'India Drive';
    content.appendChild(heading);

    // Add customer details table
    const customerTable = document.createElement('table');
    customerTable.style.width = '100%';
    customerTable.style.borderCollapse = 'collapse';
    customerTable.style.border = '1px solid black';

    const addRow = (data) => {
      const row = customerTable.insertRow();
      const cell1 = row.insertCell();
      const cell2 = row.insertCell();
      cell1.style.border = '2px solid black';
      cell2.style.border = '2px solid black';
      cell1.textContent = data[0];
      cell2.textContent = data[1];
    };

    addRow(['Customer ID:', this.customerData.customerId]);
    addRow(['Name:', `${this.customerData.firstName} ${this.customerData.lastName}`]);
    addRow(['Email:', this.customerData.email]);
    addRow(['Address:', `${this.customerData.addressLine1}, ${this.customerData.addressLine2}, ${this.customerData.city}`]);
    addRow(['Pincode:', this.customerData.pincode]);
    addRow(['Phone Number:', this.customerData.phoneNumber]);
    addRow(['Mobile Number:', this.customerData.mobileNumber]);

    content.appendChild(customerTable);

    // Add car details table
    const carTable = document.createElement('table');
    carTable.style.width = '100%';
    carTable.style.borderCollapse = 'collapse';
    carTable.style.border = '1px solid black';

    addRow(['Car Name:', this.carData.carName]);
    addRow(['Car Type:', this.carData.carType.carTypeName]);
    addRow(['Number Plate:', this.carData.numberPlate]);

    content.appendChild(carTable);

    // Add invoice details table
    const invoiceTable = document.createElement('table');
    invoiceTable.style.width = '100%';
    invoiceTable.style.borderCollapse = 'collapse';
    invoiceTable.style.border = '1px solid black';

    addRow(['Invoice ID:', this.selectedInvoice.invoiceId]);
    addRow(['Booking ID:', this.selectedInvoice.bookid]);
    addRow(['Rental Amount:', this.rentalAmount]);
    addRow(['Total Addon Amount:', this.totalamount]);
    addRow(['Total Amount:', this.totalAmountfffff]);

    content.appendChild(invoiceTable);

    // Configuring options for html2pdf
    const options = {
      margin: 10,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Generating PDF using html2pdf
    html2pdf(content, options);
  };

  render() {
    return (
      <div style={{ height: '49vh' }}>
        <h1>PDF Generator</h1>
        <button onClick={this.generatePDF}>Generate PDF</button>
      </div>
    );
  }
}

export default PDFGenerator;
