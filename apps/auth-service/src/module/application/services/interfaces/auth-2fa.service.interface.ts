/**
 * Auth2FaServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { Auth2FaEntity } from '../../../domain/entities/auth-2fa.entity';

export interface Auth2FaServiceInterface
  extends BaseServiceInterface<Auth2FaEntity, UserId> {
  enable(userId: UserId, primaryMethod: string): Promise<Auth2FaEntity>;

  disable(userId: UserId): Promise<void>;

  setPrimary(userId: UserId, method: string): Promise<void>;

  addBackupMethod(userId: UserId, method: string): Promise<void>;

  getConfig(userId: UserId): Promise<Auth2FaEntity | null>;
}
