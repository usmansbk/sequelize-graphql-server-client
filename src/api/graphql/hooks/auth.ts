import { useMutation } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { AuthFormMutationResponse, EmailLoginInput, SignUpInput } from "types";
import { AUTH_STATE } from "../queries/app";
import { EMAIL_LOGIN, LOGOUT, REGISTER_WITH_EMAIL } from "../queries/auth";

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
