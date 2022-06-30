import { gql } from "@apollo/client";

export const EMAIL_LOGIN = gql`
  mutation EmailLogin($input: EmailLoginInput!) {
    loginWithEmail(input: $input) {
      code
      success
      message
      refreshToken
      accessToken
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      code
      success
      message
    }
  }
`;
