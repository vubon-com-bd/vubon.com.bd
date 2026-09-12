import { BaseEntity } from '../common/base.types';
import { AUTH_BIOMETRIC } from '@vubon/shared-constants/src/auth/auth-biometric.constants';

/**
 * Biometric type value — from AUTH_BIOMETRIC
 */
export type AuthBiometricType = (typeof AUTH_BIOMETRIC)[keyof typeof AUTH_BIOMETRIC];

/**
 * Auth biometric interface
 */
export interface AuthBiometric extends BaseEntity {
  biometricId: string;
  userId: string;
  type: AuthBiometricType;
  publicKey: string;
  credentialId: string;
  isEnabled: boolean;
  lastUsed: Date;
  metadata: Record<string, unknown>;
}

/**
 * Public-safe biometric DTO — publicKey never returned to clients
 */
export type AuthBiometricPublic = Omit<AuthBiometric, 'publicKey' | 'metadata'>;
