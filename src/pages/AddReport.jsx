import React, { useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Alert } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { addReport } from '../services/doctorService';

const AddReport = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialApptId = searchParams.get('appointmentId') || '';

  const [appointmentId, setAppointmentId] = useState(initialApptId);
  const [diagnosis, setDiagnosis] = useState('');
  const [testRecommended, setTestRecommended] = useState('');
  const [remarks, setRemarks] = useState('');
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (!appointmentId) {
      setError("Appointment ID is required.");
      return;
    }

    if (!diagnosis.trim()) {
      setError("Diagnosis is required.");
      return;
    }

    const payload = {
      diagnosis,
      testRecommended: testRecommended || undefined,
      remarks: remarks || undefined
    };

    const response = await addReport(appointmentId, payload);
    if (response?.error) {
      setError(response.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/doctor');
      }, 2000);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        Add Medical Report
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Report added successfully!</Alert>}

      <Paper elevation={0} sx={{ p: 3, borderRadius: 1, border: '1px solid #ddd' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
            Appointment ID
          </Typography>
          <TextField 
            fullWidth 
            size="small" 
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            placeholder="e.g. 6"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
            Diagnosis *
          </Typography>
          <TextField 
            fullWidth 
            size="small" 
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="e.g. Viral Fever"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
            Test recommended (optional)
          </Typography>
          <TextField 
            fullWidth 
            size="small" 
            value={testRecommended}
            onChange={(e) => setTestRecommended(e.target.value)}
            placeholder="e.g. Blood Test"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
            Remarks (optional)
          </Typography>
          <TextField 
            fullWidth 
            multiline 
            rows={3} 
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="e.g. Rest for 3 days"
          />
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          sx={{ px: 3 }}
        >
          Save Report
        </Button>
      </Paper>
    </Container>
  );
};

export default AddReport;
