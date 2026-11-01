/**
 * Auth Token Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TokenEntity } from '../../../domain/entities/token.entity.js';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto.js';

export const AUTH_TOKEN_SERVICE = Symbol('AUTH_TOKEN_SERVICE');

export interface IssueTokenInput {
  readonly userId: string;
  readonly sessionId: string;
  readonly roles?: readonly string[];
  readonly scope?: readonly string[];
}

export interface AuthTokenServiceInterface extends BaseServiceInterface<TokenEntity, string> {
  issue(input: IssueTokenInput): Promise<AuthTokenResponseDTO>;
  verify(token: string): Promise<TokenEntity | null>;
  revoke(tokenId: string, reason: string): Promise<void>;
  revokeAllForUser(userId: string, reason: string): Promise<number>;
}
