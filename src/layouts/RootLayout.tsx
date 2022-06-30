import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <Box display="flex" minHeight="100vh">
      <Outlet />
    </Box>
  );
}

export default RootLayout;
