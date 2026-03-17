import React from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        Patient Dashboard
      </Typography>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 1, 
          border: '1px solid #ddd', boxShadow: 'none' 
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Use the menu to book an appointment, view your appointments, prescriptions, or medical reports.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/patient/book')}
            sx={{ 
              backgroundColor: '#1976d2', 
              '&:hover': { backgroundColor: '#115293' },
              textTransform: 'none',
              boxShadow: 'none'
            }}
          >
            Book Appointment
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/patient/appointments')}
            sx={{ 
              backgroundColor: '#e2e8f0', 
              color: '#333',
              '&:hover': { backgroundColor: '#cbd5e1' },
              textTransform: 'none',
              boxShadow: 'none'
            }}
          >
            My Appointments
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/patient/prescriptions')}
            sx={{ 
              backgroundColor: '#e2e8f0', 
              color: '#333',
              '&:hover': { backgroundColor: '#cbd5e1' },
              textTransform: 'none',
              boxShadow: 'none'
            }}
          >
            My Prescriptions
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/patient/reports')}
            sx={{ 
              backgroundColor: '#e2e8f0', 
              color: '#333',
              '&:hover': { backgroundColor: '#cbd5e1' },
              textTransform: 'none',
              boxShadow: 'none'
            }}
          >
            My Reports
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PatientDashboard;
