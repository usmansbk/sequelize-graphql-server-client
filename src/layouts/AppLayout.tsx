import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <Box display="flex" flex={1} flexDirection="column">
      <Outlet />
    </Box>
  );
}

export default AppLayout;
