import { useTranslation } from "react-i18next";
import { Box, IconButton, Stack, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DarkMode } from "@mui/icons-material";
import { useAppTheme } from "api/graphql/hooks/app";
import { useLogout } from "api/graphql/hooks/auth";

export default function AppLayout() {
  const { toggleMode } = useAppTheme();
  const { t } = useTranslation();
  const { onLogout } = useLogout();
  return (
    <Box display="flex" flex={1} flexDirection="column">
      <Stack spacing={2} direction="row">
        <IconButton onClick={toggleMode} size="large">
          <DarkMode />
        </IconButton>
        <Button onClick={onLogout}>{t("Log out")}</Button>
      </Stack>
      <Outlet />
    </Box>
  );
}
