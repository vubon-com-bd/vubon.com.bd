import { BaseEntity } from '../common/base.types';
import { AUTH_SSO } from '@vubon/shared-constants/src/auth/auth-sso.constants';

/**
 * Auth SSO interface
 */
export interface AuthSSO extends BaseEntity {
  ssoId: string;
  userId: string;
  provider: keyof typeof AUTH_SSO;
  idpUserId: string;
  idpEmail: string;
  samlResponse?: string;
  metadata: Record<string, unknown>;
}
