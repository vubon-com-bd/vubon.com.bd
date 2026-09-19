import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserActivityEntity } from '../../../domain/entities/user-activity.entity';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto';

export interface UserActivityServiceInterface
  extends BaseServiceInterface<UserActivityEntity, string> {
  record(input: {
    userId: string;
    type: string;
    category: string;
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
  }): Promise<void>;
  listByUser(userId: string, limit: number): Promise<readonly UserActivityResponseDTO[]>;
}
