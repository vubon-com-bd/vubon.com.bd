import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto';

export interface AuthAccountLockServiceInterface
  extends BaseServiceInterface<AuthAccountLockEntity, string> {
  lock(userId: string, reason: string, durationMs: number): Promise<AuthAccountLockResponseDTO>;
  unlock(userId: string, reason: string): Promise<void>;
  getActive(userId: string): Promise<AuthAccountLockResponseDTO | null>;
}
