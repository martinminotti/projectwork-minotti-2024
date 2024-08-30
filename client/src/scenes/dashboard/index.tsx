import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header"
import PercentualePresenzaPie from "../../components/PercentualePresenza";
import PianoAnnoBar from "../../components/PianoAnno";
import ConteggioCantieriBar from "../../components/ConteggioCantieri";
import AndamentoPianiLine from "../../components/AndamentoPiani";
import { User } from "../../types";
import { useEffect, useState } from "react";
import httpClient from "../../service/httpClient";


export default function Dashboard(){

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const[user, setUser] = useState<User | null>(null)
    useEffect(() => {
        (async() => {try {
            const resp = await httpClient.get("http://localhost:5000/@me");
            setUser(resp.data );
          } catch (error: any) {
              console.log("dashboard says: Not authenitcated");
              navigate("/");
          }})();
    }, [])

    
    return ( user ? 
        <Box m="20px">
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Dashboard Project Work" subtitle={`Benvenuto nella dashboard del PW di Martin Minotti`} />
          </Box>
    
          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
              {/* BOX 1 */}
              <Box
                gridColumn="span 6"
                gridRow="span 2"
                p="10px"
                onClick={() => {navigate('/percentualepresenza')}}
                sx={{bgcolor: colors.primary[400]}}
              >
                <Typography variant="h5" fontWeight="600">
                  Percentuale Presenza
                </Typography>   
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt="25px"
                  height="250px"
                >
                  <PercentualePresenzaPie isDashboard={true}/>
                </Box>
              </Box>
              {/* BOX 2 */}
              <Box
                gridColumn="span 6"
                gridRow="span 2"
                onClick={() => {navigate('/pianoanno')}}
                sx={{bgcolor: colors.primary[400]}}
              >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Piano Anno
              </Typography>
              <Box height="250px" >
                <PianoAnnoBar isDashboard={true} />
              </Box>
            </Box>

            {/* ROW 2 */}
              {/* BOX 1 */}
              <Box
                gridColumn="span 6"
                gridRow="span 2"
                p="10px"
                onClick={() => {navigate('/conteggiocantieri')}}
                sx={{bgcolor: colors.primary[400]}}
              >
                <Typography variant="h5" fontWeight="600">
                  Conteggio Cantieri
                </Typography>   
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  ml="25px"
                  mt="50px"
                  height="250px"
                >
                  <ConteggioCantieriBar isDashboard={true}/>
                </Box>
              </Box>
              {/* BOX 2 */}
              <Box
                gridColumn="span 6"
                gridRow="span 2"
                onClick={() => {navigate('/andamentipiani')}}
                sx={{bgcolor: colors.primary[400]}}
              >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Andamento Piani
              </Typography>
              <Box display="flex"
                  flexDirection="column"
                  alignItems="center"
                  ml="80px"
                  height="250px" >
                <AndamentoPianiLine isDashboard={true} />
              </Box>
            </Box>

          </Box>
          
        </Box>
      : <div>Not authenitcated</div>);
}