import type { AuthTokenPair, AuthTokenPayload } from '@vubon/shared-types/auth';

export interface IssuePairInput {
  readonly userId: string;
  readonly sessionId: string;
  readonly scope?: readonly string[];
}

export interface TokenServiceContract {
  issuePair(input: IssuePairInput): AuthTokenPair;
  verifyAccess(token: string): AuthTokenPayload;
  verifyRefresh(token: string): AuthTokenPayload;
}
