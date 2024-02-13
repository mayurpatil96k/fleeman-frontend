import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from './components/AboutUs';
import CustomerCare from './components/CustomerCare';
import Modify from './components/Modify';
import Car from "./Cars";
import CustomerForm from "./Register";
import LoginComponent from "./Loginform";
import AffiliatedHotels from './components/AffilatedHotels';
import WeatherRedirect from './components/Weather';
import CareerPage from './components/Carrear';
import AddonList from "./Addon";
import HubSelectionForm from "./Hub";
import BookingForm from "./BookingForm";

const App = () => {
  sessionStorage.setItem('isLoggedIn', false);
    return (
      <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/LoginComponent" element={<LoginComponent/>} />
          <Route path="/" element={<LoginComponent/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Modify" element={<Modify/>} />
          <Route path="/CustomerForm" element={<CustomerForm/>} />
          <Route path="/AffiliatedHotels" element={<AffiliatedHotels/>} />
          <Route path="/WeatherRedirect" element={<WeatherRedirect/>} />
          <Route path="/CareerPage" element={<CareerPage/>} />
          <Route path="/Car" element={<Car/>} />
          <Route path="/BookingForm" element={<BookingForm/>} />
          <Route path="/HubSelectionForm" element={<HubSelectionForm/>} />
          <Route path="/CustomerCare" element={<CustomerCare/>} />
          <Route path="/AddonList" element={<AddonList/>} />
          {/* Add more routes here for other components/pages */}
        </Routes>
        <Footer />
      </div>
    </Router>
    );
};

export default App;
