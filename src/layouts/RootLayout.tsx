import { useMemo } from "react";
import { Box, ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppTheme } from "api/graphql/hooks/app";

export default function RootLayout() {
  const { mode } = useAppTheme();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiInputBase: {
            styleOverrides: {
              input: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: `0 0 0 9999px ${
                    mode === "light" ? "white" : "#212121"
                  } inset`,
                  WebkitTextFillColor: mode === "light" ? grey[900] : "#fff",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        minHeight="100vh"
        flexDirection="column"
        bgcolor="background.default"
        color="text.primary"
      >
        <Outlet />
      </Box>
      <Toaster />
    </ThemeProvider>
  );
}
