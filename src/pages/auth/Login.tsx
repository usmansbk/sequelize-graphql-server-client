import { TextField, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const { t } = useTranslation();
  return (
    <Stack spacing={2} component="form">
      <TextField
        autoFocus
        fullWidth
        type="email"
        placeholder={t("Email address")}
        label={t("Email")}
      />
      <TextField
        fullWidth
        type="password"
        autoComplete="password"
        placeholder={t("Password")}
        label={t("Password")}
      />
      <LoadingButton fullWidth type="submit" variant="contained" size="large">
        {t("Login")}
      </LoadingButton>
    </Stack>
  );
}
