import { Box, IconButton } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DarkMode } from "@mui/icons-material";
import { useAppTheme } from "api/graphql/hooks/app";

export default function AppLayout() {
  const { toggleMode } = useAppTheme();
  return (
    <Box display="flex" flex={1} flexDirection="column">
      <Box>
        <IconButton onClick={toggleMode} size="large">
          <DarkMode />
        </IconButton>
      </Box>
      <Outlet />
    </Box>
  );
}
