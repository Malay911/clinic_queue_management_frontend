import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logoutService } from '../services/authService';
import { useAuth } from '../context/AuthProvider';

const ReceptionistLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutAuth } = useAuth();
  
  const handleLogout = () => {
    logoutService();
    logoutAuth();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ boxShadow: 'none' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mr: 2 }}>
              Clinic Queue
            </Typography>
            {user?.clinicName && (
              <Typography variant="body2" sx={{ mr: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
                {user.clinicName}
              </Typography>
            )}
            {user?.role && (
              <Chip 
                label={user.role} 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white',
                  height: '24px',
                  fontSize: '0.75rem'
                }} 
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/receptionist')} 
              sx={{ 
                textTransform: 'none',
                backgroundColor: location.pathname === '/receptionist' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderRadius: '8px'
              }}
            >
              Queue (manage)
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/receptionist/tv-display')} 
              sx={{ 
                textTransform: 'none',
                backgroundColor: location.pathname === '/receptionist/tv-display' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderRadius: '8px'
              }}
            >
              TV display
            </Button>
            <Button 
              onClick={handleLogout}
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                textTransform: 'none',
                borderRadius: '8px',
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ReceptionistLayout;
