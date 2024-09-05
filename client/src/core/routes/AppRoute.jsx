import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../../modules/start/submodules/auth/pages/LoginPage';
import DashboardLayout from '../layouts/DashboardLayout';
import { PublicRoute } from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { HomePage } from '../../modules/dashboard/pages/HomePage';
import RegisterPage from '../../modules/start/submodules/auth/pages/RegisterPage';

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoute;
