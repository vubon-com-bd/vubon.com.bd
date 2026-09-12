import { BaseEntity } from '../common/base.types';
import { AUTH_SSO } from '@vubon/shared-constants/src/auth/auth-sso.constants';

/**
 * SSO provider value
 */
export type SsoProviderValue = (typeof AUTH_SSO)[keyof typeof AUTH_SSO];

/**
 * Auth SSO interface
 */
export interface AuthSSO extends BaseEntity {
  ssoId: string;
  userId: string;
  provider: SsoProviderValue;
  idpUserId: string;
  idpEmail: string;
  /** @internal — SAML response may contain sensitive assertions */
  samlResponse?: string;
  metadata: Record<string, unknown>;
}
