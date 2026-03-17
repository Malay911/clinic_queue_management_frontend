import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMyAppointments } from '../services/patientService';
import { useAuth } from '../context/AuthProvider';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    if (user && user.role === 'patient') {
      const data = await getMyAppointments();
      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        setAppointments([]);
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        My Appointments
      </Typography>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 1, border: '1px solid #ddd', boxShadow: 'none' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="appointments table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Token</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    {formatDate(appt.appointmentDate)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    {appt.timeSlot}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    {appt.queueEntry?.tokenNumber || '-'}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    {appt.queueEntry?.status && (
                      <Chip 
                        label={appt.queueEntry.status} 
                        size="small" 
                        sx={{ 
                          backgroundColor: appt.queueEntry.status === 'waiting' ? '#fff3cd' : '#e2e8f0', 
                          color: appt.queueEntry.status === 'waiting' ? '#856404' : '#333',
                          fontWeight: '500',
                          fontSize: '0.75rem',
                          height: '24px'
                        }} 
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={() => navigate(`/patient/appointments/${appt.id}`)}
                      sx={{ 
                        backgroundColor: '#1976d2', 
                        '&:hover': { backgroundColor: '#115293' },
                        textTransform: 'none',
                        boxShadow: 'none',
                        borderRadius: '4px'
                      }}
                    >
                      Medicines & report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {appointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3, color: '#888' }}>
                    No appointments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default MyAppointments;
