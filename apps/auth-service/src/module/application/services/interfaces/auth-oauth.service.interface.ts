/**
 * AuthOAuthServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthOAuthEntity } from '../../../domain/entities/auth-oauth.entity';

export interface AuthOAuthServiceInterface
  extends BaseServiceInterface<AuthOAuthEntity, string> {
  authorize(input: {
    provider: string;
    redirectUri: string;
    scopes?: readonly string[];
  }): Promise<{ authUrl: string; state: string }>;

  exchangeCode(input: {
    provider: string;
    code: string;
    state: string;
    redirectUri: string;
  }): Promise<{
    userId: UserId;
    scopes: readonly string[];
    expiresAt?: number;
  }>;

  refresh(userId: UserId, provider: string): Promise<void>;

  revoke(userId: UserId, provider: string): Promise<void>;

  listForUser(userId: UserId): Promise<readonly AuthOAuthEntity[]>;
}
