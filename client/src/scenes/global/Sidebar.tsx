import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Icon, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
//icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
//icons chart
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";

import StackedBarChartIcon from '@mui/icons-material/StackedBarChartOutlined';//un secondo barchart
import { Margin } from "@mui/icons-material";
import { title } from "process";
import { User } from "../../types";
import httpClient from "../../service/httpClient";

interface ItemProps {
    title: string;
    to: string;
    icon: React.ReactNode;
    selected: string;
    setSelected: (title: string) => void;
  }
  
  const Item: React.FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
      <MenuItem
        onClick={() => setSelected(title)}
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };
  

export default function SideBar(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();
    const logoutUser = async () => {
      try
      {
        const resp = await httpClient.get("http://localhost:5000/logout")
        navigate("/")
      }catch (error: any) {
        alert("Unexpected error during logout");
      }
    }

    const[user, setUser] = useState<User | null>(null)
    useEffect(() => {
        (async() => {try {
            const resp = await httpClient.get("http://localhost:5000/@me");
            setUser(resp.data );
          } catch (error: any) {
              console.log("sidebar says: Not authenitcated");
              navigate("/");
          }})();
    }, [])



    return ( user ?
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                color: "#6870fa !important",
                },
            }}
        >
            
        <ProSidebar collapsed={isCollapsed}>
            <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="5px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                {'MENU'}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon onClick={() => setIsCollapsed(!isCollapsed)} />
                </IconButton>
              </Box>
            )}
          </MenuItem>


                {!isCollapsed && (
                    <Box mb="25px">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                        alt="profile-user"
                        width="90px"
                        height="90px"
                        src={`../../assets/pfp.jpeg`}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    <Box textAlign="center">
                    <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ m: "10px 0 0 0" }}
                        >
                        {user.name.split(' ').map((part, index) => (
                          <span key={index} style={{ display: 'block' }}>
                            {part}
                          </span>
                        ))}
                      </Typography>
                    </Box>
                    </Box>
                )}

                  <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                    <Item
                      title="Dashboard"
                      to="/dashboard"
                      icon={<HomeOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />

                    <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                    >
                    Charts
                    </Typography>
                    <Item
                      title="Piano Anno"
                      to="/pianoanno"
                      icon={<BarChartOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Perc. Presenza"
                      to="/percentualepresenza"
                      icon={<PieChartOutlineOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Andamento Piani"
                      to="/andamentipiani"
                      icon={<TimelineOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Conteggio Cantieri"
                      to="/conteggiocantieri"
                      icon={<StackedBarChartIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />

                  </Box>
                  <Box 
                    sx={{ 
                      marginTop: "auto", 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}
                  >
                    <IconButton onClick={logoutUser}>
                      <LogoutIcon />
                    </IconButton>
                  </Box>
                </Menu>
            </ProSidebar>
        </Box>
    : <div>Not authenitcated</div>);
}