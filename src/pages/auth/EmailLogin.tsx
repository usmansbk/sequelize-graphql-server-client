import { useCallback, useMemo } from "react";
import { TextField, Stack, Alert, AlertTitle, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmailLoginInput } from "types";
import { useEmailLogin } from "api/graphql/hooks/auth";
import routes from "pages/routes";

export default function EmailLoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .email(t("Enter a valid email address"))
            .required(t("Email is required")),
          password: yup.string().required(t("Password is required")),
        })
        .required(),
    [t]
  );
  const { onLogin, loading, response, reset } = useEmailLogin();
  const toVerifyEmail = useCallback(
    () => navigate(routes.verifyEmail),
    [navigate]
  );

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors },
  } = useForm<EmailLoginInput>({
    resolver: yupResolver(schema),
  });

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onLogin)}>
      {response && !response.success && (
        <Alert
          severity="error"
          onClose={reset}
          action={
            response.code === "EmailNotVerified" && (
              <Button size="small" color="inherit" onClick={toVerifyEmail}>
                {t("Verify")}
              </Button>
            )
          }
        >
          <AlertTitle>{response?.message}</AlertTitle>
        </Alert>
      )}
      <TextField
        autoFocus
        fullWidth
        type="email"
        placeholder={t("Email address")}
        label={t("Email")}
        error={touchedFields?.email && !!errors.email}
        helperText={touchedFields?.email && errors.email?.message}
        {...register("email")}
      />
      <TextField
        fullWidth
        type="password"
        autoComplete="password"
        placeholder={t("Password")}
        label={t("Password")}
        error={touchedFields?.password && !!errors.password}
        helperText={touchedFields?.password && errors.password?.message}
        {...register("password")}
      />
      <LoadingButton
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        loading={loading}
        disabled={loading}
      >
        {t("Log in")}
      </LoadingButton>
    </Stack>
  );
}
