import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ReturnReasonEntity } from '../entities/return-reason.entity';

export interface ReturnReasonRepository
  extends BaseRepository<ReturnReasonEntity, string> {
  findByType(type: string): Promise<readonly ReturnReasonEntity[]>;
  findByCode(code: string): Promise<ReturnReasonEntity | null>;
}
