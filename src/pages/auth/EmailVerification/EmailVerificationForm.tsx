import { useMemo } from "react";
import { TextField, Stack, Alert, AlertTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRequestEmailVerification } from "api/graphql/hooks/auth";
import { EmailInput } from "types";

export default function EmailVerificationForm() {
  const { t } = useTranslation();
  const schema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .email(t("Your email is incorrect"))
            .required(t("What's your email?")),
        })
        .required(),
    [t]
  );
  const { onRequestVerification, loading, response, reset } =
    useRequestEmailVerification();

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors },
  } = useForm<EmailInput>({
    resolver: yupResolver(schema),
  });

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onRequestVerification)}
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
        autoFocus
        fullWidth
        type="email"
        placeholder={t("Email address")}
        label={t("Email")}
        error={touchedFields?.email && !!errors.email}
        helperText={touchedFields?.email && errors.email?.message}
        {...register("email")}
      />
      <LoadingButton
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        loading={loading}
        disabled={loading}
      >
        {t("Continue")}
      </LoadingButton>
    </Stack>
  );
}
