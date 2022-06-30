import { useMutation } from "@apollo/client";
import { useCallback, useMemo } from "react";
import {
  AuthFormMutationResponse,
  EmailLoginInput,
  FormResponse,
  SignUpInput,
  Response,
  EmailInput,
  TokenInput,
  ResetPasswordInput,
} from "types";
import { AUTH_STATE } from "../queries/app";
import {
  DELETE_ACCOUNT,
  EMAIL_LOGIN,
  FORGOT_PASSWORD,
  LOGOUT,
  REGISTER_WITH_EMAIL,
  REQUEST_DELETE_ACCOUNT,
  REQUEST_EMAIL_VERIFICATION,
  RESET_PASSWORD,
  VERIFY_EMAIL_ADDRESS,
} from "../queries/auth";

export const useEmailLogin = () => {
  const [mutate, { loading, reset, data }] = useMutation(EMAIL_LOGIN);

  const onLogin = useCallback(
    (input: EmailLoginInput) =>
      mutate({
        variables: {
          input,
        },
        update: (cache, { data: { loginWithEmail } }) => {
          if (loginWithEmail.success) {
            const { accessToken, refreshToken } = loginWithEmail;
            cache.writeQuery({
              query: AUTH_STATE,
              data: {
                auth: {
                  isLoggedIn: true,
                  accessToken,
                  refreshToken,
                },
              },
            });
          }
        },
      }),
    [mutate]
  );

  const response = useMemo(
    () => data?.loginWithEmail,
    [data]
  ) as AuthFormMutationResponse;

  return {
    loading,
    onLogin,
    reset,
    response,
  };
};

export const useSignUpWithEmail = () => {
  const [mutate, { loading, reset, data }] = useMutation(REGISTER_WITH_EMAIL);

  const onSignup = useCallback(
    (input: SignUpInput) =>
      mutate({
        variables: {
          input,
        },
        update: (cache, { data: { registerWithEmail } }) => {
          if (registerWithEmail.success) {
            const { accessToken, refreshToken } = registerWithEmail;
            cache.writeQuery({
              query: AUTH_STATE,
              data: {
                auth: {
                  isLoggedIn: true,
                  accessToken,
                  refreshToken,
                },
              },
            });
          }
        },
      }),
    [mutate]
  );

  const response = useMemo(
    () => data?.registerWithEmail,
    [data]
  ) as AuthFormMutationResponse;

  return {
    loading,
    onSignup,
    reset,
    response,
  };
};

export const useLogout = () => {
  const [mutate, { client }] = useMutation(LOGOUT);

  const onLogout = useCallback(async () => {
    mutate();
    client.resetStore();
  }, [mutate]);

  return {
    onLogout,
  };
};

export const useVerifyEmail = () => {
  const [mutate, { loading, reset, data }] = useMutation(VERIFY_EMAIL_ADDRESS);

  const onVerifyEmail = useCallback(
    ({ token }: TokenInput) =>
      mutate({
        variables: {
          token,
        },
      }),
    [mutate]
  );
  const response = useMemo(() => data?.verifyEmail, [data]) as FormResponse;

  return {
    onVerifyEmail,
    reset,
    loading,
    response,
  };
};

export const useRequestEmailVerification = () => {
  const [mutate, { loading, data, reset }] = useMutation(
    REQUEST_EMAIL_VERIFICATION
  );

  const onRequestVerification = useCallback(
    ({ email }: EmailInput) =>
      mutate({
        variables: {
          email,
        },
      }),
    [mutate]
  );

  const response = useMemo(
    () => data?.requestEmailVerification,
    [data]
  ) as Response;

  return {
    onRequestVerification,
    loading,
    response,
    reset,
  };
};

export const useForgotPassword = () => {
  const [mutate, { loading, data, reset }] = useMutation(FORGOT_PASSWORD);

  const onRequestPasswordReset = useCallback(
    ({ email }: EmailInput) =>
      mutate({
        variables: {
          email,
        },
      }),
    [mutate]
  );

  const response = useMemo(
    () => data?.requestPasswordReset,
    [data]
  ) as Response;

  return {
    onRequestPasswordReset,
    loading,
    response,
    reset,
  };
};

export const useResetPassword = () => {
  const [mutate, { loading, data, reset }] = useMutation(RESET_PASSWORD);

  const onResetPassword = useCallback(
    ({ password, token }: ResetPasswordInput) =>
      mutate({
        variables: {
          input: {
            password,
            token,
          },
        },
      }),
    [mutate]
  );

  const response = useMemo(() => data?.resetPassword, [data]) as Response;

  return {
    onResetPassword,
    loading,
    response,
    reset,
  };
};

export const useRequestDeleteAccount = () => {
  const [mutate, { loading, data, reset }] = useMutation(
    REQUEST_DELETE_ACCOUNT
  );

  const onRequestDelete = useCallback(() => mutate(), [mutate]);

  const response = useMemo(
    () => data?.requestDeleteAccount,
    [data]
  ) as Response;

  return {
    onRequestDelete,
    loading,
    response,
    reset,
  };
};

export const useDeleteAccount = () => {
  const [mutate, { loading, data, reset }] = useMutation(DELETE_ACCOUNT);

  const onDeleteAccount = useCallback(
    async ({ token }: TokenInput) => {
      await mutate({
        variables: {
          token,
        },
      });
    },
    [mutate]
  );

  const response = useMemo(() => data?.deleteAccount, [data]) as Response;

  return {
    onDeleteAccount,
    loading,
    response,
    reset,
  };
};
