 import { Box } from "@mui/material";
 import Header from "../../components/Header";
 import PianoAnnoBar from "../../components/PianoAnno";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../types";
import httpClient from "../../service/httpClient";

 export default function PianoAnno() {
    const navigate = useNavigate();

    const[user, setUser] = useState<User | null>(null)
    useEffect(() => {
        (async() => {try {
            const resp = await httpClient.get("http://localhost:5000/@me");
            setUser(resp.data );
          } catch (error: any) {
              console.log("PianoAnno says: Not authenitcated");
              navigate("/");
          }})();
    }, [])

    return( user ? 
        <Box m="20px">
            <Header title="Piano Anno" subtitle="Grafico rappresentativo dell'andamento dei piani per ogni anno"/>
            <Box height="75vh">
                <PianoAnnoBar/>
            </Box>
        </Box>
    : <div>Not authenitcated</div>)
 }