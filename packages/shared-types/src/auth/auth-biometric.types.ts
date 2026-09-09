import { BaseEntity } from '../common/base.types';

/**
 * Auth biometric interface
 */
export interface AuthBiometric extends BaseEntity {
  biometricId: string;
  userId: string;
  type: 'fingerprint' | 'face' | 'voice' | 'iris';
  publicKey: string;
  credentialId: string;
  isEnabled: boolean;
  lastUsed: Date;
  metadata: Record<string, unknown>;
}
