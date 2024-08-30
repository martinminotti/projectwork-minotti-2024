import { Typography, Box, useTheme, IconButton } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useContext } from "react";

export default function Header(props: {title: string, subtitle: string}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);


    return (
        <Box m="20px">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mb: "5px" }}>
                {props.title}
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[400]}>
                {props.subtitle}
              </Typography>
            </Box>
          </Box>
        </Box>
      );
}