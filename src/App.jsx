import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import PatientDashboard from './pages/PatientDashboard'
import BookAppointment from './pages/BookAppointment'
import MyAppointments from './pages/MyAppointments'
import AppointmentDetails from './pages/AppointmentDetails'
import MyPrescriptions from './pages/MyPrescriptions'
import MyReports from './pages/MyReports'
import DoctorDashboard from './pages/DoctorDashboard'
import AddPrescription from './pages/AddPrescription'
import AddReport from './pages/AddReport'
import ReceptionistDashboard from './pages/ReceptionistDashboard'
import TvDisplay from './pages/TvDisplay'
import Layout from './components/Layout'
import PatientLayout from './components/PatientLayout'
import DoctorLayout from './components/DoctorLayout'
import ReceptionistLayout from './components/ReceptionistLayout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>} >
            <Route path="/" element={<Dashboard />} ></Route>
            <Route path="/users" element={<Users />} ></Route>
          </Route>
          <Route path="/patient" element={<ProtectedRoute allowedRoles={['patient']}><PatientLayout /></ProtectedRoute>} >
            <Route path="" element={<PatientDashboard />} ></Route>
            <Route path="book" element={<BookAppointment />} ></Route>
            <Route path="appointments" element={<MyAppointments />} ></Route>
            <Route path="appointments/:id" element={<AppointmentDetails />} ></Route>
            <Route path="prescriptions" element={<MyPrescriptions />} ></Route>
            <Route path="reports" element={<MyReports />} ></Route>
          </Route>
          <Route path="/doctor" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorLayout /></ProtectedRoute>} >
            <Route path="" element={<DoctorDashboard />} ></Route>
            <Route path="prescription" element={<AddPrescription />} ></Route>
            <Route path="report" element={<AddReport />} ></Route>
          </Route>
          <Route path="/receptionist" element={<ProtectedRoute allowedRoles={['receptionist']}><ReceptionistLayout /></ProtectedRoute>} >
            <Route path="" element={<ReceptionistDashboard />} ></Route>
            <Route path="tv-display" element={<TvDisplay />} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
