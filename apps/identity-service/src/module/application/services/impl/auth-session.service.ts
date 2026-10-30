/**
 * Auth Session Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type {
  AuthSessionServiceInterface,
  CreateSessionInput,
} from '../interfaces/auth-session.service.interface.js';
import type { SessionRepository } from '../../../domain/repositories/session.repository.interface.js';
import { SESSION_REPOSITORY } from '../../../domain/repositories/session.repository.interface.js';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto.js';
import { SessionNotFoundError } from '../../../domain/errors/session.errors.js';
import { SessionManagerService } from '../../../domain/services/session-manager.service.js';
import { SessionEntity } from '../../../domain/entities/session.entity.js';
import { SessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo.js';
import { AuthIdVO } from '../../../domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { IpAddressVO } from '../../../domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '../../../domain/value-objects/primitives/user-agent.vo.js';
import { DeviceIdVO } from '../../../domain/value-objects/primitives/device-id.vo.js';

@Injectable()
export class AuthSessionService extends BaseService implements AuthSessionServiceInterface {
  readonly name = 'AuthSessionService';

  constructor(
    @Inject(SESSION_REPOSITORY) private readonly sessionRepo: SessionRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {
    super();
  }

  async create(
    userId: string,
    input?: CreateSessionInput & { authId?: string },
  ): Promise<AuthSessionResponseDTO> {
    const now = new Date().toISOString();
    const expiry = SessionManagerService.buildExpiry(input?.rememberMe ?? false);

    // Build entity
    const sessionId = SessionIdVO.create(randomUUID());
    const authId = AuthIdVO.create(input?.authId ?? userId);
    const userIdVO = UserIdVO.create(userId);

    const ipAddress = input?.ipAddress ? IpAddressVO.create(input.ipAddress) : undefined;
    const userAgent = input?.userAgent ? UserAgentVO.create(input.userAgent) : undefined;
    const deviceId = input?.deviceId ? DeviceIdVO.create(input.deviceId) : undefined;

    const session = SessionEntity.create({
      id: sessionId,
      props: {
        authId,
        userId: userIdVO,
        expiry,
        ipAddress,
        userAgent,
        deviceId,
        rememberMe: input?.rememberMe ?? false,
      },
      now,
    });

    // Save
    const saved = await this.sessionRepo.save(session);

    // ✅ Publish session.created event — THIS WAS MISSING
    await this.eventBridge.publishFromEntity(saved);

    return this.toResponse(saved);
  }

  async findById(sessionId: string): Promise<AuthSessionResponseDTO | null> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) return null;
    return this.toResponse(session);
  }

  async findActiveByUser(userId: string): Promise<readonly AuthSessionResponseDTO[]> {
    const sessions = await this.sessionRepo.findActiveByUserId({ value: userId } as never);
    return sessions.map((s) => this.toResponse(s));
  }

  async revoke(sessionId: string, reason: string): Promise<void> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) throw new SessionNotFoundError(sessionId);
    session.revoke(reason);
    const saved = await this.sessionRepo.save(session);
    await this.eventBridge.publishFromEntity(saved);
  }

  async revokeAllForUser(userId: string, reason: string): Promise<number> {
    return this.sessionRepo.revokeAllByUserId({ value: userId } as never, reason);
  }

  private toResponse(s: SessionEntity): AuthSessionResponseDTO {
    return {
      id: s.id,
      userId: s.userId.value,
      status: s.status.value,
      ipAddress: s.ipAddress?.value,
      userAgent: s.userAgent?.value,
      deviceId: s.deviceId?.value,
      createdAt: s.createdAt,
      lastAccessedAt: s.lastAccessedAt,
      expiresAt: new Date(s.expiry.absoluteExpiresAt * 1000).toISOString(),
      isCurrent: false,
    };
  }
}
