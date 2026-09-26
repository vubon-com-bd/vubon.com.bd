import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CohortEntity } from '../entities/cohort.entity';
import { CohortIdVO } from '../value-objects/primitives/cohort-id.vo';
import { CohortPeriodVO } from '../value-objects/primitives/cohort-period.vo';

export interface CohortRepository extends BaseRepository<CohortEntity, CohortIdVO> {
  findByPeriod(period: CohortPeriodVO): Promise<readonly CohortEntity[]>;
  findByBucketKey(bucketKey: string): Promise<CohortEntity | null>;
  findContainingUser(userId: string): Promise<readonly CohortEntity[]>;
}
