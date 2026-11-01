export interface RegisterRequest {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly phone?: string;
  readonly acceptTerms: boolean;
}

export interface RegisterResponse {
  readonly userId: string;
  readonly email: string;
  readonly verificationRequired: boolean;
}
