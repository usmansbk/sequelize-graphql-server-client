import { useEffect, useMemo } from "react";
import { TextField, Stack, Alert, AlertTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpInput } from "types";
import { useSignUpWithEmail } from "api/graphql/hooks/auth";

export default function SignUpForm() {
  const { t } = useTranslation();
  const schema = useMemo(
    () =>
      yup
        .object({
          firstName: yup
            .string()
            .min(1, t("Name too short"))
            .max(140, t("Name too long"))
            .required(t("What's your name?")),
          lastName: yup
            .string()
            .min(1, t("Name too short"))
            .max(140, t("Name too long"))
            .required(t("What's your name?")),
          email: yup
            .string()
            .email(t("Enter a valid email address"))
            .required(t("What's your email?")),
          password: yup
            .string()
            .min(6, "Enter a combination of at least six characters")
            .required(t("Password is required")),
        })
        .required(),
    [t]
  );
  const { onSignup, loading, response, reset } = useSignUpWithEmail();

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors },
    setError,
  } = useForm<SignUpInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (response?.errors) {
      response.errors.map((e) =>
        setError(
          e.field as keyof SignUpInput,
          { message: e.message },
          { shouldFocus: true }
        )
      );
    }
  }, [response]);

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSignup)}>
      {response && !response.success && (
        <Alert severity="error" onClose={reset}>
          <AlertTitle>{response.message}</AlertTitle>
          {response.errors?.map((e) => e.message)}
        </Alert>
      )}
      <TextField
        autoFocus
        fullWidth
        placeholder={t("First name")}
        label={t("First name")}
        error={touchedFields?.firstName && !!errors.firstName}
        helperText={touchedFields?.firstName && errors.firstName?.message}
        {...register("firstName")}
      />
      <TextField
        fullWidth
        placeholder={t("Last name")}
        label={t("Last name")}
        error={touchedFields?.lastName && !!errors.lastName}
        helperText={touchedFields?.lastName && errors.lastName?.message}
        {...register("lastName")}
      />
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
        {t("Sign Up")}
      </LoadingButton>
    </Stack>
  );
}
