import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getMyPrescriptions } from '../services/patientService';

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async () => {
    const data = await getMyPrescriptions();
    if (Array.isArray(data)) {
      setPrescriptions(data);
    } else {
      setPrescriptions([]);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
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
        My Prescriptions
      </Typography>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 1, border: '1px solid #ddd', boxShadow: 'none' }}>
        {prescriptions.length === 0 ? (
          <Typography variant="body2" sx={{ color: '#555', p: 1 }}>
            No prescriptions yet. Medicines suggested by the doctor will appear here after your visit.
          </Typography>
        ) : (
          <Box>
            {prescriptions.map((prescription, idx) => (
              <Box key={prescription.id || idx} sx={{ mb: idx < prescriptions.length - 1 ? 3 : 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Date: {formatDate(prescription.appointment?.appointmentDate)}
                </Typography>
                {prescription.doctor && (
                  <Typography variant="body2" sx={{ mb: 1, color: '#555' }}>
                    <strong>Doctor:</strong> {prescription.doctor.name}
                  </Typography>
                )}
                {prescription.notes && (
                  <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
                    <strong>Notes:</strong> {prescription.notes}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Medicines:
                </Typography>
                <List disablePadding>
                  {prescription.medicines?.map((med, mIdx) => (
                    <ListItem key={mIdx} disablePadding sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary={`• ${med.name} ${med.dosage ? `- ${med.dosage}` : ''} ${med.duration ? `(${med.duration})` : ''}`} 
                        primaryTypographyProps={{ variant: 'body2', color: '#333' }}
                      />
                    </ListItem>
                  ))}
                </List>
                {idx < prescriptions.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default MyPrescriptions;
