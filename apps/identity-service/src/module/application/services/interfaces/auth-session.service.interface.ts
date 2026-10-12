/**
 * Auth Session Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SessionEntity } from '../../../domain/entities/session.entity.js';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto.js';

export const AUTH_SESSION_SERVICE = Symbol('AUTH_SESSION_SERVICE');

export interface CreateSessionInput {
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly rememberMe?: boolean;
}

export interface AuthSessionServiceInterface extends BaseServiceInterface<SessionEntity, string> {
  create(userId: string, input?: CreateSessionInput): Promise<AuthSessionResponseDTO>;
  findById(sessionId: string): Promise<AuthSessionResponseDTO | null>;
  findActiveByUser(userId: string): Promise<readonly AuthSessionResponseDTO[]>;
  revoke(sessionId: string, reason: string): Promise<void>;
  revokeAllForUser(userId: string, reason: string): Promise<number>;
}
