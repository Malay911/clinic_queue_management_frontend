import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Chip, Button, List, ListItem, ListItemText } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentById } from '../services/patientService';

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  const fetchAppointment = async () => {
    const data = await getAppointmentById(id);
    if (data && !data.error) {
      setAppointment(data);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!appointment) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const status = appointment.queueEntry?.status || appointment.status || 'waiting';
  const token = appointment.queueEntry?.tokenNumber || '-';

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}>
        Appointment details
      </Typography>

      <Button 
        variant="contained"
        onClick={() => navigate('/patient/appointments')}
        sx={{ 
          mb: 3, 
          backgroundColor: '#e2e8f0', 
          color: '#333', 
          boxShadow: 'none',
          textTransform: 'none',
          borderRadius: 1,
          '&:hover': { backgroundColor: '#cbd5e1', boxShadow: 'none' }
        }}
      >
        ← Back to appointments
      </Button>

      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 1, border: '1px solid #ddd', boxShadow: 'none' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Appointment
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="body2" sx={{ color: '#333' }}>
            <span style={{ fontWeight: 'bold' }}>Date:</span> {formatDate(appointment.appointmentDate)} · <span style={{ fontWeight: 'bold' }}>Time:</span> {appointment.timeSlot}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: '#333', fontWeight: 'bold' }}>
              Token: 
            </Typography>
            <Typography variant="body2" sx={{ color: '#333', mr: 0.5 }}>
               {token} ·
            </Typography>
            <Typography variant="body2" sx={{ color: '#333', fontWeight: 'bold' }}>
               Status:
            </Typography>
            <Chip 
              label={status} 
              size="small" 
              sx={{ 
                backgroundColor: status === 'waiting' ? '#fef08a' : '#e2e8f0', 
                color: status === 'waiting' ? '#ca8a04' : '#333',
                fontWeight: '500',
                fontSize: '0.75rem',
                height: '22px'
              }} 
            />
          </Box>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 1, border: '1px solid #ddd', boxShadow: 'none' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Medicines (Prescription)
        </Typography>
        {(!appointment.prescription?.medicines && (!appointment.medicines || appointment.medicines.length === 0)) ? (
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            No prescription added for this appointment yet.
          </Typography>
        ) : (
          <Box>
            <List disablePadding>
              {(appointment.prescription?.medicines || appointment.medicines || []).map((med, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemText 
                    primary={`• ${med.name || med} ${med.dosage ? `- ${med.dosage}` : ''} ${med.duration ? `(${med.duration})` : ''}`} 
                    primaryTypographyProps={{ variant: 'body2', color: '#333' }}
                  />
                </ListItem>
              ))}
            </List>
            {(appointment.prescription?.notes || appointment.prescriptionNotes) && (
              <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                <strong>Notes:</strong> {appointment.prescription?.notes || appointment.prescriptionNotes}
              </Typography>
            )}
          </Box>
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 1, border: '1px solid #ddd', boxShadow: 'none' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Medical Report
        </Typography>
        {!appointment.report ? (
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            No report added for this appointment yet.
          </Typography>
        ) : (
          <Box>
            <Typography variant="body2" sx={{ color: '#333', mb: 1 }}>
              <strong>Diagnosis:</strong> {appointment.report.diagnosis || appointment.report}
            </Typography>
            {appointment.report.testRecommended && (
              <Typography variant="body2" sx={{ color: '#333', mb: 1 }}>
                <strong>Tests Recommended:</strong> {appointment.report.testRecommended}
              </Typography>
            )}
            {appointment.report.remarks && (
              <Typography variant="body2" sx={{ color: '#333' }}>
                <strong>Remarks:</strong> {appointment.report.remarks}
              </Typography>
            )}
          </Box>
        )}
      </Paper>

    </Container>
  );
};

export default AppointmentDetails;
