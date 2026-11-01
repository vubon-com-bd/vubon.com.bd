/**
 * User Activity Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserActivityEntity } from '../../../domain/entities/user-activity.entity.js';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto.js';

export const USER_ACTIVITY_SERVICE = Symbol('USER_ACTIVITY_SERVICE');

export interface LogActivityInput {
  readonly userId: string;
  readonly type: string;
  readonly description?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface UserActivityServiceInterface extends BaseServiceInterface<UserActivityEntity, string> {
  log(input: LogActivityInput): Promise<UserActivityResponseDTO>;
  listForUser(userId: string, limit?: number): Promise<readonly UserActivityResponseDTO[]>;
}
