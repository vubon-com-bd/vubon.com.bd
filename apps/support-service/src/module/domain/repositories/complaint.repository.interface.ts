import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ComplaintEntity } from '../entities/complaint.entity';
import { ComplaintIdVO } from '../value-objects/primitives/complaint-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { ComplaintSeverityVO } from '../value-objects/primitives/complaint-severity.vo';

export interface ComplaintRepository extends BaseRepository<ComplaintEntity, ComplaintIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly ComplaintEntity[]>;
  findBySeverity(severity: ComplaintSeverityVO): Promise<readonly ComplaintEntity[]>;
}
