import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthSessionServiceInterface } from '../interfaces/auth-session.service.interface';
import type { AuthSessionRepository } from '../../../domain/repositories/auth-session.repository.interface';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { SessionTokenVO } from '../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';
import { SessionNotFoundError } from '../../errors/session.errors';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto';
import type { SessionTokenGeneratorPort } from '../../ports/session-token-generator.port';

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthSessionService
  extends BaseService<AuthSessionEntity, string>
  implements AuthSessionServiceInterface
{
  readonly name = 'AuthSessionService';

  constructor(
    private readonly sessionRepo: AuthSessionRepository,
    private readonly sessionTokenGenerator: SessionTokenGeneratorPort,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(
    userId: string,
    ip: string,
    userAgent: string,
  ): Promise<AuthSessionResponseDTO> {
    const entity = AuthSessionEntity.create({
      userId: UserIdVO.create(userId),
      token: SessionTokenVO.create(this.sessionTokenGenerator.generate()),
      expiry: SessionExpiryVO.fromNow(SESSION_TTL_MS),
      ip,
      userAgent,
      deviceId: null,
      revokedAt: null,
      revokeReason: null,
    });
    await this.sessionRepo.save(entity);
    await this.publishEvents(entity);
    return this.toDTO(entity);
  }

  async findActiveByUser(userId: string): Promise<readonly AuthSessionResponseDTO[]> {
    const entities = await this.sessionRepo.findActiveByUser(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async revoke(sessionId: string, reason: string): Promise<void> {
    const entity = await this.sessionRepo.findById(sessionId);
    if (!entity) {
      throw new SessionNotFoundError(sessionId);
    }
    const revoked = entity.revoke(reason);
    await this.sessionRepo.save(revoked);
    await this.publishEvents(revoked);
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.sessionRepo.revokeAllForUser(UserIdVO.create(userId));
  }

  private toDTO(entity: AuthSessionEntity): AuthSessionResponseDTO {
    return {
      id: entity.id,
      status: entity.isActive ? 'active' : 'expired',
      ipAddress: entity.ip,
      userAgent: entity.userAgent,
      deviceId: entity.deviceId ?? undefined,
      createdAt: entity.createdAt,
      expiresAt: new Date(entity.expiry.epochMs).toISOString(),
      lastAccessedAt: entity.updatedAt,
      isCurrent: false,
    };
  }

  private async publishEvents(entity: AuthSessionEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
