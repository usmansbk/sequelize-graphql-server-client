import { gql } from "@apollo/client";

export const AUTH_STATE = gql`
  query AuthState {
    auth @client {
      isLoggedIn
      accessToken
      refreshToken
    }
  }
`;

export const APP_THEME = gql`
  query AppTheme {
    theme @client
  }
`;
