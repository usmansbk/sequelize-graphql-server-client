import { Box, IconButton } from "@mui/material";
import { DarkMode } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useAppTheme } from "api/graphql/hooks/app";

export default function PublicLayout() {
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
