/**
 * AuthSessionService — Session lifecycle
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthSessionServiceInterface } from '../interfaces/auth-session.service.interface';
import type { AuthSessionRepository } from '../../../domain/repositories/auth-session.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto';
import { ID_GENERATOR } from '../tokens';
import { AUTH_SESSION_REPO } from '../../tokens';

const DEFAULT_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

@Injectable()
export class AuthSessionService
  extends BaseService<AuthSessionEntity, string>
  implements AuthSessionServiceInterface {
  readonly name = 'AuthSessionService';

  constructor(
    @Inject(AUTH_SESSION_REPO)
    private readonly sessionRepo: AuthSessionRepository,
    @Inject(ID_GENERATOR)
    private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async create(input: {
    userId: UserId;
    ipAddress: string;
    userAgent: string;
    deviceId?: string;
    ttlMs?: number;
  }): Promise<AuthSessionEntity> {
    const sessionId = this.idGen.generate();
    const now = Date.now();
    const expiry = SessionExpiryVO.fromNow(
      input.ttlMs ?? DEFAULT_SESSION_TTL_MS,
      now,
    );

    // Opaque session token (not JWT)
    const rawToken = `${this.idGen.generateUuid()}.${this.idGen.generateUuid()}`;
    const token = SessionTokenVO.of(rawToken);

    const entity = AuthSessionEntity.create({
      id: sessionId,
      userId: input.userId,
      token,
      expiry,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      deviceId: input.deviceId,
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    });

    return this.sessionRepo.save(entity);
  }

  async findActiveByUser(userId: UserId): Promise<readonly AuthSessionEntity[]> {
    return this.sessionRepo.findActiveByUser(userId, Date.now());
  }

  async revoke(sessionId: string, reason?: string): Promise<void> {
    const entity = await this.sessionRepo.findById(sessionId);
    if (!entity) return;
    entity.revoke(Date.now(), reason);
    await this.sessionRepo.save(entity);
  }

  async revokeAllForUser(userId: UserId, reason?: string): Promise<number> {
    return this.sessionRepo.revokeAllForUser(userId, Date.now(), reason);
  }

  async findByToken(token: string): Promise<AuthSessionEntity | null> {
    return this.sessionRepo.findByToken(SessionTokenVO.of(token));
  }

  toResponse(session: AuthSessionEntity): AuthSessionResponseDTO {
    const now = Date.now();
    return {
      sessionId: session.id,
      userId: session.userId,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      deviceId: session.deviceId,
      createdAt: session.createdAt,
      expiresAt: session.expiry.toISOString(),
      revokedAt: session.revokedAt
        ? new Date(session.revokedAt).toISOString()
        : undefined,
      isActive: session.isActive(now),
    };
  }
}
