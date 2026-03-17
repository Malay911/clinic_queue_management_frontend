import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { getClinicInfo } from '../services/adminService';
import { useAuth } from '../context/AuthProvider';

const Dashboard = () => {
  const [clinicData, setClinicData] = useState(null);
  const { user } = useAuth();

  const fetchClinic = async () => {
    const data = await getClinicInfo();
    if (data && !data.error) {
      setClinicData(data);
    } else {
      setClinicData({ error: 'Failed to load clinic data' });
    }
  };

  useEffect(() => {
    fetchClinic();
  }, []);

  if (!clinicData) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (clinicData.error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography color="error">{clinicData.error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        My Clinic
      </Typography>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 1, 
          border: '1px solid #ddd', boxShadow: 'none' 
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          {clinicData.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
            Clinic code:
          </Typography>
          <Box 
            component="span" 
            sx={{ 
              backgroundColor: '#d0e3ff', 
              color: '#000', 
              px: 1, 
              py: 0.5, 
              borderRadius: 1,
              fontFamily: 'monospace'
            }}
          >
            {clinicData.code}
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Share this code with patients, doctors, and receptionists so they can register and join your clinic.
        </Typography>

        <Typography variant="body2" sx={{ color: '#555' }}>
          Users: {clinicData.userCount} · Appointments: {clinicData.appointmentCount}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;
