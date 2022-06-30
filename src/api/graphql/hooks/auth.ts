import { useMutation } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { AuthFormMutationResponse, EmailLoginInput } from "types";
import { AUTH_STATE } from "../queries/app";
import { EMAIL_LOGIN, LOGOUT } from "../queries/auth";

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
