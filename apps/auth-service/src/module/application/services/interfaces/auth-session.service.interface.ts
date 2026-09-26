/**
 * AuthSessionServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto';

export interface AuthSessionServiceInterface
  extends BaseServiceInterface<AuthSessionEntity, string> {
  create(input: {
    userId: UserId;
    ipAddress: string;
    userAgent: string;
    deviceId?: string;
    ttlMs?: number;
  }): Promise<AuthSessionEntity>;

  findActiveByUser(userId: UserId): Promise<readonly AuthSessionEntity[]>;

  revoke(
    sessionId: string,
    reason?: string,
  ): Promise<void>;

  revokeAllForUser(userId: UserId, reason?: string): Promise<number>;

  findByToken(token: string): Promise<AuthSessionEntity | null>;

  toResponse(session: AuthSessionEntity): AuthSessionResponseDTO;
}
