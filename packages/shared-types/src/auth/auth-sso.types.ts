/**
 * Auth SSO Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-sso.constants থেকে।
 */

import type { AUTH_SSO, AUTH_SSO_BINDING } from '@vubon/shared-constants/auth';
import type { UserId, Url } from '../common/primitives';

export type SsoProviderValue = (typeof AUTH_SSO)[keyof typeof AUTH_SSO];

export type SsoBindingValue = (typeof AUTH_SSO_BINDING)[keyof typeof AUTH_SSO_BINDING];

export interface SsoConfig {
  readonly id: string;
  readonly name: string;
  readonly provider: SsoProviderValue;
  readonly binding: SsoBindingValue;
  readonly entryPoint: Url;
  readonly issuer: string;
  readonly certificate?: string;
  readonly metadataUrl?: Url;
  readonly attributeMapping: SsoAttributeMapping;
  readonly isActive: boolean;
  readonly createdAt: string;
}

export interface SsoAttributeMapping {
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly displayName?: string;
  readonly department?: string;
  readonly role?: string;
  readonly groups?: string;
}

export interface SsoLoginRequest {
  readonly providerId: string;
  readonly relayState?: string;
  readonly returnUrl?: Url;
}

export interface SsoLoginResponse {
  readonly success: boolean;
  readonly userId?: UserId;
  readonly isNewUser: boolean;
  readonly sessionId?: string;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly error?: string;
}

export interface SsoLogoutRequest {
  readonly sessionId: string;
  readonly userId: UserId;
  readonly singleLogout: boolean;
}

export interface SsoSession {
  readonly sessionId: string;
  readonly userId: UserId;
  readonly providerId: string;
  readonly providerSessionId: string;
  readonly createdAt: string;
  readonly expiresAt: string;
}
