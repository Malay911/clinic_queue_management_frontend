import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";
import { useAuth } from "../context/AuthProvider";

function LoginPage(){
    const [data,setData]=useState({email:"",password:""});
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const { loginAuth } = useAuth();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await loginService(data);
        console.log(response);
        if(response.error){
            setError(response.error);
        }else{
            loginAuth(response.user);
            if (response.user && response.user.role === 'patient') {
                navigate("/patient");
            } else if (response.user && response.user.role === 'doctor') {
                navigate("/doctor");
            } else if (response.user && response.user.role === 'receptionist') {
                navigate("/receptionist");
            } else {
                navigate("/");
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        Client Queue
                    </Typography>
                    <Typography
                        component="h2"
                        variant="h6"
                        align="center"
                        color="textSecondary"
                        gutterBottom
                    >
                        Sign In
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                autoFocus
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default LoginPage
