/**
 * Report Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { ReportEntity } from '../entities/report.entity.js';
import type { ReportIdVO } from '../value-objects/primitives/report-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import type { ReportStatusVO } from '../value-objects/primitives/report-status.vo.js';

export interface ReportRepository extends BaseRepository<ReportEntity, string> {
  findByReportId(id: ReportIdVO): Promise<ReportEntity | null>;
  findByOwner(ownerId: UserIdVO): Promise<readonly ReportEntity[]>;
  findByStatus(status: ReportStatusVO): Promise<readonly ReportEntity[]>;
  findDueForRun(now: string, limit: number): Promise<readonly ReportEntity[]>;
  findScheduled(): Promise<readonly ReportEntity[]>;
  countByOwner(ownerId: UserIdVO): Promise<number>;
}
