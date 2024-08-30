import React, {useState, useEffect} from 'react'
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from '../../types';
import httpClient from '../../service/httpClient';
import Header from '../../components/Header';
import { tokens } from '../../theme';

const LandingPage: React.FC = () =>{
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const[user, setUser] = useState<User | null>(null)
    useEffect(() => {
        (async() => {try {
            const resp = await httpClient.get("http://localhost:5000/@me");
            setUser(resp.data );
          } catch (error: any) {
              console.log("landingpage says: Not authenitcated");
          }})();
    }, [])

    return (
      <Box
        sx={{
          height: '100vh', // Imposta l'altezza a 100% della viewport
          display: 'flex', // Flexbox per il contenitore
          flexDirection: 'column', // Organizza i figli in colonna
          justifyContent: 'center', // Centra verticalmente
          alignItems: 'center', // Centra orizzontalmente
          textAlign: 'center', // Centra il testo
          gap: 2, // Spaziatura tra i componenti
          px: 2, // Padding orizzontale per un po' di margine laterale
        }}
      >
        <Typography variant="h1" color={colors.grey[100]} fontWeight="bold" sx={{ mb: "5px" }}>
          Benvenuto nel Project Work di Martin Minotti
        </Typography>

        <Button variant="contained" color="primary" size="large" onClick={() => navigate("/login")}>
          Vai al login
        </Button>
      </Box>
    );
  };
  

export default LandingPage;