import { useMemo } from "react";
import { TextField, Stack, Alert, AlertTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPassword } from "api/graphql/hooks/auth";
import { ResetPasswordInput } from "types";
import { useSearchParams } from "react-router-dom";

export default function ResetPasswordForm() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const token = params.get("token")!;
  const schema = useMemo(
    () =>
      yup
        .object({
          password: yup
            .string()
            .min(6, "Enter a combination of at least six characters")
            .required(t("Enter your new password")),
          token: yup.string().required(),
        })
        .required(),
    [t]
  );
  const { onResetPassword, loading, response, reset } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors },
  } = useForm<ResetPasswordInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      token,
    },
  });

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onResetPassword)}
    >
      {!!response && (
        <Alert
          severity={response.success ? "success" : "error"}
          onClose={reset}
        >
          <AlertTitle>{response.message}</AlertTitle>
        </Alert>
      )}
      <TextField
        fullWidth
        type="password"
        placeholder={t("Password")}
        label={t("New Password")}
        autoComplete="new-password"
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
        {t("Reset password")}
      </LoadingButton>
    </Stack>
  );
}
