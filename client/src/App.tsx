import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import LandingPage from './scenes/landingpage';
import PianoAnno from './scenes/pianoannobar';
import PercentualePresenza from './scenes/percentualepresenzapie';
import AndamentoPiani from './scenes/andamentopiani';
import ConteggioCantieri from './scenes/conteggiocantieri';
import Login from './scenes/login';


//parti da qui
// https://blog.logrocket.com/authentication-react-router-v6/
function App() {

  const [theme, colorMode] = useMode();
  const location = useLocation();
  //se la pagina è landing o login o register niente sidebar
  const isSidebarRequired = location.pathname === '/' || location.pathname === '/login';

  
  return (
    <><ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
         {!isSidebarRequired && <Sidebar/>}
            <main className='content'>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pianoanno" element={<PianoAnno />} />
                  <Route path="/percentualepresenza" element={<PercentualePresenza />} />
                  <Route path="/andamentipiani" element={<AndamentoPiani />} />
                  <Route path="/conteggiocantieri" element={<ConteggioCantieri />} />
                </Routes>
            </main>
          </div>  
      </ThemeProvider>
    </ColorModeContext.Provider></>
  );
}

export default App;

// video https://www.youtube.com/watch?v=wYpCWwD1oz0 (minuto 1:12)
// la sua webapp https://0lp1zw.csb.app
// suo git repo https://github.com/ed-roh/react-admin-dashboard/tree/master/src
