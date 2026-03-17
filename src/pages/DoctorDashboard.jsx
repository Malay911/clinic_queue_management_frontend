import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, Box } from '@mui/material';
import { getDoctorQueue } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [queue, setQueue] = useState([]);
  const navigate = useNavigate();

  const fetchQueue = async () => {
    const data = await getDoctorQueue();
    if (Array.isArray(data)) {
      setQueue(data);
    } else {
      setQueue([]);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        Today's Queue
      </Typography>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 1, border: '1px solid #ddd', boxShadow: 'none' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="queue table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Token</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Patient</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Appointment ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#555' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queue.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    {item.tokenNumber}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    {item.patientName}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    <Chip 
                      label={item.status} 
                      size="small" 
                      sx={{ 
                        backgroundColor: item.status === 'in_progress' ? '#e0e7ff' : '#e2e8f0', 
                        color: item.status === 'in_progress' ? '#3730a3' : '#333',
                        fontWeight: '500',
                        fontSize: '0.75rem',
                        height: '24px'
                      }} 
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    {item.appointmentId}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => navigate(`/doctor/prescription?appointmentId=${item.appointmentId}`)}
                        sx={{ 
                          textTransform: 'none',
                          boxShadow: 'none',
                          borderRadius: '4px'
                        }}
                      >
                        Add medicine
                      </Button>
                      <Button 
                        variant="contained" 
                        size="small"
                        color="secondary"
                        onClick={() => navigate(`/doctor/report?appointmentId=${item.appointmentId}`)}
                        sx={{ 
                          backgroundColor: '#e2e8f0',
                          color: '#333',
                          textTransform: 'none',
                          boxShadow: 'none',
                          borderRadius: '4px',
                          '&:hover': { backgroundColor: '#cbd5e1', boxShadow: 'none' }
                        }}
                      >
                        Add report
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              
              {queue.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3, color: '#888' }}>
                    No patients in today's queue.
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

export default DoctorDashboard;
