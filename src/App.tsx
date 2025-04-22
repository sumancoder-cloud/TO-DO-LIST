import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';
import Calendar from './components/Calendar';
import TimeTracking from './components/TimeTracking';
import Starred from './components/Starred';
import Tags from './components/Tags';
import Team from './components/Team';
import Analytics from './components/Analytics';
import Projects from './components/Projects';
import './App.css';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/tasks" replace />} />
          <Route path="tasks" element={<TodoList />} />
          <Route path="projects" element={<Projects />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="time-tracking" element={<TimeTracking />} />
          <Route path="starred" element={<Starred />} />
          <Route path="tags" element={<Tags />} />
          <Route path="team" element={<Team />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
