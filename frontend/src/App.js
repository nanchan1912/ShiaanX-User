import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Enquiries from './pages/Enquiries';
import CreateEnquiry from './pages/CreateEnquiry';
import EditEnquiry from './pages/EditEnquiry';
import EnquiryDetails from './pages/EnquiryDetails';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import TrackOrder from './pages/TrackOrder';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/layout/ProtectedRoute';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes wrapped in MainLayout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/enquiries/new" element={<CreateEnquiry />} />
          <Route path="/enquiries/edit/:id" element={<EditEnquiry />} />
          <Route path="/enquiries/:id" element={<EnquiryDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/orders/:id/track" element={<TrackOrder />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
