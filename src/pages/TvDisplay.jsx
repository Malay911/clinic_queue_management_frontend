import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, TextField, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { getDailyQueue } from '../services/receptionistService';

const TvDisplay = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQueue(selectedDate);
  }, [selectedDate]);

  const fetchQueue = async (dateStr) => {
    setLoading(true);
    setError('');
    
    // Using simple format YYYY-MM-DD
    const res = await getDailyQueue(dateStr);
    if (Array.isArray(res)) {
      setQueue(res);
    } else {
      setQueue([]);
      if (res && res.message) {
        setError(res.message);
      } else {
        setError('Failed to fetch queue data');
      }
    }
    setLoading(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}>
        TV display – Queue
      </Typography>
      
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid #e0e0e0', minHeight: '300px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 2 }}>
            Date
          </Typography>
          <TextField
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: '40px'
              }
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
           <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        ) : queue.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No patients in queue for this date.
          </Typography>
        ) : (
          <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {queue.map((item) => (
              <ListItem 
                key={item.id} 
                disablePadding
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Box 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '4px', 
                    backgroundColor: '#1976d2', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    mr: 2
                  }}
                >
                  {item.tokenNumber}
                </Box>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {item.appointment?.patient?.name || 'Unknown Patient'}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default TvDisplay;
