import { useMutation } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { AuthFormMutationResponse, EmailLoginInput } from "types";
import { EMAIL_LOGIN } from "../queries/auth";

export const useEmailLogin = () => {
  const [mutate, { loading, reset, data }] = useMutation(EMAIL_LOGIN);

  const onLogin = useCallback(
    (input: EmailLoginInput) =>
      mutate({
        variables: {
          input,
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

export default {};
