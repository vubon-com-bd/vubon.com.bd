/**
 * Auth Biometric Types
 * প্রমাণীকরণ বায়োমেট্রিক সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AuthDevice } from './auth-device.types';

export interface AuthBiometric extends BaseEntity {
  userId: string;
  deviceId: string;
  type: 'fingerprint' | 'face' | 'iris' | 'voice' | 'webauthn';
  identifier: string;
  credentialId: string;
  publicKey?: string;
  enabled: boolean;
  enabledAt?: Date;
  disabledAt?: Date;
  lastUsedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface AuthBiometricCreateInput {
  userId: string;
  deviceId: string;
  type: 'fingerprint' | 'face' | 'iris' | 'voice' | 'webauthn';
  identifier: string;
  credentialId: string;
  publicKey?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthBiometricVerifyInput {
  credentialId: string;
  signature: string;
  challenge: string;
}

export interface AuthBiometricWithDevice extends AuthBiometric {
  device: AuthDevice;
}
