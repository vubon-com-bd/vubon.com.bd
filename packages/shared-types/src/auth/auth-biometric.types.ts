export interface AuthBiometric {
  biometricId: string;
  userId: string;
  type: 'fingerprint' | 'face' | 'voice' | 'iris';
  publicKey: string;
  credentialId: string;
  isEnabled: boolean;
  lastUsed: Date;
  metadata: Record<string, unknown>;
}
