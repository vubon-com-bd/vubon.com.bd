export interface RegisteredCredential {
  readonly credentialId: string;
  readonly userId: string;
  readonly publicKey: string;
  readonly algorithm: 'ES256' | 'RS256';
  readonly signCount: number;
  readonly registeredAt: string;
}

export interface BiometricServiceContract {
  register(input: {
    userId: string;
    credentialId: string;
    publicKey: string;
    algorithm: 'ES256' | 'RS256';
  }): Promise<RegisteredCredential>;
  get(userId: string, credentialId: string): Promise<RegisteredCredential | null>;
  verify(input: {
    userId: string;
    credentialId: string;
    challenge: string;
    signature: string;
  }): Promise<boolean>;
}
