
import "./App.css";
import Header from "./Header";
import LoginComponent from "./Loginform";
import CustomerForm from "./Register";


function App() {
  return (
    <div>
      <Header/>
      <CustomerForm /> 
      <LoginComponent/>
    </div>
  );
}

export default App;
