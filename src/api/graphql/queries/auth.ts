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

export const REGISTER_WITH_EMAIL = gql`
  mutation RegisterWithEmail($input: CreateUserInput!) {
    registerWithEmail(input: $input) {
      code
      success
      message
      errors {
        message
        field
      }
      accessToken
      refreshToken
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

export const REQUEST_EMAIL_VERIFICATION = gql`
  mutation RequestEmailVerification($email: EmailAddress!) {
    requestEmailVerification(email: $email) {
      code
      success
      message
    }
  }
`;

export const VERIFY_EMAIL_ADDRESS = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      code
      success
      message
      errors {
        message
        field
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: PasswordResetInput!) {
    resetPassword(input: $input) {
      code
      success
      message
      errors {
        message
        field
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation RequestPasswordReset($email: EmailAddress!) {
    requestPasswordReset(email: $email) {
      code
      success
      message
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($token: String!) {
    deleteAccount(token: $token) {
      code
      success
      message
    }
  }
`;

export const REQUEST_DELETE_ACCOUNT = gql`
  mutation RequestDeleteAccount {
    requestDeleteAccount {
      code
      success
      message
    }
  }
`;
