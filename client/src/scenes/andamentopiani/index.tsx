import { Box } from "@mui/material";
import Header from "../../components/Header";
import  AndamentoPianiLine from "../../components/AndamentoPiani";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../types";
import httpClient from "../../service/httpClient";

export default function AndamentoPiani() {
    const navigate = useNavigate();

    const[user, setUser] = useState<User | null>(null)
    useEffect(() => {
        (async() => {try {
            const resp = await httpClient.get("http://localhost:5000/@me");
            setUser(resp.data );
          } catch (error: any) {
              console.log("AndamentoPiani says: Not authenitcated");
              navigate("/");
          }})();
    }, [])
    
   return(user ? 
       <Box m="20px">
           <Header title="Andamento Piani" subtitle="Grafico Line rappresentativo dell'andamento dei due piani negli anni, su piano nazionale"/>
           <Box height="50vh" 
                margin="50px"
                >
               <AndamentoPianiLine/>
           </Box>
       </Box>
       : <div>Not authenitcated</div>
   )
}