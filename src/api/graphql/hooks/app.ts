import { useQuery } from "@apollo/client";
import { PaletteMode } from "@mui/material";
import { useCallback } from "react";
import { AuthState } from "types";
import { APP_THEME, AUTH_STATE } from "../queries/app";

export const useAuthState = () => {
  const { data } = useQuery(AUTH_STATE);

  return (data?.auth || { isLoggedIn: false }) as AuthState;
};

export const useAppTheme = () => {
  const { data, client } = useQuery(APP_THEME);

  const mode = data?.theme as PaletteMode;

  const toggleMode = useCallback(() => {
    client.writeQuery({
      query: APP_THEME,
      data: {
        theme: mode === "light" ? "dark" : "light",
      },
    });
  }, [client, mode]);

  return {
    mode,
    toggleMode,
    isDark: mode === "dark",
  };
};
