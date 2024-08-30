import { Box } from "@mui/material";
import Header from "../../components/Header";
import PercentualePresenzaPie from "../../components/PercentualePresenza";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../types";
import httpClient from "../../service/httpClient";

export default function PercentualePresenza() {
    const navigate = useNavigate();

    const[user, setUser] = useState<User | null>(null)
    useEffect(() => {
        (async() => {try {
            const resp = await httpClient.get("http://localhost:5000/@me");
            setUser(resp.data );
          } catch (error: any) {
              console.log("PercentualePresenza says: Not authenitcated");
              navigate("/");
          }})();
    }, [])

   return( user ? 
       <Box m="20px">
           <Header title="Percentuale Presenza" subtitle="Grafico Pie rappresentativo della presenza delle diverse tecnologie, sul piano nazionale"/>
           <Box height="75vh">
               <PercentualePresenzaPie/>
           </Box>
       </Box>
       : <div>Not authenitcated</div>
   )
}