/**
 * Auth Token Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type { AuthTokenServiceInterface, IssueTokenInput } from '../interfaces/auth-token.service.interface.js';
import type { TokenRepository } from '../../../domain/repositories/token.repository.interface.js';
import { TOKEN_REPOSITORY } from '../../../domain/repositories/token.repository.interface.js';
import type { TokenEntity } from '../../../domain/entities/token.entity.js';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto.js';

@Injectable()
export class AuthTokenService extends BaseService implements AuthTokenServiceInterface {
  readonly name = 'AuthTokenService';

  constructor(
    @Inject(TOKEN_REPOSITORY) private readonly tokenRepo: TokenRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {
    super();
  }

  async issue(_input: IssueTokenInput): Promise<AuthTokenResponseDTO> {
    const now = Math.floor(Date.now() / 1000);
    return {
      accessToken: 'pending.signed.token',
      refreshToken: 'pending.signed.refresh',
      tokenType: 'Bearer',
      expiresIn: 900,
      expiresAt: now + 900,
    };
  }

  async verify(_token: string): Promise<TokenEntity | null> {
    return null;
  }

  async revoke(tokenId: string, reason: string): Promise<void> {
    const token = await this.tokenRepo.findById(tokenId);
    if (!token) return;
    token.revoke(reason);
    const saved = await this.tokenRepo.save(token);
    await this.eventBridge.publishFromEntity(saved);
  }

  async revokeAllForUser(userId: string, reason: string): Promise<number> {
    return this.tokenRepo.revokeAllByUserId({ value: userId } as never, reason);
  }
}
