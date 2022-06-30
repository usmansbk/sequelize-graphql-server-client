import { gql } from "@apollo/client";

export const AUTH_STATE = gql`
  query GetAuthState {
    auth @client {
      isLoggedIn
      accessToken
      refreshToken
    }
  }
`;

export default {};
