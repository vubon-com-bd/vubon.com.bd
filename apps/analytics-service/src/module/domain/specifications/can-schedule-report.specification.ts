import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ReportEntity } from '../entities/report.entity';

export class CanScheduleReportSpecification extends Specification<ReportEntity> {
  isSatisfiedBy(candidate: ReportEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (!candidate.frequency || !candidate.frequency.isRecurring) return false;
    return true;
  }
}
