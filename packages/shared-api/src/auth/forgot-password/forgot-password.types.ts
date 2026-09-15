export interface ForgotPasswordRequest {
  readonly email: string;
}

export interface ForgotPasswordResponse {
  readonly emailSent: boolean;
  readonly message?: string;
}
