import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function ProtectedRoute({children, allowedRoles = []}) {
    const {loading, isAuthenticated, user} = useAuth();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        if (user?.role === 'patient') return <Navigate to="/patient" replace />;
        if (user?.role === 'doctor') return <Navigate to="/doctor" replace />;
        if (user?.role === 'receptionist') return <Navigate to="/receptionist" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;