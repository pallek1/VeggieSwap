import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VeggieMarket from './pages/VeggieMarket';
import BrowseVeggies from './pages/BrowseVeggies'; // ✅ New import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<VeggieMarket />} />
        <Route path="/browse" element={<BrowseVeggies />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
