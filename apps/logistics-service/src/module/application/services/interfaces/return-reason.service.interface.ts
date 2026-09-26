import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ReturnReasonEntity } from '../../../domain/entities/return-reason.entity';

export interface ReturnReasonServiceInterface
  extends BaseServiceInterface<ReturnReasonEntity, string> {
  listByType(type: string): Promise<readonly ReturnReasonEntity[]>;
  findByCode(code: string): Promise<ReturnReasonEntity | null>;
}
