import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ReportEntity } from '../entities/report.entity';
import { ReportIdVO } from '../value-objects/primitives/report-id.vo';

export interface ReportRepository extends BaseRepository<ReportEntity, ReportIdVO> {
  findByOwner(ownerId: string): Promise<readonly ReportEntity[]>;
  findScheduledDue(now: Date): Promise<readonly ReportEntity[]>;
  findByStatus(status: string): Promise<readonly ReportEntity[]>;
}
