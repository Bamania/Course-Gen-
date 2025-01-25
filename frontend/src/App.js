import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard/Index';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SelectTopic from './Components/SelectTopic';

function App() {
  return (
  <Router>
        <Routes>
          
          <Route path="/" element={<Dashboard/>} />
          <Route path="/selectTopic" element={<SelectTopic/>} />
          {/* <Route path="/orderdetails/:orderId" element={<OrderDetails/>} /> */}
        </Routes>
      </Router>
  );
}

export default App;
