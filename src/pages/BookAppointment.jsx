import React, { useState } from 'react';
import { Box, Typography, Container, Paper, TextField, Button, MenuItem } from '@mui/material';
import { bookAppointment } from '../services/patientService';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const timeSlots = [
    "09:00-09:15", "09:15-09:30", "09:30-09:45", "09:45-10:00",
    "10:00-10:15", "10:15-10:30", "10:30-10:45", "10:45-11:00",
    "11:00-11:15", "11:15-11:30", "11:30-11:45", "11:45-12:00",
    "12:00-12:15", "12:15-12:30", "12:30-12:45", "12:45-13:00",
    "13:00-13:15", "13:15-13:30", "13:30-13:45", "13:45-14:00",
    "14:00-14:15", "14:15-14:30", "14:30-14:45", "14:45-15:00",
    "15:00-15:15", "15:15-15:30", "15:30-15:45", "15:45-16:00",
  ];

  const handleBook = async () => {
    setError(null);
    
    if (!date || !slot) {
      setError("Please pick both a date and time slot.");
      return;
    }

    const payload = {
      appointmentDate: date,
      timeSlot: slot
    };

    const res = await bookAppointment(payload);
    
    if (res?.error) {
      setError(res.error);
    } else if (res) {
      navigate('/patient/appointments');
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        Book Appointment
      </Typography>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 1, 
          border: '1px solid #ddd', boxShadow: 'none' 
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, color: '#333' }}>
            Date
          </Typography>
          <TextField 
            type="date"
            size="small" 
            fullWidth 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, color: '#333' }}>
            Time slot
          </Typography>
          <TextField 
            select 
            size="small" 
            fullWidth 
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>Select slot</MenuItem>
            {timeSlots.map((ts) => (
              <MenuItem key={ts} value={ts}>{ts}</MenuItem>
            ))}
          </TextField>
        </Box>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button 
          variant="contained" 
          onClick={handleBook}
          sx={{ 
            backgroundColor: '#1976d2', 
            '&:hover': { backgroundColor: '#115293' }, 
            textTransform: 'none',
            boxShadow: 'none',
            px: 3
          }}
        >
          Book
        </Button>
      </Paper>
    </Container>
  );
};

export default BookAppointment;
