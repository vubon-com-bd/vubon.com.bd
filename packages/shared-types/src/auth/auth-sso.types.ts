/**
 * Auth SSO Types
 * প্রমাণীকরণ Single Sign-On সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH_SSO } from '@vubon/shared-constants';

export interface AuthSSO extends BaseEntity {
  userId: string;
  provider: AuthSSOProvider;
  protocol: AuthSSOProtocol;
  providerId: string;
  samlResponse?: string;
  samlAssertion?: string;
  metadata?: Record<string, unknown>;
  linkedAt: Date;
  expiredAt?: Date;
  revokedAt?: Date;
}

export interface AuthSSOCreateInput {
  userId: string;
  provider: AuthSSOProvider;
  protocol: AuthSSOProtocol;
  providerId: string;
  samlResponse?: string;
  samlAssertion?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthSSOSAMLRequest {
  samlRequest: string;
  relayState?: string;
}

export interface AuthSSOSAMLResponse {
  samlResponse: string;
  relayState?: string;
}

export type AuthSSOProtocol = (typeof AUTH_SSO.PROTOCOLS)[keyof typeof AUTH_SSO.PROTOCOLS];
export type AuthSSOProvider = (typeof AUTH_SSO.PROVIDERS)[keyof typeof AUTH_SSO.PROVIDERS];
export type AuthSAMLBinding = (typeof AUTH_SSO.SAML_BINDINGS)[keyof typeof AUTH_SSO.SAML_BINDINGS];
