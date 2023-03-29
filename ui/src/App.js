import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard';
import Questionary from './views/Questionary';

import { useUserContext } from './UserContext';
import './App.css'
import QuestionaryAnswers from './views/QuestionaryAnswers';


function App() {
  const { user } = useUserContext();

  return (
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/answers" element={<QuestionaryAnswers />} />
          <Route path="/questionary" element={<Questionary />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;
