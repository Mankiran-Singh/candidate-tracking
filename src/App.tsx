import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
const DashboardComponent = React.lazy(() => import('./dashboard/dashboard'));
const SignUpComponent = React.lazy(() => import('./auth/sign-up/sign-up'));
const LoginComponent = React.lazy(() => import('./auth/login/login'));
function App() {
  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/sign-up" />}
          />
          <Route
            path="/dashboard"
            element={
              <React.Suspense fallback={<div>Loading Dashboard...</div>}>
                <DashboardComponent />
              </React.Suspense>
            }
          />
          <Route
            path="/sign-up"
            element={
              <React.Suspense fallback={<div>Loading Sign Up...</div>}>
                <SignUpComponent />
              </React.Suspense>
            }
          />
            <Route
            path="/login"
            element={
              <React.Suspense fallback={<div>Loading Login...</div>}>
                <LoginComponent/>
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
