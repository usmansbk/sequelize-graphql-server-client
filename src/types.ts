export type AuthState = {
  isLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
};

// Response

type FieldError = {
  message: string;
  field: string;
};

type FormErrors = {
  errors: FieldError[];
};

export type Response = {
  code: string;
  success: boolean;
  message: string;
};

export interface FormResponse extends Response, FormErrors {}

export interface DeleteMutationResponse extends Response {
  id: string;
}

export interface AuthFormMutationResponse extends FormResponse {
  accessToken: string;
  refreshToken: string;
}

// Input

export type EmailInput = {
  email: string;
};

export type TokenInput = {
  token: string;
};

export type EmailLoginInput = {
  email: string;
  password: string;
};

export interface SignUpInput extends EmailLoginInput {
  firstName: string;
  lastName: string;
}
