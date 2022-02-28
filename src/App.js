import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/registeration/Registration";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      <div className="app">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login/registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
