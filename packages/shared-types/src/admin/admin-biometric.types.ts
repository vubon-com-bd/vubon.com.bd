/**
 * Admin Biometric Types
 * অ্যাডমিন বায়োমেট্রিক সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { AuthBiometric } from '../auth/auth-biometric.types';

export interface AdminBiometric extends BaseEntity, AuthBiometric {
  adminId: string;
  enabled: boolean;
  type: 'fingerprint' | 'face' | 'iris' | 'voice' | 'webauthn';
  credentialId: string;
  publicKey?: string;
}

export interface AdminBiometricCreateInput {
  adminId: string;
  type: 'fingerprint' | 'face' | 'iris' | 'voice' | 'webauthn';
  credentialId: string;
  publicKey?: string;
  deviceId: string;
}

export interface AdminBiometricVerifyInput {
  credentialId: string;
  signature: string;
  challenge: string;
}
