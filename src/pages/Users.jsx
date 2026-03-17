import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Grid, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { getClinicUsers, createUser } from '../services/adminService';
import { useAuth } from '../context/AuthProvider';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    phone: ''
  });

  const fetchUsers = async () => {
    const data = await getClinicUsers();
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    setError(null);
    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email, and password are required.");
      return;
    }

    const res = await createUser(formData);
    
    if (res?.error) {
      setError(res.error);
    } else {
      setFormData({ name: '', email: '', password: '', role: 'patient', phone: '' });
      fetchUsers();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        Clinic Users
      </Typography>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: '1px solid #ddd', boxShadow: 'none', mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Add receptionist, doctor, or patient
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create a user in your clinic. They will sign in with the email and password you set (no registration).
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1 }}>Name</Typography>
            <TextField name="name" value={formData.name} onChange={handleChange} size="small" fullWidth placeholder="At least 3 characters" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1 }}>Email</Typography>
            <TextField name="email" value={formData.email} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1 }}>Password</Typography>
            <TextField name="password" value={formData.password} onChange={handleChange} size="small" fullWidth placeholder="Min 6 characters" type="password" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1 }}>Role</Typography>
            <TextField select name="role" value={formData.role} onChange={handleChange} size="small" fullWidth>
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="receptionist">Receptionist</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1 }}>Phone (optional)</Typography>
            <TextField name="phone" value={formData.phone} onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>
        
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ mt: 3 }}>
          <Button onClick={handleAddUser} variant="contained" sx={{ '&:hover': {  }, textTransform: 'none' }}>
            Add user
          </Button>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: '1px solid #ddd', boxShadow: 'none' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Users in this clinic
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>{row.email}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    <Chip 
                      label={row.role.charAt(0).toUpperCase() + row.role.slice(1)} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#e6f3ff', 
                        color: '#1976d2',
                        fontWeight: '500',
                        fontSize: '0.75rem',
                        height: '24px'
                      }} 
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>{row.phone || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Users;
