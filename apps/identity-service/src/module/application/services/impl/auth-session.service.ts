/**
 * Auth Session Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type {
  AuthSessionServiceInterface,
  CreateSessionInput,
} from '../interfaces/auth-session.service.interface.js';
import type { SessionRepository } from '../../../domain/repositories/session.repository.interface.js';
import { SESSION_REPOSITORY } from '../../../domain/repositories/session.repository.interface.js';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto.js';
import { SessionNotFoundError } from '../../../domain/errors/session.errors.js';
import { SessionManagerService } from '../../../domain/services/session-manager.service.js';

@Injectable()
export class AuthSessionService extends BaseService implements AuthSessionServiceInterface {
  readonly name = 'AuthSessionService';

  constructor(
    @Inject(SESSION_REPOSITORY) private readonly sessionRepo: SessionRepository,
  ) {
    super();
  }

  async create(userId: string, input?: CreateSessionInput): Promise<AuthSessionResponseDTO> {
    const now = new Date();
    const expiry = SessionManagerService.buildExpiry(input?.rememberMe ?? false);
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      userId,
      status: 'active',
      ipAddress: input?.ipAddress,
      userAgent: input?.userAgent,
      deviceId: input?.deviceId,
      createdAt: now.toISOString(),
      lastAccessedAt: now.toISOString(),
      expiresAt: new Date(expiry.absoluteExpiresAt * 1000).toISOString(),
      isCurrent: true,
    };
  }

  async findById(sessionId: string): Promise<AuthSessionResponseDTO | null> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) return null;
    return {
      id: session.id,
      userId: session.userId.value,
      status: session.status.value,
      ipAddress: session.ipAddress?.value,
      userAgent: session.userAgent?.value,
      deviceId: session.deviceId?.value,
      createdAt: session.createdAt,
      lastAccessedAt: session.lastAccessedAt,
      expiresAt: new Date(session.expiry.absoluteExpiresAt * 1000).toISOString(),
      isCurrent: false,
    };
  }

  async findActiveByUser(userId: string): Promise<readonly AuthSessionResponseDTO[]> {
    const sessions = await this.sessionRepo.findActiveByUserId({ value: userId } as never);
    return sessions.map((s) => ({
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
    }));
  }

  async revoke(sessionId: string, reason: string): Promise<void> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) throw new SessionNotFoundError(sessionId);
    session.revoke(reason);
    await this.sessionRepo.save(session);
  }

  async revokeAllForUser(userId: string, reason: string): Promise<number> {
    return this.sessionRepo.revokeAllByUserId({ value: userId } as never, reason);
  }
}
