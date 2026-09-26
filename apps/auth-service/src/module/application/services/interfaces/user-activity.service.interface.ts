/**
 * UserActivityServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserActivityEntity } from '../../../domain/entities/user-activity.entity';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto';

export interface UserActivityServiceInterface
  extends BaseServiceInterface<UserActivityEntity, string> {
  record(input: {
    userId: UserId;
    type: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: Readonly<Record<string, string>>;
  }): Promise<UserActivityEntity>;

  listForUser(
    userId: UserId,
    limit?: number,
  ): Promise<readonly UserActivityEntity[]>;

  toResponse(activity: UserActivityEntity): UserActivityResponseDTO;
}
