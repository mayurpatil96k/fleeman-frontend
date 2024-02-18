// import React from 'react';

// const AboutUs = () => {
//     return (
//         <div className="container">
//             <h2>About Us</h2>
//             <p>Welcome to our Fleet Management App! We are dedicated to providing innovative solutions for managing your fleet of vehicles efficiently and effectively.</p>
//             <p>Our goal is to streamline the process of tracking, maintaining, and optimizing your fleet, helping you save time and resources while maximizing productivity and performance.</p>
//             <p>With our user-friendly interface and robust features, you can easily monitor vehicle locations, schedule maintenance tasks, analyze performance metrics, and much more.</p>
//             <p>Whether you're a small business with a few vehicles or a large corporation with an extensive fleet, our app is designed to meet your needs and exceed your expectations.</p>
//             <p>Thank you for choosing our Fleet Management App. We look forward to serving you and helping you achieve your fleet management goals.</p>
//         </div>
//     );
// };

// export default AboutUs;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

function AboutUs() {
  const [showHistory, setShowHistory] = useState(false);
  const [showFinancialResults, setShowFinancialResults] = useState(false);
  const [showManagement, setShowManagement] = useState(false);

  return (
    <div style={{ padding: "90px" }}>
      <h1 style={{ marginBottom: "50px",textAlign:'center' }}>About Us</h1>

      {/* History Section */}
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", position: 'relative' }}>
        <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setShowHistory(!showHistory)}>
          <span>History and Milestones</span>
          <FontAwesomeIcon icon={showHistory ? faAngleUp : faAngleDown} />
        </h2>
        {showHistory && (
          <div>
            <p><p>Welcome to IndiaDrive, where the journey began with a vision to revolutionize the way people experience transportation. Established in the bustling city of Mumbai, our company has navigated the roads of innovation and excellence since its inception.
            <br></br>
            <br></br><h5 >Milestones Achieved:</h5>
            <b>[2019]:</b> IndiaDrive was founded with the mission to provide convenient and reliable transportation solutions to the people of India.
            <br></br><b>[2020]:</b> Launched our first fleet of vehicles, marking the beginning of our commitment to quality service.
            <br></br><b>[2021]:</b> Expanded our services to various cities, connecting communities and enhancing mobility nationwide.
            <br></br><b>[2022]:</b> Introduced cutting-edge technology to streamline booking processes and improve the overall user experience.
            <br></br><b>[2023]:</b> Achieved a significant milestone in the number of satisfied customers, earning their trust and loyalty.
            <br></br>As we look back at our history, we take pride in the journey that has shaped us into a leading player in the transportation industry.</p></p>
            {/* You can add dropdowns or any additional content here */}
          </div>
        )}
      </div>

      {/* Financial Results Section */}
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", position: 'relative' }}>
        <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setShowFinancialResults(!showFinancialResults)}>
          <span>Financial Results</span>
          <FontAwesomeIcon icon={showFinancialResults ? faAngleUp : faAngleDown} />
        </h2>
        {showFinancialResults && (
          <div>
            <p><p>At IndiaDrive, transparency and financial stability are paramount. Our latest balance sheet reflects our commitment to fiscal responsibility and sustainable growth.

<br></br><br></br><h5>Financial Highlights:</h5>
<b>Revenue:</b> Demonstrating consistent growth, our revenue has increased steadily over the years, showcasing the demand for our services.
<br></br><b>Profitability:</b> IndiaDrive has maintained a healthy profit margin, ensuring financial sustainability and the ability to reinvest in service enhancements.
<br></br><b>Investments:</b> We strategically allocate resources to research and development, technology upgrades, and expansion initiatives to stay ahead in the competitive landscape.
<br></br>Our dedication to financial prudence ensures that we can continue to provide top-notch services and contribute positively to the transportation ecosystem.</p></p>
            {/* You can add dropdowns or any additional content here */}
          </div>
        )}
      </div>

      {/* Management Section */}
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", position: 'relative' }}>
        <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setShowManagement(!showManagement)}>
          <span>Management</span>
          <FontAwesomeIcon icon={showManagement ? faAngleUp : faAngleDown} />
        </h2>
        {showManagement && (
          <div>
            <p><p>Meet the visionary leaders steering IndiaDrive toward success.

<br></br><br></br><h5>Board of Directors:</h5>
<b>[Mayur patil]</b> Founder and Chief Executive Officer - With a passion for innovation, 
<br></br><b>[Sanjay singh]</b> has been the driving force behind IndiaDrive since its inception. Their visionary leadership has shaped the company's trajectory.
<br></br><b>[Ritik modi]</b> Chief Operating Officer - Responsible for overseeing daily operations, 
<br></br><b>[Aditya javalikar]</b> brings a wealth of experience in optimizing service efficiency and ensuring customer satisfaction.
<br></br><b>[Tripti jain]</b> Chief Financial Officer - A seasoned financial expert,
<br></br><b>[Karan Bali]</b>manages the financial health of IndiaDrive, implementing strategies for sustainable growth and success.
<br></br>Our leadership team comprises individuals with diverse expertise, united by a common goal: to redefine the transportation experience for millions of Indians.

<br></br>IndiaDrive is more than just a transportation service – it's a journey of progress, reliability, and customer-centricity. Join us as we continue to drive India forward!</p></p>
            {/* You can add dropdowns or any additional content here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutUs;