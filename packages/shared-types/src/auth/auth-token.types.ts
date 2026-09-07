import { TYPES } from '@vubon/shared-constants';
import { AUTH_TOKEN } from '@vubon/shared-constants';

export interface AuthToken {
  tokenId: string;
  userId: string;
  token: string;
  type: keyof typeof AUTH_TOKEN;
  category: keyof typeof TYPES;
  expiresAt: Date;
  isRevoked: boolean;
  revokedAt?: Date;
  metadata: Record<string, unknown>;
}

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
  iat: number;
  exp: number;
}
