import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto';

export interface AuthSessionServiceInterface
  extends BaseServiceInterface<AuthSessionEntity, string> {
  create(userId: string, ip: string, userAgent: string): Promise<AuthSessionResponseDTO>;
  findActiveByUser(userId: string): Promise<readonly AuthSessionResponseDTO[]>;
  revoke(sessionId: string, reason: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
}
