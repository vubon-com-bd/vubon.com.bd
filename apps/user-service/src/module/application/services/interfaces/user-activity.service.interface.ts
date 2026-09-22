import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserActivityEntity } from '../../../domain/entities/user-activity.entity';
import type { ActivityResponseDTO } from '../../dtos/responses/activity-response.dto';

export interface UserActivityServiceInterface
  extends BaseServiceInterface<UserActivityEntity, string> {
  record(input: {
    userId: string;
    type: string;
    metadata?: Record<string, unknown>;
  }): Promise<void>;
  listByUser(userId: string, limit: number): Promise<readonly ActivityResponseDTO[]>;
}
