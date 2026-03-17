import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Grid, Alert } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { addPrescription } from '../services/doctorService';

const AddPrescription = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialApptId = searchParams.get('appointmentId') || '';

  const [appointmentId, setAppointmentId] = useState(initialApptId);
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', duration: '' }
  ]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (!appointmentId) {
      setError("Appointment ID is required.");
      return;
    }

    const filteredMedicines = medicines.filter(m => m.name.trim() !== '');
    if (filteredMedicines.length === 0) {
      setError("Please add at least one medicine.");
      return;
    }

    const payload = {
      medicines: filteredMedicines,
      notes: notes
    };

    const response = await addPrescription(appointmentId, payload);
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
        Add Prescription
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Prescription added successfully!</Alert>}

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

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Medicines
        </Typography>

        <Paper elevation={0} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 1, backgroundColor: '#fdfdfd' }}>
          {medicines.map((med, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: index < medicines.length - 1 ? 2 : 0 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" sx={{ color: '#555', mb: 0.5, fontSize: '0.8rem' }}>Name</Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={med.name}
                  onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                  placeholder="e.g. Paracetamol"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" sx={{ color: '#555', mb: 0.5, fontSize: '0.8rem' }}>Dosage</Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={med.dosage}
                  onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                  placeholder="e.g. 500mg"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" sx={{ color: '#555', mb: 0.5, fontSize: '0.8rem' }}>Duration</Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  value={med.duration}
                  onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                  placeholder="e.g. 5 days"
                />
              </Grid>
            </Grid>
          ))}
        </Paper>

        <Button 
          variant="contained" 
          size="small" 
          onClick={handleAddMedicine}
          sx={{ 
            backgroundColor: '#e2e8f0', 
            color: '#333', 
            mb: 4,
            '&:hover': { backgroundColor: '#cbd5e1' }
          }}
        >
          + Add medicine
        </Button>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
            Notes (optional)
          </Typography>
          <TextField 
            fullWidth 
            multiline 
            rows={3} 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. After food"
          />
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          sx={{ px: 3 }}
        >
          Save Prescription
        </Button>
      </Paper>
    </Container>
  );
};

export default AddPrescription;
