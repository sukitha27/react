import './App.css';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './Components/HomePage/HomePage'; // Import HomePage component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for the LoginSignup component */}
        <Route path="/" element={<LoginSignup />} />

        {/* Define the route for the HomePage component */}
        <Route path="/home" element={<HomePage />} />

        {/* Redirect to the LoginSignup page if no route matches */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
