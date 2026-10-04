export interface ResetPasswordRequest {
  readonly token: string;
  readonly newPassword: string;
}

export interface ResetPasswordResponse {
  readonly success: boolean;
}
