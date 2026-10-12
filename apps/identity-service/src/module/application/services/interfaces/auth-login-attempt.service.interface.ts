/**
 * Auth Login Attempt Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { LoginAttemptEntity } from '../../../domain/entities/login-attempt.entity.js';
import type { AuthLoginAttemptResponseDTO } from '../../dtos/responses/auth-login-attempt-response.dto.js';

export const AUTH_LOGIN_ATTEMPT_SERVICE = Symbol('AUTH_LOGIN_ATTEMPT_SERVICE');

export interface RecordAttemptInput {
  readonly authId?: string;
  readonly identifier: string;
  readonly status: 'success' | 'failed' | 'locked' | 'blocked';
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceFingerprint?: string;
  readonly failureReason?: string;
}

export interface AuthLoginAttemptServiceInterface extends BaseServiceInterface<LoginAttemptEntity, string> {
  record(input: RecordAttemptInput): Promise<AuthLoginAttemptResponseDTO>;
  listRecent(identifier: string, windowSeconds: number): Promise<readonly AuthLoginAttemptResponseDTO[]>;
  countRecent(identifier: string, windowSeconds: number): Promise<number>;
}
