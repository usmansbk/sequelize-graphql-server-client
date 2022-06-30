import { useQuery } from "@apollo/client";
import { AuthState } from "types";
import { AUTH_STATE } from "../queries/auth";

export const useAuthState = () => {
  const { data } = useQuery(AUTH_STATE);

  return data?.auth as AuthState;
};

export default {};
