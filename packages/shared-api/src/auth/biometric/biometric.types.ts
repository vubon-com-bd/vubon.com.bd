export interface BiometricRegisterRequest {
  readonly deviceId: string;
  readonly publicKey: string;
  readonly algorithm: 'ES256' | 'RS256';
}

export interface BiometricRegisterResponse {
  readonly registered: boolean;
  readonly credentialId: string;
}

export interface BiometricVerifyRequest {
  readonly credentialId: string;
  readonly signature: string;
  readonly challenge: string;
}

export interface BiometricVerifyResponse {
  readonly verified: boolean;
  readonly accessToken?: string;
  readonly refreshToken?: string;
}
