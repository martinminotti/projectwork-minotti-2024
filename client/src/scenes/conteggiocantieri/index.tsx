import { Box } from "@mui/material";
import Header from "../../components/Header";
import  ConteggioCantieriBar from "../../components/ConteggioCantieri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../types";
import httpClient from "../../service/httpClient";

export default function ConteggioCantieri() {
    const navigate = useNavigate();

    const[user, setUser] = useState<User | null>(null)
    useEffect(() => {
        (async() => {try {
            const resp = await httpClient.get("http://localhost:5000/@me");
            setUser(resp.data );
          } catch (error: any) {
              console.log("ConteggioCantieri says: Not authenitcated");
              navigate("/");
          }})();
    }, [])

   return( user ?
       <Box m="20px">
           <Header title="Conteggio Cantieri" subtitle="Grafico rappresentativo numero di cantieri per ogni regione"/>
           <Box height="50vh">
               <ConteggioCantieriBar/>
           </Box>
       </Box>
   : <div>Not authenitcated</div>)
}