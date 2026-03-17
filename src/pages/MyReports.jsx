import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import { getMyReports } from '../services/patientService';

const MyReports = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const data = await getMyReports();
    if (Array.isArray(data)) {
      setReports(data);
    } else {
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports();
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
        My Reports
      </Typography>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 1, border: '1px solid #ddd', boxShadow: 'none' }}>
        {reports.length === 0 ? (
          <Typography variant="body2" sx={{ color: '#555', p: 1 }}>
            No medical reports added yet. Reports submitted by your doctor will appear here.
          </Typography>
        ) : (
          <Box>
            {reports.map((report, idx) => (
              <Box key={report.id || idx} sx={{ mb: idx < reports.length - 1 ? 3 : 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Date: {formatDate(report.appointment?.appointmentDate)}
                </Typography>
                {report.doctor && (
                  <Typography variant="body2" sx={{ mb: 1, color: '#555' }}>
                    <strong>Doctor:</strong> {report.doctor.name}
                  </Typography>
                )}
                
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {report.diagnosis && (
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      <strong>Diagnosis:</strong> {report.diagnosis}
                    </Typography>
                  )}
                  {report.testRecommended && (
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      <strong>Tests Recommended:</strong> {report.testRecommended}
                    </Typography>
                  )}
                  {report.remarks && (
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      <strong>Remarks:</strong> {report.remarks}
                    </Typography>
                  )}
                </Box>
                {idx < reports.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default MyReports;
