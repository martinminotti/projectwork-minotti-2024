import React, {useState} from 'react'
import httpClient from '../../service/httpClient';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  
    const logInUser = async () => {

      try {
        const resp = await httpClient.post("http://localhost:5000/login", {
          email: email,
          password: password
        }, {
          withCredentials: true // Importante per inviare i cookie con la richiesta
        });

        navigate("/dashboard");
      } catch (error: any) {
        if (error.response.status === 401) {
          alert("Invalid credentials");
        } else if(!error.response.status)
          alert("Unexpected error during login...")
        
      }
    };
  
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Login
        </Typography>
        <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '30%',
        }}
        noValidate
        autoComplete="off"
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            InputProps={{
              sx: { fontSize: 20 }, // Imposta la dimensione del font a 20px
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={logInUser}
            fullWidth
          >
            Login
          </Button>

        </Box>

      </Box>
    );
  };
  
  export default LoginPage;