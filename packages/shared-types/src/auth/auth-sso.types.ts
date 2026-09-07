import { AUTH_SSO } from '@vubon/shared-constants';

export interface AuthSSO {
  ssoId: string;
  userId: string;
  provider: keyof typeof AUTH_SSO;
  idpUserId: string;
  idpEmail: string;
  samlResponse?: string;
  metadata: Record<string, unknown>;
}
