import React from 'react';
import html2pdf from 'html2pdf.js';

class PDFGenerator extends React.Component {
  generatePDF = () => {
    // Assume sessionData contains your JSON data
    const sessionData = JSON.parse(sessionStorage.getItem('yourSessionKey'));

    // Creating a string to represent the data in a human-readable form
    let dataString = '';
    for (const key in sessionData) {
      dataString += `${key}: ${sessionData[key]}\n`;
    }

    // Creating a HTML element to convert to PDF
    const content = document.createElement('div');
    content.innerText = dataString;

    // Configuring options for html2pdf
    const options = {
      margin: 10,
      filename: 'session_data.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Generating PDF using html2pdf
    html2pdf(content, options);
  };

  render() {
    return (
      <div style={{height:'49vh'}}>
        <h1>PDF Generator</h1>
        <button onClick={this.generatePDF}>Generate PDF</button>
      </div>
    );
  }
}

export default PDFGenerator;